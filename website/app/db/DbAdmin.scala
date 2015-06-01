package db

import anorm._
import play.api.Logger
import play.api.Play.current
import play.api.db.DB

object DbAdmin {
  def reCreateTables() {
    dropTable("custom_task")
    dropTable("workbook_area")
    dropTable("workbook_category")
    dropTable("account_data")
    dropTable("account")

    createTableAccount()
    createTableAccountData()
    createTableWorkbookCategory()
    createTableWorkbookArea()
    createTableCustomTask()
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

  private def createTableWorkbookCategory() {
    DB.withConnection { implicit c =>
      val query = """
          create table workbook_category (
            id bigserial primary key,
            title varchar(32) not null
          );"""

      Logger.info("DbAdmin.createTableWorkbookCategory():" + query)

      SQL(query).executeUpdate()
    }
  }

  private def createTableWorkbookArea() {
    DB.withConnection { implicit c =>
      val query = """
          create table workbook_area (
            id bigserial primary key,
            workbook_category_id bigint not null references workbook_category(id),
            class_name varchar(32) not null,
            human_readable_class_name varchar(32) not null,
            title varchar(64) not null,
            unique(class_name)
          );"""

      Logger.info("DbAdmin.createTableWorkbookArea():" + query)

      SQL(query).executeUpdate()
    }
  }

  private def createTableCustomTask() {
    DB.withConnection { implicit c =>
      val query = """
          create table custom_task (
            id bigserial primary key,
            account_id bigint not null references account(id),
            tip varchar(512),
            question varchar(512),
            workbook_area_id bigint not null references workbook_area(id),
            workbook_item_index smallint,
            creation_timestamp bigint not null,
            completion_timestamp bigint
          );"""

      Logger.info("DbAdmin.createTableCustomTask():" + query)

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
    initDataWorkbookCategory()
    initDataWorkbookArea()
  }

  private def initDataWorkbookCategory() {
    DB.withConnection {
      implicit c =>

        SQL("insert into workbook_category(title) values('Direction');").execute()
        SQL("insert into workbook_category(title) values('Environment');").execute()
        SQL("insert into workbook_category(title) values('Capabilities');").execute()
    }
  }

  private def initDataWorkbookArea() {
    DB.withConnection {
      implicit c =>

        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(3, 'Strengths', 'Strengths', 'My strengths');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(1, 'Drivers', 'Drivers', 'What motivates me');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'Contexts', 'Contexts', 'Contexts');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'Workplace', 'Good attributes in a workplace', 'Good attributes in a workplace');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(3, 'Achievements', 'Achievements', 'Things I''ve achieved');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'Coworkers', 'Coworker preferences', 'How I''d like my coworkers');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'Culture', 'Company culture preferences', 'The company culture I prefer');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(3, 'Expertise', 'Things I''m an expert in', 'Things I''m an expert in');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'Leadership', 'Leadership preferences', 'The leadership I need');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(1, 'Lesses', 'Lesses', 'Lesses');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(3, 'ManagementStyle', 'Management styles', 'My management style');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'Mores', 'Mores', 'Mores');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'Employers', 'Interesting employers', 'Interesting employers to work for');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'PhaseAndSize', 'Phase and size preferences', 'Phase & Size');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'Projects', 'Projects I''ve done', 'Projects I''ve done');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(2, 'Roles', 'Roles I''d like to have', 'Roles I''d like to have');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(3, 'ToolsAndMethods', 'Tools & methods I like', 'Tools & methods I like');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(1, 'Tracks', 'Tracks I''d like to pursue', 'Tracks I''d like to pursue');").execute()
        SQL("insert into workbook_area(workbook_category_id, class_name, human_readable_class_name, title) values(1, 'Values', 'Values', 'My values');").execute()
    }
  }
}
