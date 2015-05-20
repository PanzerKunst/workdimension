package controllers.api

import controllers.Application
import db.CustomTaskDto
import models.frontend.CustomTaskReceivedFromFrontend
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

object CustomTaskApi extends Controller {
  def create = Action(parse.json) { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")

      case Some(accountId) =>
        request.body.validate[CustomTaskReceivedFromFrontend] match {
          case s: JsSuccess[CustomTaskReceivedFromFrontend] =>
            val frontendCustomTask = s.get

            CustomTaskDto.create(accountId, frontendCustomTask.tip, frontendCustomTask.question, frontendCustomTask.workbookAreaId, frontendCustomTask.workbookItemIndex) match {
              case None => InternalServerError("FATAL ERROR: CustomTaskDto.create() did not return an ID")
              case Some(id) => Ok(JsNumber(id))
            }
          case e: JsError => BadRequest("Validation of CustomTaskReceivedFromFrontend failed")
        }
    }
  }

  def update = Action(parse.json) { request =>
    Application.getAccountId(request.session) match {
      case None => BadRequest("Account ID not found in session")

      case Some(accountId) =>
        request.body.validate[CustomTaskReceivedFromFrontend] match {
          case s: JsSuccess[CustomTaskReceivedFromFrontend] =>
            val frontendCustomTask = s.get

            CustomTaskDto.updateAsCompleted(frontendCustomTask.id.get)

            Ok(Json.toJson(CustomTaskDto.getOfId(frontendCustomTask.id.get)))
          case e: JsError => BadRequest("Validation of CustomTaskReceivedFromFrontend failed")
        }
    }
  }
}
