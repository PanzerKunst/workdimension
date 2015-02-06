package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Writes}

case class CustomActivitySentToFrontend(className: String,
                                        title: String,
                                        mainText: String,
                                        accountDataKey: String,
                                        status: Option[String])

object CustomActivitySentToFrontend {
  implicit val writes: Writes[CustomActivitySentToFrontend] = (
    (JsPath \ "className").write[String] and
      (JsPath \ "title").write[String] and
      (JsPath \ "mainText").write[String] and
      (JsPath \ "accountDataKey").write[String] and
      (JsPath \ "status").writeNullable[String]
    )(unlift(CustomActivitySentToFrontend.unapply))
}
