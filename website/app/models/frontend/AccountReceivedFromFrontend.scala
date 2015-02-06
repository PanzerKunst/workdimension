package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Reads}

case class AccountReceivedFromFrontend(emailAddress: String,
                                       password: String)

object AccountReceivedFromFrontend {
  implicit val reads: Reads[AccountReceivedFromFrontend] = (
    (JsPath \ "emailAddress").read[String] and
      (JsPath \ "password").read[String]
    )(AccountReceivedFromFrontend.apply _)
}
