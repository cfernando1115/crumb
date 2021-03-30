import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        results: [],
        resultsPerPage: RES_PER_PAGE,
        currentPage: 1,
        query: ''
    },
    bookmarks: []
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);

        let { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };

        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        }
        else {
            state.recipe.bookmarked = false;
        }

    } catch (error) {
        console.error(`${error}!!!`);
        throw error;
    }
}

export const loadSearchResults = async function (query) {
    try {
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.query = query;
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
        state.search.currentPage = 1;
    } catch (error) {
        console.error(error);
        throw (error);
    }
}

export const getSearchResultsPage = function (page=state.search.currentPage) {
    state.search.currentPage = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
    });

    state.recipe.servings = newServings;
}

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    persistBookmarks();
}

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);
    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }

    persistBookmarks();
}

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

const init = function () {
    const storage = localStorage.getItem('bookmarks');

    if (storage) {
        state.bookmarks = JSON.parse(storage);
    }
}

init();