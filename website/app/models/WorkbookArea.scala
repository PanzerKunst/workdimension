package models

import play.api.libs.functional.syntax._
import play.api.libs.json.{Writes, JsPath}

case class WorkbookArea(id: Long,
                        workbookCategoryId: Long,
                        className: String,
                        title: String)

object WorkbookArea {
  implicit val writes: Writes[WorkbookArea] = (
    (JsPath \ "id").write[Long] and
      (JsPath \ "workbookCategoryId").write[Long] and
      (JsPath \ "className").write[String] and
      (JsPath \ "title").write[String]
    )(unlift(WorkbookArea.unapply))
}
