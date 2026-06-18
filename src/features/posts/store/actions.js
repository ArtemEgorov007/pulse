import newsService from "@/features/posts/services/newsService.js";

async function fetchArticlesWithFallback({ page, pageSize, tag }) {
    try {
        return {
            data: await newsService.fetchArticles({ page, pageSize, tag }),
            error: null
        };
    } catch (error) {
        return {
            data: newsService.getFallbackData(page, pageSize),
            error: error.message || 'Failed to fetch articles'
        };
    }
}

export const postActions = {
    async fetchPosts({ state, commit }) {
        if (state.isPostsLoading) return;

        commit('setLoading', true);
        commit('setError', null);
        commit('setPage', 1);
        commit('setHasMore', true);

        const { data, error } = await fetchArticlesWithFallback({
            page: 1,
            pageSize: state.limit,
            tag: state.activeTag
        });

        commit('setPosts', data.articles);
        commit('setHasMore', data.hasMore);
        commit('setError', error);
        commit('setLoading', false);
    },

    async loadMorePosts({ state, commit }) {
        if (state.isPostsLoading || !state.hasMore) return;

        const nextPage = state.page + 1;
        commit('setLoading', true);
        commit('setPage', nextPage);

        const { data, error } = await fetchArticlesWithFallback({
            page: nextPage,
            pageSize: state.limit,
            tag: state.activeTag
        });

        commit('addPosts', data.articles);
        commit('setHasMore', data.hasMore);
        if (error) commit('setError', error);
        commit('setLoading', false);
    },

    setTag({ commit, dispatch }, tag) {
        commit('setActiveTag', tag);
        dispatch('fetchPosts');
    }
};
