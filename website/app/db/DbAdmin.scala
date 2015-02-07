package db

import anorm._
import play.api.Logger
import play.api.Play.current
import play.api.db.DB

object DbAdmin {
  def reCreateTables() {
    dropTable("custom_activity")
    dropTable("account_activity")
    dropTable("account_data")
    dropTable("account")

    createTableAccount()
    createTableAccountData()
    createTableAccountActivity()
    createTableCustomActivity()
  }

  private def createTableAccount() {
    DB.withConnection { implicit c =>
      val query = """
          create table account (
            id bigserial primary key,
            email_address varchar(128),
            password varchar(128),
            creation_timestamp bigint not null,
            unique(email_address)
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

  private def createTableAccountActivity() {
    DB.withConnection { implicit c =>
      val query = """
          create table account_activity (
            id bigserial primary key,
            account_id bigint not null references account(id),
            activity_class_name varchar(64) not null,
            activity_state varchar(8),  /* One of: "DONE" */
            creation_timestamp bigint not null
          );"""

      Logger.info("DbAdmin.createTableAccountActivity():" + query)

      SQL(query).executeUpdate()
    }
  }

  private def createTableCustomActivity() {
    DB.withConnection { implicit c =>
      val query = """
          create table custom_activity (
            id bigserial primary key,
            account_id bigint not null references account(id),
            class_name varchar(64) not null,
            title varchar(128) not null,
            main_text varchar(1024) not null
          );"""

      Logger.info("DbAdmin.createTableCustomActivity():" + query)

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
