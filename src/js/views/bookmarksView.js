import view from "./view.js";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";
class bookmarksView extends view {
  _parentElement = document.querySelector(".bookmarks__list");
  _ErrorMessage = "No bookMarks yet,find another recipe and bookmark it";
  _SuccessMessage = "";
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join("");
  }
}
export default new bookmarksView();
