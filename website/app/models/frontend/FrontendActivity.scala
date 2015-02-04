package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{Format, JsObject, JsPath}

case class FrontendActivity(className: String,
                            state: String,
                            accountData: JsObject)

object FrontendActivity {
  implicit val format: Format[FrontendActivity] = (
    (JsPath \ "className").format[String] and
      (JsPath \ "state").format[String] and
      (JsPath \ "accountData").format[JsObject]
    )(FrontendActivity.apply, unlift(FrontendActivity.unapply))
}
