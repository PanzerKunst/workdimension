package models

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Writes}

case class CustomTask(id: Long,
                      accountId: Long,
                      tip: Option[String],
                      question: Option[String],
                      workbookAreaId: Long,
                      workbookItemIndex: Option[Int],
                      creationTimestamp: Long,
                      completionTimestamp: Option[Long])

object CustomTask {
  implicit val writes: Writes[CustomTask] = (
    (JsPath \ "id").write[Long] and
      (JsPath \ "accountId").write[Long] and
      (JsPath \ "tip").writeNullable[String] and
      (JsPath \ "question").writeNullable[String] and
      (JsPath \ "workbookAreaId").write[Long] and
      (JsPath \ "workbookItemIndex").writeNullable[Int] and
      (JsPath \ "creationTimestamp").write[Long] and
      (JsPath \ "completionTimestamp").writeNullable[Long]
    )(unlift(CustomTask.unapply))
}
