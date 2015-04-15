package controllers

import db._
import play.api.libs.json._
import play.api.mvc._

import scala.util.Random

object Application extends Controller {
  val doNotCachePage = Array(CACHE_CONTROL -> "no-cache, no-store")
  val accountDataJsonKeyForViewedTaskIds = "viewedTaskIds"

  def index = Action { request =>
    val accountId = getAccountId(request.session) match {
      case None => generateTempAccountIdAndInitialiseTables(request.session)

      case Some(id) =>
        AccountDto.getOfId(id) match {
          case Some(account) => id

          case None =>
            AccountDto.createTemporary(id)
            id
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
        accountDataJsonKeyForViewedTaskIds -> JsArray(Seq(JsNumber(taskId)))
      ))

      case Some(data) =>
        val jsonTransformer = (data \ accountDataJsonKeyForViewedTaskIds).asOpt[List[Long]] match {
          case None => __.json.update((__ \ accountDataJsonKeyForViewedTaskIds).json.put(JsArray(Seq(JsNumber(taskId)))))

          case Some(viewedTaskIds) => (__ \ accountDataJsonKeyForViewedTaskIds).json.update(
            __.read[JsArray].map { viewedTaskIds => viewedTaskIds :+ JsNumber(taskId)}
          )
        }

        data.transform(jsonTransformer).get
    }
  }
}
