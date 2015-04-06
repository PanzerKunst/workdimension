package controllers

import db._
import play.api.mvc._

import scala.util.Random

object Application extends Controller {
  val doNotCachePage = Array(CACHE_CONTROL -> "no-cache, no-store")

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
              case Some(workbookArea) => Ok(views.html.workbookArea(WorkbookAreaDto.getAll, workbookArea, accountId, AccountDataDto.getOfAccountId(accountId)))
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
