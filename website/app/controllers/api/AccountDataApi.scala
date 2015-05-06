package controllers.api

import controllers.Application
import db._
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import services.EmailService

object AccountDataApi extends Controller {
  def getForCurrentUser = Action { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")

      case Some(accountId) =>
        AccountDto.getOfId(accountId) match {
          case None => InternalServerError("The account ID found in session didn't have a corresponding database entry")
          case Some(account) => Ok(AccountDataDto.getOfAccountId(accountId).getOrElse(JsNull))
        }
    }
  }

  def add = Action(parse.json) { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")

      case Some(accountId) =>
        AccountDto.getOfId(accountId) match {
          case None => InternalServerError("The account ID found in session didn't have a corresponding database entry")

          case Some(account) =>
            request.body.validate[JsObject] match {
              case s: JsSuccess[JsObject] =>
                val accountData = s.get

                AccountDataDto.create(accountId, accountData)

                account.emailAddress match {
                  case Some(emailAddress) => EmailService.sendAccountDataUpdatedEmail(emailAddress, accountData)
                  case None =>
                }
                Ok
              case e: JsError => BadRequest("Account data must be JSON")
            }
        }
    }
  }
}
