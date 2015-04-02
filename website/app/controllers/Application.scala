package controllers

import db._
import play.api.mvc._

import scala.util.Random

object Application extends Controller {
  val doNotCachePage = Array(CACHE_CONTROL -> "no-cache, no-store")

  def index = Action { request =>
    val (accountId, accountEmail) = getAccountId(request.session) match {
      case None => (generateTempAccountIdAndInitialiseTables(request.session), None)

      case Some(id) =>
        AccountDto.getOfId(id) match {
          case Some(account) => (id, account.emailAddress)

          case None =>
            AccountDto.createTemporary(id)
            (id, None)
        }
    }

    Ok(views.html.index(WorkbookAreaDto.getAll, accountId, accountEmail, AccountDataDto.getOfAccountId(accountId))).withSession(request.session
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

              case Some(workbookArea) => Ok(views.html.workbookArea(workbookArea, accountId, account.emailAddress, AccountDataDto.getOfAccountId(accountId)))
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
}
