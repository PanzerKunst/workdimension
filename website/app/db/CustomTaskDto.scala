package db

import java.util.Date

import anorm._
import models.CustomTask
import play.api.Logger
import play.api.Play.current
import play.api.db.DB

object CustomTaskDto {
  def get(accountId: Long, workbookAreaId: Long, workbookItemIndex: Option[Int]): List[CustomTask] = {
    DB.withConnection { implicit c =>
      val workbookItemIndexClause = workbookItemIndex match {
        case None => """
            and workbook_item_index is null"""
        case Some(index) => """
            and workbook_item_index = """ + index
      }

      val query = """
      select id, tip, question, creation_timestamp, completion_timestamp
      from custom_task
      where account_id = """ + accountId + """
        and workbook_area_id = """ + workbookAreaId +
        workbookItemIndexClause + """;"""

      Logger.info("CustomTaskDto.get():" + query)

      SQL(query)().map { row =>
        CustomTask(
          row[Long]("id"),
          accountId,
          row[Option[String]]("tip"),
          row[Option[String]]("question"),
          workbookAreaId,
          workbookItemIndex,
          row[Long]("creation_timestamp"),
          row[Option[Long]]("completion_timestamp")
        )
      }.toList
    }
  }

  def getOfId(id: Long): Option[CustomTask] = {
    DB.withConnection {
      implicit c =>
        val query = """
      select account_id, tip, question, workbook_area_id, workbook_item_index, creation_timestamp, completion_timestamp
      from custom_task
      where id = """ + id + """;"""

        Logger.info("CustomTaskDto.getOfId():" + query)

        SQL(query).apply().headOption match {
          case Some(row) =>
            Some(
              CustomTask(
                id,
                row[Long]("account_id"),
                row[Option[String]]("tip"),
                row[Option[String]]("question"),
                row[Long]("workbook_area_id"),
                row[Option[Int]]("workbook_item_index"),
                row[Long]("creation_timestamp"),
                row[Option[Long]]("completion_timestamp")
              )
            )
          case None => None
        }
    }
  }

  def create(accountId: Long, tip: Option[String], question: Option[String], workbookAreaId: Long, workbookItemIndex: Option[Int]): Option[Long] = {
    DB.withConnection { implicit c =>
      val tipClause = tip match {
        case None => "NULL"
        case Some(t1p) => "'" + DbUtil.safetize(t1p) + "'"
      }

      val questionClause = question match {
        case None => "NULL"
        case Some(questi0n) => "'" + DbUtil.safetize(questi0n) + "'"
      }

      val query = """
      insert into custom_task(account_id, tip, question, workbook_area_id, workbook_item_index, creation_timestamp)
      values(""" + accountId + """, """ +
        tipClause + """, """ +
        questionClause + """, """ +
        workbookAreaId + """, """ +
        workbookItemIndex.getOrElse("NULL") + """, """ +
        new Date().getTime + """);"""

      Logger.info("CustomTaskDto.create():" + query)

      SQL(query).executeInsert()
    }
  }

  def updateAsCompleted(id: Long) {
    DB.withConnection { implicit c =>
      val query = """
        update custom_task set
        completion_timestamp = """ + new Date().getTime + """
        where id = """ + id + """;"""

      Logger.info("CustomTaskDto.updateAsCompleted():" + query)

      SQL(query).executeUpdate()
    }
  }
}
