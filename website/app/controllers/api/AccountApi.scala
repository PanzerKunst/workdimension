package controllers.api

import controllers.Application
import db._
import models.frontend.AccountReceivedFromFrontend
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import services.EmailService

object AccountApi extends Controller {
  val httpStatusCodeEmailAlreadyRegistered = 230
  val httpStatusCodeLinkedInAccountIdAlreadyRegistered = 231

  def create = Action(parse.json) { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")

      case Some(accountId) =>
        request.body.validate[AccountReceivedFromFrontend] match {
          case s: JsSuccess[AccountReceivedFromFrontend] =>
            val frontendAccount = s.get

            try {
              // We create the new account and retrieve its ID
              AccountDto.create(frontendAccount.emailAddress, frontendAccount.linkedInAccountId) match {
                case Some(newAccountId) =>
                  // We update temporary user data to final user data
                  AccountDataDto.updateAccountId(accountId, newAccountId)

                  // We delete the old account
                  AccountDto.deleteOfId(accountId)

                  EmailService.sendWelcomeEmail(frontendAccount.emailAddress)

                  AccountDataDto.getOfAccountId(newAccountId) match {
                    case Some(accountData) => EmailService.sendAccountDataUpdatedEmail(frontendAccount.emailAddress, accountData)
                    case None =>
                  }

                  val jsonToReturn = JsObject(Seq(
                    "accountId" -> JsNumber(newAccountId),
                    "accountEmail" -> JsString(frontendAccount.emailAddress),
                    "accountData" -> AccountDataDto.getOfAccountId(newAccountId).getOrElse(JsNull)
                  ))

                  Ok(jsonToReturn).withSession(request.session +("accountId", newAccountId.toString))

                case None => InternalServerError("FATAL ERROR: AccountDto.create() did not return an ID")
              }
            } catch {
              case eare: EmailAlreadyRegisteredException => Status(httpStatusCodeEmailAlreadyRegistered)("This email is already registered")
              case liaiare: LinkedInAccountIdAlreadyRegisteredException => Status(httpStatusCodeLinkedInAccountIdAlreadyRegistered)("This LinkedIn account ID is already registered")
            }
          case e: JsError => BadRequest("Validation of AccountReceivedFromFrontend failed")
        }
    }
  }

  def get = Action { request =>
    if (request.queryString.contains("emailAddress")) {
      val emailAddress = request.queryString.get("emailAddress").get.head
      AccountDto.getOfEmailAddress(emailAddress) match {
        case None => NoContent
        case Some(account) => Ok(Json.toJson(account))
      }
    } else
      BadRequest("Query string param 'emailAddress' must be set")
  }
}
