import view from "./view.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";
class ResultsView extends view {
  _parentElement = document.querySelector(".results");
  _ErrorMessage = "we could not find that recipe.please try another one!";
  _SuccessMessage = "";

  _generateMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join("");
  }
}

export default new ResultsView();
