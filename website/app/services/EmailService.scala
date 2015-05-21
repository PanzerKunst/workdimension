package services

import play.Play
import play.api.Play.current
import play.api.libs.json.JsObject
import play.api.libs.mailer.{Email, MailerPlugin}

object EmailService {
  val accountAddress = Play.application().configuration().getString("smtp.user")
  val accountName = Play.application().configuration().getString("smtp.account.name")

  def sendWelcomeEmail(emailAddress: String) {
    val body = views.html.email.welcome().toString()

    MailerPlugin.send(Email(
      subject = "Välkommen till WorkDimension",
      from = accountName + "<" + accountAddress + ">",
      to = Seq(emailAddress),
      bodyHtml = Some(body),
      cc = Seq(),
      bcc = Seq(),
      attachments = Seq(),
      headers = Seq()
    ))
  }

  def sendAccountDataUpdatedEmail(accountEmailAddress: String, data: JsObject) {
    val body = views.html.email.accountDataUpdated(accountEmailAddress, StringService.convertJsObjectToHtml(data)).toString()

    MailerPlugin.send(Email(
      subject = "User " + accountEmailAddress + " has updated data",
      from = accountName + "<" + accountAddress + ">",
      to = Seq(accountAddress),
      bodyHtml = Some(body),
      cc = Seq(),
      bcc = Seq(),
      attachments = Seq(),
      headers = Seq()
    ))
  }

  def sendNewCustomTaskForYouEmail(taskUrl: String, tip: Option[String]): Unit = {
    val body = views.html.email.newCustomTaskForYou(taskUrl, tip).toString()

    MailerPlugin.send(Email(
      subject = "New task for you",
      from = accountName + "<" + accountAddress + ">",
      to = Seq(accountAddress),
      bodyHtml = Some(body),
      cc = Seq(),
      bcc = Seq(),
      attachments = Seq(),
      headers = Seq()
    ))
  }
}
