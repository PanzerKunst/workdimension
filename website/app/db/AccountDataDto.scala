package db

import java.util.Date

import anorm._
import play.api.Logger
import play.api.Play.current
import play.api.db.DB
import play.api.libs.json.{JsObject, Json}

object AccountDataDto {
  def getOfAccountId(accountId: Long): Option[JsObject] = {
    DB.withConnection { implicit c =>
      val query = """
      select data
      from account_data
      where account_id = """ + accountId + """
      order by creation_timestamp desc
      limit 1;"""

      Logger.info("AccountDataDto.create():" + query)

      SQL(query).apply().headOption match {
        case Some(row) =>
          row[Option[String]]("data") match {
            case Some(stringData) => Some(Json.parse(stringData).as[JsObject])
            case None => None
          }
        case None => None
      }
    }
  }

  def create(accountId: Long, data: JsObject): Option[Long] = {
    DB.withConnection { implicit c =>
      val query = """
        insert into account_data(account_id, data, creation_timestamp)
        values(""" + accountId + """,
        {data}, """ +
        new Date().getTime + """);"""

      Logger.info("AccountDataDto.create():" + query)

      // We use "on" because Play may crash if "data" is too long.
      SQL(query).on(
        "data" -> Json.stringify(data)
      ).executeInsert()
    }
  }

  def updateAccountId(oldAccountId: Long, newAccountId: Long) {
    DB.withConnection { implicit c =>
      val query = """
        update account_data set
        account_id = """ + newAccountId + """
        where account_id = """ + oldAccountId + """;"""

      Logger.info("AccountDataDto.updateAccountId():" + query)

      SQL(query).executeUpdate()
    }
  }
}
