package controllers.api

import controllers.Application
import db._
import models.frontend.FrontendAccount
import play.api.libs.json.{JsError, JsSuccess, Json}
import play.api.mvc.{Action, Controller}

object AccountApi extends Controller {
  def create = Action(parse.json) { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")

      case Some(accountId) =>
        request.body.validate[FrontendAccount] match {
          case s: JsSuccess[FrontendAccount] =>
            val frontendAccount = s.get

            try {
              // We create the new account and retrieve its ID
              AccountDto.create(frontendAccount.emailAddress, frontendAccount.password) match {
                case Some(newAccountId) =>
                  // We update temporary user data to final user data
                  AccountDataDto.updateAccountId(accountId, newAccountId)
                  AccountActivityDto.updateAccountId(accountId, newAccountId)

                  // We delete the old account
                  AccountDto.deleteOfId(accountId)

                  // TODO EmailService.sendWelcomeEmail(frontendAccount.emailAddress)

                  Ok(Json.toJson(newAccountId)).withSession(request.session +("accountId", newAccountId.toString))

                case None => InternalServerError("FATAL ERROR: AccountDto.create() did not return an ID")
              }
            } catch {
              case eare: EmailAlreadyRegisteredException => Status(230)("This email is already registered")
            }
          case e: JsError => BadRequest("Validation of FrontendAccount failed")
        }
    }
  }
}
