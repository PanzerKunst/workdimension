package controllers.api

import controllers.Application
import db._
import models.frontend.CustomActivityReceivedFromFrontend
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

object CustomActivityApi extends Controller {
  def create = Action(parse.json) { request =>
    request.body.validate[CustomActivityReceivedFromFrontend] match {
      case s: JsSuccess[CustomActivityReceivedFromFrontend] =>
        val customActivity = s.get

        AccountDto.getOfEmailAddress(customActivity.accountEmailAddress) match {
          case None => BadRequest("No account found for email '" + customActivity.accountEmailAddress + "'")

          case Some(account) =>
            CustomActivityDto.create(account.id.get, customActivity.className, customActivity.title, customActivity.mainText)

            Ok
        }
      case e: JsError => BadRequest("Validation of CustomActivityReceivedFromFrontend failed")
    }
  }

  def get = Action { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")
      case Some(accountId) => Ok(Json.toJson(CustomActivityDto.getOfAccountId(accountId)))
    }
  }
}
