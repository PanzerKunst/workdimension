package controllers.api

import db.{AccountDataDto, AccountDto}
import models.SignInData
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

object AuthApi extends Controller {
  def signIn = Action(parse.json) { request =>
    request.body.validate[SignInData] match {
      case s: JsSuccess[SignInData] =>
        val signInData = s.get
        AccountDto.getOfSignInInfo(signInData.emailAddress, signInData.password) match {
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
      case e: JsError => BadRequest("Validation of SignInData failed")
    }
  }

  def signOut = Action { request =>
    Ok.withNewSession
  }
}
