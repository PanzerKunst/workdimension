package db

import java.util.Date

import anorm._
import models.Account
import org.postgresql.util.PSQLException
import play.api.Logger
import play.api.Play.current
import play.api.db.DB

object AccountDto {
  def createTemporary(accountId: Long): Option[Long] = {
    DB.withConnection { implicit c =>
      val query = """
      insert into account(id, creation_timestamp)
      values(""" + accountId + """, """ +
        new Date().getTime + """);"""

      Logger.info("AccountDto.createTemporary():" + query)

      SQL(query).executeInsert()
    }
  }

  def create(emailAddress: String, password: String): Option[Long] = {
    DB.withConnection { implicit c =>
      val query = """
      insert into account(email_address, password, creation_timestamp)
      values('""" + DbUtil.safetize(emailAddress) + """',
        crypt('""" + DbUtil.safetize(password) + """', gen_salt('md5')),""" +
        new Date().getTime + """);"""

      /* Not logged to avoid logging clear password
      Logger.info("AccountDto.create():" + query) */

      try {
        SQL(query).executeInsert()
      } catch {
        case psqle: PSQLException =>
          """duplicate\skey\svalue\sviolates\sunique\sconstraint\s\"account_email_address_key\"""".r.findFirstIn(psqle.getMessage) match {
            case Some(foo) => throw new EmailAlreadyRegisteredException
            case None => throw psqle
          }

        case e: Exception =>
          throw e
      }
    }
  }

  def getOfId(accountId: Long): Option[Account] = {
    DB.withConnection {
      implicit c =>
        val query = """
    select email_address, creation_timestamp
    from account
    where id = """ + accountId + """;"""

        Logger.info("AccountDto.getOfId():" + query)

        SQL(query).apply().headOption match {
          case Some(row) =>
            Some(
              Account(
                Some(accountId),
                row[Option[String]]("email_address"),
                None,
                row[Long]("creation_timestamp")
              )
            )
          case None => None
        }
    }
  }

  def getOfSignInInfo(emailAddress: String, password: String): Option[Account] = {
    DB.withConnection {
      implicit c =>
        val query = """
    select id, creation_timestamp
    from account
    where email_address = '""" + DbUtil.safetize(emailAddress) + """'
    and password = crypt('""" + DbUtil.safetize(password) + """', password);"""

        /* Not logged to avoid logging clear password
        Logger.info("AccountDto.getOfSignInInfo():" + query) */

        SQL(query).apply().headOption match {
          case Some(row) =>
            Some(
              Account(
                row[Option[Long]]("id"),
                Some(emailAddress),
                None,
                row[Long]("creation_timestamp")
              )
            )
          case None => None
        }
    }
  }

  def deleteOfId(accountId: Long) {
    DB.withConnection {
      implicit c =>
        val query = """
  delete from account
  where id = """ + accountId + """;"""

        Logger.info("AccountDto.delete():" + query)

        SQL(query).execute()
    }
  }
}
