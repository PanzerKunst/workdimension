package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Reads}

case class CustomActivityReceivedFromFrontend(accountEmailAddress: String,
                                              className: String,
                                              title: String,
                                              mainText: String)

object CustomActivityReceivedFromFrontend {
  implicit val reads: Reads[CustomActivityReceivedFromFrontend] = (
    (JsPath \ "accountEmailAddress").read[String] and
      (JsPath \ "className").read[String] and
      (JsPath \ "title").read[String] and
      (JsPath \ "mainText").read[String]
    )(CustomActivityReceivedFromFrontend.apply _)
}
