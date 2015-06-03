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
    var newSession = request.session

    if (request.queryString.contains("role") && request.queryString.get("role").get.head == "admin") {
      newSession = request.session + ("isAdmin" -> "true")
    }

    val accountId = if (request.queryString.contains("email")) {
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

    newSession = newSession + ("accountId" -> accountId.toString)

    Ok(views.html.index(WorkbookAreaDto.getAllUsable, accountId, AccountDataDto.getOfAccountId(accountId)))
      .withSession(newSession)
      .withHeaders(doNotCachePage: _*)
  }

  def workbookArea(className: String) = Action { request =>
    var newSession = request.session

    val accountId = getAccountId(request.session) match {
      case None =>
        val account1d = generateTempAccountIdAndInitialiseTables(request.session)
        newSession = newSession + ("accountId" -> account1d.toString)
        account1d

      case Some(id) =>
        AccountDto.getOfId(id) match {
          case Some(account) => id

          case None =>
            AccountDto.createTemporary(id)
            id
        }
    }

    AccountDto.getOfId(accountId) match {
      case None => Redirect("/")

      case Some(account) =>
        WorkbookAreaDto.getOfClassName(className) match {
          case None => BadRequest("No workbook area found for class name " + className)

          case Some(workbookArea) =>
            var accountData = AccountDataDto.getOfAccountId(accountId)

            if (request.queryString.contains("taskIdToMarkAsViewed")) {
              val taskIdToMarkAsViewed = request.queryString.get("taskIdToMarkAsViewed").get.head
              accountData = Some(addTaskMarkedAsViewedToAccountData(accountData, taskIdToMarkAsViewed))

              AccountDataDto.create(accountId, accountData.get)
            }

            val customTasks = CustomTaskDto.get(account.id.get, workbookArea.id, None)

            Ok(views.html.workbookArea(WorkbookAreaDto.getAllUsable, workbookArea, accountId, accountData, customTasks, isAdmin(request.session)))
              .withSession(newSession)
              .withHeaders(doNotCachePage: _*)
        }
    }
  }

  def workbookItem(areaClassName: String, index: Int) = Action { request =>
    var newSession = request.session

    val accountId = getAccountId(request.session) match {
      case None =>
        val account1d = generateTempAccountIdAndInitialiseTables(request.session)
        newSession = newSession + ("accountId" -> account1d.toString)
        account1d

      case Some(id) =>
        AccountDto.getOfId(id) match {
          case Some(account) => id

          case None =>
            AccountDto.createTemporary(id)
            id
        }
    }

    AccountDto.getOfId(accountId) match {
      case None => Redirect("/")

      case Some(account) =>
        WorkbookAreaDto.getOfClassName(areaClassName) match {
          case None => BadRequest("No workbook area found for class name " + areaClassName)

          case Some(workbookArea) =>
            AccountDataDto.getOfAccountId(accountId) match {
              case None => BadRequest("No account data found")

              case Some(accountData) =>
                var accountDat4 = accountData

                val workbookItems = (accountData \ workbookArea.className).as[List[WorkbookItem]]

                if (request.queryString.contains("taskIdToMarkAsViewed")) {
                  val taskIdToMarkAsViewed = request.queryString.get("taskIdToMarkAsViewed").get.head
                  accountDat4 = addTaskMarkedAsViewedToAccountData(Some(accountData), taskIdToMarkAsViewed)

                  AccountDataDto.create(accountId, accountDat4)
                }

                val customTasks = CustomTaskDto.get(account.id.get, workbookArea.id, Some(index))

                Ok(views.html.workbookItem(WorkbookAreaDto.getAllUsable, workbookArea, workbookItems.apply(index), accountId, accountDat4, customTasks, isAdmin(request.session)))
                  .withSession(newSession)
                  .withHeaders(doNotCachePage: _*)
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

  private def addTaskMarkedAsViewedToAccountData(accountData: Option[JsObject], taskId: String): JsObject = {
    accountData match {
      case None => JsObject(Seq(
        accountDataJsonKeyForClickedTaskIds -> JsArray(Seq(JsString(taskId)))
      ))

      case Some(data) =>
        val jsonTransformer = (data \ accountDataJsonKeyForClickedTaskIds).asOpt[List[String]] match {
          case None => __.json.update((__ \ accountDataJsonKeyForClickedTaskIds).json.put(JsArray(Seq(JsString(taskId)))))

          case Some(clickedTaskIds) => (__ \ accountDataJsonKeyForClickedTaskIds).json.update(
            __.read[JsArray].map { clickedTaskIds => clickedTaskIds :+ JsString(taskId)}
          )
        }

        data.transform(jsonTransformer).get
    }
  }

  private def isAdmin(session: Session): Boolean = {
    session.get("isAdmin").isDefined
  }
}
