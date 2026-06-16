import newsService from "@/features/posts/services/newsService.js";

export const postActions = {
    async fetchPosts({ state, commit }) {
        if (state.isPostsLoading) return;

        commit('setLoading', true);
        commit('setError', null);
        commit('setPage', 1);
        commit('setHasMore', true);

        try {
            const newsData = await newsService.fetchArticles({
                page: 1,
                pageSize: state.limit,
                tag: state.activeTag
            });

            commit('setPosts', newsData.articles);
            commit('setHasMore', newsData.hasMore);
        } catch (error) {
            commit('setError', error.message);
            const fallbackData = newsService.getFallbackData(1, state.limit);
            commit('setPosts', fallbackData.articles);
            commit('setHasMore', fallbackData.hasMore);
        } finally {
            commit('setLoading', false);
        }
    },

    async loadMorePosts({ state, commit }) {
        if (state.isPostsLoading || !state.hasMore) return;

        const nextPage = state.page + 1;
        commit('setLoading', true);
        commit('setPage', nextPage);

        try {
            const newsData = await newsService.fetchArticles({
                page: nextPage,
                pageSize: state.limit,
                tag: state.activeTag
            });

            commit('addPosts', newsData.articles);
            commit('setHasMore', newsData.hasMore);
        } catch (error) {
            commit('setError', error.message);
            const fallbackData = newsService.getFallbackData(nextPage, state.limit);
            commit('addPosts', fallbackData.articles);
            commit('setHasMore', fallbackData.hasMore);
        } finally {
            commit('setLoading', false);
        }
    },

    setTag({ commit, dispatch }, tag) {
        commit('setActiveTag', tag);
        dispatch('fetchPosts');
    }
};
