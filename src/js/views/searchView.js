class SearchView {
  _parentElement = document.querySelector(".search");
  getQuery() {
    return this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentElement = document.querySelector(".search__field").value = "";
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
