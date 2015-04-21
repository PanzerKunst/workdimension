package models.frontend

import play.api.libs.functional.syntax._
import play.api.libs.json.{Format, JsPath}

case class WorkbookItem(name: String,
                        notes: List[String])

object WorkbookItem {
  implicit val format: Format[WorkbookItem] = (
    (JsPath \ "name").format[String] and
      (JsPath \ "notes").format[List[String]]
    )(WorkbookItem.apply, unlift(WorkbookItem.unapply))
}
