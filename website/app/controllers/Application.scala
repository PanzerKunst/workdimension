package controllers

import db._
import models.frontend.WorkbookItem
import play.api.libs.json._
import play.api.mvc._

import scala.util.Random

object Application extends Controller {
  val doNotCachePage = Array(CACHE_CONTROL -> "no-cache, no-store")
  val accountDataJsonKeyForClickedTaskIds = "clickedTaskIds"

  def index = Action { request =>
    val accountId = if (request.queryString.contains("email")) {  // TODO: remove
      AccountDto.getOfEmailAddress(request.queryString.get("email").get.head).get.id.get
    } else {
      getAccountId(request.session) match {
        case None => generateTempAccountIdAndInitialiseTables(request.session)

        case Some(id) =>
          AccountDto.getOfId(id) match {
            case Some(account) => id

            case None =>
              AccountDto.createTemporary(id)
              id
          }
      }
    }

    Ok(views.html.index(WorkbookAreaDto.getAll, accountId, AccountDataDto.getOfAccountId(accountId))).withSession(request.session
      +("accountId", accountId.toString)
    )
  }

  def workbookArea(className: String) = Action { request =>
    getAccountId(request.session) match {
      case None => Redirect("/")

      case Some(accountId) =>
        AccountDto.getOfId(accountId) match {
          case None => Redirect("/")

          case Some(account) =>
            WorkbookAreaDto.getOfClassName(className) match {
              case None => BadRequest("No workbook area found for class name " + className)

              case Some(workbookArea) =>
                var accountData = AccountDataDto.getOfAccountId(accountId)

                if (request.queryString.contains("taskIdToMarkAsViewed")) {
                  val taskIdToMarkAsViewed = request.queryString.get("taskIdToMarkAsViewed").get.head.toLong
                  accountData = Some(addTaskMarkedAsViewedToAccountData(accountData, taskIdToMarkAsViewed))

                  AccountDataDto.create(accountId, accountData.get)
                }

                Ok(views.html.workbookArea(WorkbookAreaDto.getAll, workbookArea, accountId, accountData))
            }
        }
    }
  }

  def workbookItem(areaClassName: String, index: Int) = Action { request =>
    getAccountId(request.session) match {
      case None => Redirect("/")

      case Some(accountId) =>
        AccountDto.getOfId(accountId) match {
          case None => Redirect("/")

          case Some(account) =>
            WorkbookAreaDto.getOfClassName(areaClassName) match {
              case None => BadRequest("No workbook area found for class name " + areaClassName)

              case Some(workbookArea) =>
                AccountDataDto.getOfAccountId(accountId) match {
                  case None => BadRequest("No account data found")

                  case Some(accountData) =>
                    val workbookItems = (accountData \ workbookArea.className).as[List[WorkbookItem]]

                    Ok(views.html.workbookItem(WorkbookAreaDto.getAll, workbookArea, workbookItems.apply(index), accountId, accountData))
                }
            }
        }
    }
  }

  def getAccountId(session: Session): Option[Long] = {
    session.get("accountId") match {
      case Some(accountId) => Some(accountId.toLong)
      case None => None
    }
  }

  def generateTempAccountIdAndInitialiseTables(session: Session): Long = {
    val rand = Random.nextLong()

    // We only want to generate negative IDs, because positive ones are for non-temp accounts
    val tempAccoundId = if (rand >= 0) {
      -rand
    } else {
      rand
    }

    AccountDto.createTemporary(tempAccoundId)

    tempAccoundId
  }

  private def addTaskMarkedAsViewedToAccountData(accountData: Option[JsObject], taskId: Long): JsObject = {
    accountData match {
      case None => JsObject(Seq(
        accountDataJsonKeyForClickedTaskIds -> JsArray(Seq(JsNumber(taskId)))
      ))

      case Some(data) =>
        val jsonTransformer = (data \ accountDataJsonKeyForClickedTaskIds).asOpt[List[Long]] match {
          case None => __.json.update((__ \ accountDataJsonKeyForClickedTaskIds).json.put(JsArray(Seq(JsNumber(taskId)))))

          case Some(clickedTaskIds) => (__ \ accountDataJsonKeyForClickedTaskIds).json.update(
            __.read[JsArray].map { clickedTaskIds => clickedTaskIds :+ JsNumber(taskId)}
          )
        }

        data.transform(jsonTransformer).get
    }
  }
}
