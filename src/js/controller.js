import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeview from "./views/recipeView.js";
import SearchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";

// ////////////////////////////////////////

import "core-js/stable";
import "regenerator-runtime";
import recipeView from "./views/recipeView.js";
//if (module.hot) {
// module.hot.accept();
//}

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

//////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    //  update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // updating bookma`rks view
    bookmarksView.update(model.state.bookmarks);
    // loading recipes
    console.log(id);
    await model.loadRecipe(id);
    console.log(id);

    // rendering recipes

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1.get search query
    const query = SearchView.getQuery();
    if (!query) return;
    console.log(query, "⛔⛔⛔");
    // 2.load search results
    await model.loadSearchResults(query);
    // 3.render results

    // resultsView.render(model.state.search.results
    // console.log(model.getSearchResultsPage(1));
    resultsView.render(model.getSearchResultsPage(1));
    // 4 Render initial pagination buttons1
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  // 1.render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2 Render new pagination buttons
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  // update the recipe servings(in the state)
  model.updateServings(newServings);
  // update the recipe view
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // 1)add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2)update recipe View
  recipeView.update(model.state.recipe);
  // 3)Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show a loading spinner
    addRecipeView.renderSpinner();
    // upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // render Recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();
    // render bookmark view
    bookmarksView.render(model.state.bookmarks);
    // change id in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // close formWindow
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("💥💥💥", err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeview.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
