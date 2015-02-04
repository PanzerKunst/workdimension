package services

import play.api.libs.json.{JsObject, Json}

object StringService {
  def convertJsObjectToHtml(json: JsObject): String = {
    Json.prettyPrint(json)
      .replaceAll("\r\n", "<br/>")  // Windows
      .replaceAll("\n", "<br/>")    // UNIX
      .replaceAll("\\s", "&nbsp;")
  }
}
