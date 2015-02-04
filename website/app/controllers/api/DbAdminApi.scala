package controllers.api

import db.DbAdmin
import play.Play
import play.api.mvc.{Action, Controller}

object DbAdminApi extends Controller {
  val applicationSecret = Play.application().configuration().getString("application.secret")

  def reCreateTables = Action { request =>
    if (request.queryString.contains("key") &&
      request.queryString.get("key").get.head == applicationSecret) {
      DbAdmin.reCreateTables()
      DbAdmin.initData()
      Created
    }
    else
      Forbidden("Wrong key")
  }
}
