package controllers

import db._
import play.api.mvc._

import scala.util.Random

object Application extends Controller {
  val doNotCachePage = Array(CACHE_CONTROL -> "no-cache, no-store")

  def index = Action { request =>
    val accountId = getAccountId(request.session) match {
      case None => generateTempAccountIdAndInitialiseTables(request.session)
      case Some(id) => id
    }

    Ok(views.html.index(accountId, AccountDataDto.getOfAccountId(accountId))).withSession(request.session
      +("accountId", accountId.toString)
    )
  }

  def getAccountId(session: Session): Option[Long] = {
    session.get("accountId") match {
      case Some(activeC1IdsAsString) => Some(activeC1IdsAsString.toLong)
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
