package models

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Writes}

case class Account(id: Option[Long],
                   emailAddress: Option[String],
                   password: Option[String],
                   creationTimestamp: Long)

object Account {
  implicit val writes: Writes[Account] = (
    (JsPath \ "id").writeNullable[Long] and
      (JsPath \ "emailAddress").writeNullable[String] and
      (JsPath \ "password").writeNullable[String] and
      (JsPath \ "creationTimestamp").write[Long]
    )(unlift(Account.unapply))
}
