package controllers.api

import controllers.Application
import db._
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import services.EmailService

object AccountDataApi extends Controller {

  def add = Action(parse.json) { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")

      case Some(accountId) =>
        request.body.validate[JsObject] match {
          case s: JsSuccess[JsObject] =>
            val accountData = s.get

            AccountDataDto.create(accountId, accountData)

            AccountDto.getOfId(accountId) match {
              case Some(account) =>
                account.emailAddress match {
                  case Some(emailAddress) => EmailService.sendAccountDataUpdatedEmail(emailAddress, accountData)
                  case None =>
                }

              case None => InternalServerError("The account ID found in session didn't have a corresponding database entry")
            }
            Ok
          case e: JsError => BadRequest("Account data must be JSON")
        }
    }
  }
}