import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

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
        const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

        state.recipe = createRecipeObject(data);

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
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        state.search.query = query;
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key: rec.key})
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

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = [];
        const ingredientEls = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '');
                
        if (ingredientEls.length % 3 !== 0) {
            throw new Error('Wrong ingredient format');
        }

        //filter through all ingredient element keys and assign to each ingredient's properties
        for (let i = 1; i <= ingredientEls.length / 3; i++) {
            const [quantity] = ingredientEls.filter(el => el[0].includes(i) && el[0].includes('qty'));
            const [unit] = ingredientEls.filter(el => el[0].includes(i) && el[0].includes('unit'));
            const [description] = ingredientEls.filter(el => el[0].includes(i) && el[0].includes('desc'));

            //add assembled ingredient to array
            ingredients.push({ quantity: quantity[1] ? +quantity[1] : null, unit: unit[1], description: description[1] });
        }

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients
        };

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);

    } catch (error) {
        throw Error(error);
    }

}

const createRecipeObject = function (data) {
    const { recipe } = data.data;

    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key: recipe.key})
    };
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