import{postActions} from './actions.js';
import {postMutations} from './mutations.js';
import {postGetters} from './getters.js';

function loadFavorites() {
    try {
        return JSON.parse(localStorage.getItem('pulse:favorites')) || [];
    } catch {
        return [];
    }
}

export const postModule = {
    namespaced: true,

    state: () => ({
        posts: [],
        localPosts: [],
        favorites: loadFavorites(),
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        hasMore: true,
        activeTag: '',
        showScrollTop: false,
        error: null,
        sortOptions: [
            {value: "", name: "No sorting"},
            {value: "title", name: "By title"},
            {value: "body", name: "By description"}
        ]
    }),

    getters: postGetters,

    mutations: postMutations,

    actions: postActions
};
