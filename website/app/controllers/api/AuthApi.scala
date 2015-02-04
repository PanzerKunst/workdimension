package controllers.api

import db.AccountDto
import models.SignInData
import play.api.libs.json.{JsError, JsSuccess, Json}
import play.api.mvc.{Action, Controller}

object AuthApi extends Controller {
  def signIn = Action(parse.json) { request =>
    request.body.validate[SignInData] match {
      case s: JsSuccess[SignInData] =>
        val signInData = s.get
        AccountDto.getOfSignInInfo(signInData.emailAddress, signInData.password) match {
          case Some(account) =>
            val accountId = account.id.get
            Ok(Json.toJson(accountId)).withSession(request.session + ("accountId" -> accountId.toString))

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
