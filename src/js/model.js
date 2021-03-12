import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        results: [],
        resultsPerPage: RES_PER_PAGE,
        currentPage: 1,
        query: ''
    }
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