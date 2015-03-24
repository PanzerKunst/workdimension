package db

import anorm._
import play.api.Logger
import play.api.Play.current
import play.api.db.DB

object DbAdmin {
  def reCreateTables() {
    dropTable("account_data")
    dropTable("account")

    createTableAccount()
    createTableAccountData()
  }

  private def createTableAccount() {
    DB.withConnection { implicit c =>
      val query = """
          create table account (
            id bigserial primary key,
            email_address varchar(128),
            password varchar(128),
            linkedin_account_id varchar(24),
            creation_timestamp bigint not null,
            unique(email_address),
            unique(linkedin_account_id)
          );"""

      Logger.info("DbAdmin.createTableAccount():" + query)

      SQL(query).executeUpdate()
    }
  }

  private def createTableAccountData() {
    DB.withConnection { implicit c =>
      val query = """
          create table account_data (
            id bigserial primary key,
            account_id bigint not null references account(id),
            data text not null,  /* TODO: change to jsonb */
            creation_timestamp bigint not null
          );"""

      Logger.info("DbAdmin.createTableAccountData():" + query)

      SQL(query).executeUpdate()
    }
  }

  private def dropTable(tableName: String) {
    DB.withConnection { implicit c =>
      val query = "drop table if exists " + tableName + ";"
      Logger.info("DbAdmin.dropTable(): " + query)
      SQL(query).executeUpdate()
    }
  }

  def initData() {
  }
}
