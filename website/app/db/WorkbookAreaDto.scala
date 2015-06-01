package db

import anorm._
import models.WorkbookArea
import play.api.Logger
import play.api.Play.current
import play.api.db.DB

object WorkbookAreaDto {
  def getAll: List[WorkbookArea] = {
    DB.withConnection { implicit c =>
      val query = """
      select distinct id, workbook_category_id, class_name, human_readable_class_name, title
      from workbook_area
      order by id;"""

      Logger.info("WorkbookAreaDto.getAll():" + query)

      SQL(query)().map { row =>
          WorkbookArea(
            row[Long]("id"),
            row[Long]("workbook_category_id"),
            row[String]("class_name"),
            row[String]("human_readable_class_name"),
            row[String]("title")
          )
      }.toList
    }
  }

  def getOfClassName(className: String): Option[WorkbookArea] = {
    DB.withConnection { implicit c =>
      val query = """
      select id, workbook_category_id, human_readable_class_name, title
      from workbook_area
      where class_name = '""" + className + """';"""

      Logger.info("WorkbookAreaDto.getOfId():" + query)

      SQL(query).apply().headOption match {
        case Some(row) =>
          Some(WorkbookArea(
            row[Long]("id"),
            row[Long]("workbook_category_id"),
            className,
            row[String]("human_readable_class_name"),
            row[String]("title")
          ))

        case None => None
      }
    }
  }
}
