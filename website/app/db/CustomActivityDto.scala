package db

import anorm._
import models.frontend.CustomActivitySentToFrontend
import play.api.Logger
import play.api.Play.current
import play.api.db.DB

object CustomActivityDto {
  def getOfAccountId(accountId: Long): List[CustomActivitySentToFrontend] = {
    DB.withConnection { implicit c =>
      val query = """
          select distinct ca.class_name, ca.title, ca.main_text,
            aa.activity_state
          from custom_activity ca
          left join account_activity aa on aa.account_id = ca.account_id
            and aa.activity_class_name = ca.class_name
          where ca.account_id = """ + accountId + """;"""

      Logger.info("CustomActivityDto.getOfAccountId():" + query)

      SQL(query)().map { row =>
        CustomActivitySentToFrontend(
          row[String]("class_name"),
          row[String]("title"),
          row[String]("main_text"),
          row[Option[String]]("activity_state")
        )
      }.toList
    }
  }

  def create(accountId: Long, className: String, title: String, mainText: String): Option[Long] = {
    DB.withConnection { implicit c =>
      val query = """
        insert into custom_activity (account_id, class_name, title, main_text)
        values(""" + accountId + """, '""" +
        DbUtil.safetize(className) + """', '""" +
        DbUtil.safetize(title) + """', '""" +
        DbUtil.safetize(mainText) + """');"""

      Logger.info("CustomActivityDto.create():" + query)

      SQL(query).executeInsert()
    }
  }
}
