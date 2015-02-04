package controllers.api

import controllers.Application
import db.{AccountActivityDto, AccountDataDto, AccountDto}
import models.frontend.FrontendActivity
import play.api.libs.json.{JsError, JsSuccess, Json}
import play.api.mvc.{Action, Controller}
import services.EmailService

object ActivityApi extends Controller {
  def get = Action { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")
      case Some(accountId) => Ok(Json.toJson(AccountActivityDto.getFrontendActivitiesOfAccountId(accountId)))
    }
  }

  def add = Action(parse.json) { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")

      case Some(accountId) =>
        request.body.validate[FrontendActivity] match {
          case s: JsSuccess[FrontendActivity] =>
            val frontendActivity = s.get

            AccountDto.getOfId(accountId) match {
              case Some(account) =>
                AccountDataDto.create(accountId, frontendActivity.accountData)

                account.emailAddress match {
                  case Some(emailAddress) => EmailService.sendAccountDataUpdatedEmail(emailAddress, frontendActivity.accountData)
                  case None =>
                }

              case None => InternalServerError("The account ID found in session didn't have a corresponding database entry")
            }

            Ok
          case e: JsError => BadRequest("Could not validate accound data as JsObject")
        }
    }
  }
}
