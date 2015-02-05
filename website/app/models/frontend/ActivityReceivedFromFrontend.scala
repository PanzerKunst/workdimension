package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsObject, JsPath, Reads}

case class ActivityReceivedFromFrontend(className: String,
                                        accountData: JsObject)

object ActivityReceivedFromFrontend {
  implicit val reads: Reads[ActivityReceivedFromFrontend] = (
    (JsPath \ "className").read[String] and
      (JsPath \ "accountData").read[JsObject]
    )(ActivityReceivedFromFrontend.apply _)
}
