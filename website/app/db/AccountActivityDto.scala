package db

import java.util.Date

import anorm._
import models.frontend.ActivitySentToFrontend
import play.api.Logger
import play.api.Play.current
import play.api.db.DB

object AccountActivityDto {
  def getOfAccountId(accountId: Long): List[ActivitySentToFrontend] = {
    DB.withConnection { implicit c =>
      val query = """
          select distinct activity_class_name, activity_state, max(creation_timestamp) creation_timestamp
          from account_activity
          where account_id = """ + accountId + """
          group by activity_class_name, activity_state;"""

      Logger.info("AccountActivityDto.getOfAccountId():" + query)

      SQL(query)().map { row =>
        ActivitySentToFrontend(
          row[String]("activity_class_name"),
          row[String]("activity_state")
        )
      }.toList
    }
  }

  def create(accountId: Long, className: String, state: String): Option[Long] = {
    DB.withConnection { implicit c =>
      val query = """
        insert into account_activity (account_id, activity_class_name, activity_state, creation_timestamp)
        values(""" + accountId + """, '""" +
        DbUtil.safetize(className) + """', '""" +
        DbUtil.safetize(state) + """', """ +
        new Date().getTime + """);"""

      Logger.info("AccountActivityDto.create():" + query)

      SQL(query).executeInsert()
    }
  }

  def updateAccountId(oldAccountId: Long, newAccountId: Long) {
    DB.withConnection { implicit c =>
      val query = """
        update account_activity set
        account_id = """ + newAccountId + """
        where account_id = """ + oldAccountId + """;"""

      Logger.info("AccountActivityDto.updateAccountId():" + query)

      SQL(query).executeUpdate()
    }
  }
}
