package models

case class Account(id: Option[Long],
                   emailAddress: Option[String],
                   password: Option[String],
                   creationTimestamp: Long)
