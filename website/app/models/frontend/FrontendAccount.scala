package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{Format, JsPath}

case class FrontendAccount(emailAddress: String,
                           password: String)

object FrontendAccount {
  implicit val format: Format[FrontendAccount] = (
    (JsPath \ "emailAddress").format[String] and
      (JsPath \ "password").format[String]
    )(FrontendAccount.apply, unlift(FrontendAccount.unapply))
}
