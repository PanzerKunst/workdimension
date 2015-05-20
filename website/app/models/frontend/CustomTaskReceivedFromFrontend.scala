package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Reads}

case class CustomTaskReceivedFromFrontend(id: Option[Long],
                                          tip: Option[String],
                                          question: Option[String],
                                          workbookAreaId: Long,
                                          workbookItemIndex: Option[Int])

object CustomTaskReceivedFromFrontend {
  implicit val reads: Reads[CustomTaskReceivedFromFrontend] = (
    (JsPath \ "id").readNullable[Long] and
      (JsPath \ "tip").readNullable[String] and
      (JsPath \ "question").readNullable[String] and
      (JsPath \ "workbookAreaId").read[Long] and
      (JsPath \ "workbookItemIndex").readNullable[Int]
    )(CustomTaskReceivedFromFrontend.apply _)
}
