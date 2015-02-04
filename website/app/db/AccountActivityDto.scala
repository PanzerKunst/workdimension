package db

import java.util.Date

import anorm._
import models.frontend.FrontendActivity
import play.api.Logger
import play.api.Play.current
import play.api.db.DB
import play.api.libs.json.{JsObject, Json}

object AccountActivityDto {
  def getFrontendActivitiesOfAccountId(accountId: Long): List[FrontendActivity] = {
    DB.withConnection { implicit c =>
      val query = """
          select distinct aa.activity_class_name, aa.activity_state, aa.creation_timestamp aa_creation_timestamp,
            ad.data
          from account_activity aa
          inner join account_data ad on ad.account_id = aa.account_id
          where aa.account_id = """ + accountId + """
            and ad.creation_timestamp in(
              select max(creation_timestamp) from account_data
              where account_id = """ + accountId + """)
          order by aa.creation_timestamp desc;"""

      Logger.info("AccountActivityDto.getFrontendActivitiesOfAccountId():" + query)

      SQL(query)().map { row =>
        FrontendActivity(
          row[String]("class_name"),
          row[String]("state"),
          Json.parse(row[String]("data")).as[JsObject]
        )
      }.toList
    }
  }

  def create(accountId: Long, className: String, state: String): Option[Long] = {
    DB.withConnection { implicit c =>
      val query = """
        insert into account_activity (account_id, activity_class_name, state, creation_timestamp)
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
