import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

const controlRecipes = async function () {
    try {
        recipeView.renderMessage();
        const id = window.location.hash.slice(1);

        if (!id) {
            return;
        }

        recipeView.renderSpinner();

        await model.loadRecipe(id);
        recipeView.render(model.state.recipe);
        recipeView.addHandlerUpdateServings(controlServings);

        if (model.state.search.results.length > 0) {
            resultsView.updateActive(id);
        }

        if (model.state.bookmarks.length > 0) {
            bookmarksView.render(model.state.bookmarks);
            bookmarksView.updateActive(id);
        }
    } catch (error) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        const query = searchView.getQuery();
        if (!query) {
            return;
        }

        await model.loadSearchResults(query);
        resultsView.render(model.getSearchResultsPage());
        paginationView.render(model.state.search);
    } catch (error) {
        console.log(error);
    }
}

const controlPagination = function (page) {
    resultsView.render(model.getSearchResultsPage(page));
    paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
    model.updateServings(newServings);
    recipeView.renderServings(model.state.recipe);
}

const controlAddBookmark = function () {
    model.state.recipe.bookmarked
        ? model.deleteBookmark(model.state.recipe.id)
        : model.addBookmark(model.state.recipe);
    
    recipeView.renderServings(model.state.recipe, false);
    bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
    try {
        addRecipeView.renderSpinner();

        await model.uploadRecipe(newRecipe);
        recipeView.render(model.state.recipe);
        addRecipeView.renderMessage();

        bookmarksView.render(model.state.bookmarks);

        window.history.pushState(null, '', `#${model.state.recipe.id}`);

        setTimeout(function () {
            addRecipeView.toggleModal();
        }, MODAL_CLOSE_SEC * 1000);
    } catch (error) {
        addRecipeView.renderError(error.message);
    }
}

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();


