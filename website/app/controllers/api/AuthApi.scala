package controllers.api

import db.{AccountDataDto, AccountDto}
import models.SignInData
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

object AuthApi extends Controller {
  def signIn(linkedinAccountId: String) = Action { request =>
    AccountDto.getOfLinkedinAccountId(linkedinAccountId) match {
      case Some(account) =>
        val accountId = account.id.get

        val jsonToReturn = JsObject(Seq(
          "accountId" -> JsNumber(accountId),
          "accountData" -> AccountDataDto.getOfAccountId(accountId).getOrElse(JsNull)
        ))

        Ok(jsonToReturn).withSession(request.session + ("accountId" -> accountId.toString))

      case None =>
        NoContent
    }
  }

  def signOut = Action { request =>
    Ok.withNewSession
  }
}
