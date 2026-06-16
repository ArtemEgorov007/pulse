function persistFavorites(favorites) {
    try {
        localStorage.setItem('pulse:favorites', JSON.stringify(favorites));
    } catch {
        // storage unavailable — silently skip
    }
}

export const postMutations = {
    setPosts(state, posts) {
        if (!Array.isArray(posts)) {
            state.posts = [];
            return;
        }
        state.posts = posts.map(p => ({
            ...p,
            pinned: p.pinned || false
        }));
    },

    addPosts(state, newPosts) {
        if (!Array.isArray(newPosts)) return;
        const mapped = newPosts.map(p => ({
            ...p,
            pinned: p.pinned || false
        }));
        state.posts = [...state.posts, ...mapped];
    },

    addLocalPost(state, post) {
        if (!post) return;
        state.localPosts.push({
            ...post,
            pinned: false
        });
    },

    removePost(state, postId) {
        if (!Array.isArray(state.posts)) state.posts = [];
        if (!Array.isArray(state.localPosts)) state.localPosts = [];
        state.posts = state.posts.filter(p => p.id !== postId);
        state.localPosts = state.localPosts.filter(p => p.id !== postId);
    },

    setLoading(state, value) {
        state.isPostsLoading = Boolean(value);
    },

    setPage(state, value) {
        state.page = Number(value) || 1;
    },

    setSelectedSort(state, value) {
        state.selectedSort = value || '';
    },

    setSearchQuery(state, value) {
        state.searchQuery = value || '';
    },

    setHasMore(state, value) {
        state.hasMore = Boolean(value);
    },

    setActiveTag(state, value) {
        state.activeTag = value || '';
    },

    setShowScrollTop(state, value) {
        state.showScrollTop = Boolean(value);
    },

    setError(state, value) {
        state.error = value || null;
    },

    togglePin(state, postId) {
        if (!postId) return;
        const allPosts = [...(state.localPosts || []), ...(state.posts || [])];
        const post = allPosts.find(p => p.id === postId);
        if (post) {
            post.pinned = !post.pinned;
        }
    },

    addFavorite(state, post) {
        if (!post || !post.id) return;
        const favorites = state.favorites || [];
        const isAlreadyFavorite = favorites.some(fav => fav.id === post.id);
        if (!isAlreadyFavorite) {
            state.favorites.push(JSON.parse(JSON.stringify(post)));
            persistFavorites(state.favorites);
        }
    },

    removeFavorite(state, postId) {
        if (!postId) return;
        state.favorites = (state.favorites || []).filter(post => post.id !== postId);
        persistFavorites(state.favorites);
    },

    setFavorites(state, favorites) {
        state.favorites = Array.isArray(favorites) ? favorites : [];
        persistFavorites(state.favorites);
    }
};
