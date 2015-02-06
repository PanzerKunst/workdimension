package controllers.api

import controllers.Application
import db.{AccountActivityDto, AccountDataDto, AccountDto}
import models.ActivityState
import models.frontend.ActivityReceivedFromFrontend
import play.api.libs.json.{JsError, JsSuccess, Json}
import play.api.mvc.{Action, Controller}
import services.EmailService

object ActivityApi extends Controller {
  def get = Action { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")
      case Some(accountId) => Ok(Json.toJson(AccountActivityDto.getOfAccountId(accountId)))
    }
  }

  def add = Action(parse.json) { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")

      case Some(accountId) =>
        request.body.validate[ActivityReceivedFromFrontend] match {
          case s: JsSuccess[ActivityReceivedFromFrontend] =>
            val frontendActivity = s.get

            AccountDataDto.create(accountId, frontendActivity.accountData)
            AccountActivityDto.create(accountId, frontendActivity.className, ActivityState.DONE.getString)

            AccountDto.getOfId(accountId) match {
              case Some(account) =>
                account.emailAddress match {
                  case Some(emailAddress) => EmailService.sendAccountDataUpdatedEmail(emailAddress, frontendActivity.accountData)
                  case None =>
                }

              case None => InternalServerError("The account ID found in session didn't have a corresponding database entry")
            }
            Ok
          case e: JsError => BadRequest("Could not validate ActivityReceivedFromFrontend")
        }
    }
  }
}
