package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Reads}

case class AccountReceivedFromFrontend(emailAddress: String,
                                       linkedInAccountId: String)

object AccountReceivedFromFrontend {
  implicit val reads: Reads[AccountReceivedFromFrontend] = (
    (JsPath \ "emailAddress").read[String] and
      (JsPath \ "linkedInAccountId").read[String]
    )(AccountReceivedFromFrontend.apply _)
}
