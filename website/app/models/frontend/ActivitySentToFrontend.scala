package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Writes}

case class ActivitySentToFrontend(className: String,
                                  state: String)

object ActivitySentToFrontend {
  implicit val writes: Writes[ActivitySentToFrontend] = (
    (JsPath \ "className").write[String] and
      (JsPath \ "state").write[String]
    )(unlift(ActivitySentToFrontend.unapply))
}
