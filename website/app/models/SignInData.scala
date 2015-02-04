package models

import play.api.libs.functional.syntax._
import play.api.libs.json.{Format, JsPath}

case class SignInData(emailAddress: String,
                      password: String)

object SignInData {
  implicit val format: Format[SignInData] = (
    (JsPath \ "emailAddress").format[String] and
      (JsPath \ "password").format[String]
    )(SignInData.apply, unlift(SignInData.unapply))
}
