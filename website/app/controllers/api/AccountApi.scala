package controllers.api

import controllers.Application
import db._
import models.frontend.FrontendAccount
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import services.EmailService

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

                  AccountDataDto.getOfAccountId(accountId: Long) match {
                    case Some(accountData) => EmailService.sendAccountDataUpdatedEmail(frontendAccount.emailAddress, accountData)
                    case None =>
                  }

                  val jsonToReturn = JsObject(Seq(
                    "accountId" -> JsNumber(newAccountId),
                    "accountData" -> AccountDataDto.getOfAccountId(accountId).getOrElse(JsNull)
                  ))

                  Ok(jsonToReturn).withSession(request.session +("accountId", newAccountId.toString))

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
