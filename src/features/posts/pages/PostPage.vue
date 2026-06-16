<template>
  <div class="posts-page">
    <!-- Page header -->
    <header class="posts-page__header">
      <div class="posts-page__header-inner">
        <!-- Title row -->
        <div class="posts-page__title-row">
          <h1 class="posts-page__title">Latest News</h1>
          <router-link to="/favorites" class="posts-page__favorites-link">
            <Icon icon="ph:heart" width="15" height="15" />
            Saved ({{ favoritesCount }})
          </router-link>
        </div>

        <!-- Category chips -->
        <div class="posts-page__chips" role="group" aria-label="Filter by category">
          <button
            v-for="chip in tagChips"
            :key="chip.value"
            class="posts-page__chip"
            :class="{ 'posts-page__chip--active': activeTag === chip.value }"
            @click="handleTagChange(chip.value)"
          >{{ chip.label }}</button>
        </div>

        <!-- Controls row -->
        <div class="posts-page__controls">
          <div class="posts-page__search-wrap">
            <Icon icon="ph:magnifying-glass" class="posts-page__search-icon" width="16" height="16" />
            <my-input
              :value="searchQuery"
              @input="handleSearchQueryChange"
              placeholder="Search stories..."
              size="medium"
              class="posts-page__search"
            />
          </div>

          <my-select
            :value="selectedSort"
            @update:value="handleSortChange"
            :options="sortOptions"
            placeholder="Sort by"
            class="posts-page__select"
          />

          <my-button
            :disabled="isPostsLoading"
            variant="secondary"
            size="medium"
            @click="fetchPosts"
            class="posts-page__refresh"
            :aria-label="isPostsLoading ? 'Loading...' : 'Refresh'"
          >
            <Icon
              :icon="isPostsLoading ? 'ph:circle-notch' : 'ph:arrows-clockwise'"
              width="16"
              height="16"
              :class="{ 'spinning': isPostsLoading }"
            />
            <span class="posts-page__refresh-label">{{ isPostsLoading ? 'Loading' : 'Refresh' }}</span>
          </my-button>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="posts-page__main container">
      <!-- Skeleton loaders -->
      <div v-if="isPostsLoading && page === 1" class="posts-page__loading">
        <div class="skeleton-post featured-skeleton">
          <div class="skeleton-kicker"></div>
          <div class="skeleton-title skeleton-title--large"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-meta">
            <div class="skeleton-meta-item"></div>
            <div class="skeleton-meta-item"></div>
          </div>
        </div>
        <div class="skeleton-grid">
          <div class="skeleton-post" v-for="i in 6" :key="i">
            <div class="skeleton-kicker"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="sortedAndSearchedPosts.length === 0 && !isPostsLoading" class="posts-page__empty">
        <Icon icon="ph:newspaper" width="48" height="48" class="posts-page__empty-icon" />
        <h3 class="posts-page__empty-title">No stories found</h3>
        <p class="posts-page__empty-description">Try adjusting your search or check back later</p>
      </div>

      <!-- Post list -->
      <post-list
        v-else
        :posts="sortedAndSearchedPosts"
        @delete="deletePost"
      />

      <!-- Loading more -->
      <div v-if="isPostsLoading && page > 1" class="posts-page__loading-more">
        <Icon icon="ph:circle-notch" width="24" height="24" class="spinning" />
      </div>

      <!-- Intersection observer trigger -->
      <div v-intersection="loadMorePosts" class="posts-page__observer-target"></div>

      <!-- Error -->
      <div v-if="error" class="error-message" role="alert">
        <Icon icon="ph:warning" width="20" height="20" />
        <div>
          <p><strong>Couldn't reach the news source. Showing recent cached stories.</strong></p>
        </div>
      </div>
    </main>

    <!-- Scroll-to-top -->
    <transition name="fade">
      <button
        v-show="showScrollTop"
        class="posts-page__scroll-top"
        @click="scrollToTop"
        title="Back to top"
        aria-label="Back to top"
      >
        <Icon icon="ph:arrow-up" width="18" height="18" />
      </button>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { Icon } from "@iconify/vue";
import PostList from "@/features/posts/components/PostList.vue";

export default {
  name: "GlobalPost",
  components: { PostList, Icon },
  computed: {
    ...mapState("post", [
      "isPostsLoading",
      "selectedSort",
      "searchQuery",
      "page",
      "limit",
      "hasMore",
      "activeTag",
      "sortOptions",
      "showScrollTop",
      "error",
      "favorites"
    ]),
    ...mapGetters("post", ["sortedAndSearchedPosts"]),
    favoritesCount() {
      return this.favorites.length;
    },
    tagChips() {
      return [
        { label: 'All', value: '' },
        { label: 'Technology', value: 'technology' },
        { label: 'Programming', value: 'programming' },
        { label: 'AI', value: 'ai' },
        { label: 'WebDev', value: 'webdev' },
        { label: 'JavaScript', value: 'javascript' }
      ];
    }
  },
  methods: {
    ...mapMutations("post", [
      "setSearchQuery",
      "setSelectedSort",
      "setShowScrollTop",
      "removePost"
    ]),
    ...mapActions("post", ["loadMorePosts", "fetchPosts", "setTag"]),
    deletePost(postId) {
      this.removePost(postId);
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      this.setShowScrollTop(window.scrollY > 500);
    },
    handleSearchQueryChange(value) {
      this.setSearchQuery(value);
    },
    handleSortChange(value) {
      this.setSelectedSort(value);
    },
    handleTagChange(tag) {
      this.setTag(tag);
    }
  },
  mounted() {
    this.fetchPosts();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.posts-page {
  max-width: 100%;
}

/* ── Header ── */
.posts-page__header {
  border-bottom: 1px solid var(--color-rule);
  background: var(--color-paper);
  padding: var(--spacing-lg) var(--spacing-xl);
  position: sticky;
  top: var(--masthead-height, 0);
  z-index: 50;
  transition: background-color 0.35s ease, border-color 0.35s ease;
}

.posts-page__header-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.posts-page__title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.posts-page__title {
  font-family: var(--font-serif);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.02em;
  color: var(--color-ink);
  line-height: 1;
}

.posts-page__favorites-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-ink-muted);
  text-decoration: none;
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--color-rule);
  border-radius: var(--border-radius-sm);
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.posts-page__favorites-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

/* Controls */
.posts-page__controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.posts-page__search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 360px;
}

.posts-page__search-icon {
  position: absolute;
  left: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-ink-faint);
  pointer-events: none;
}

.posts-page__search {
  padding-left: 2.25rem !important;
}

.posts-page__select {
  min-width: 160px;
  flex-shrink: 0;
}

.posts-page__refresh {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

/* ── Main content ── */
.posts-page__main {
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-3xl);
}

/* ── Loading state ── */
.posts-page__loading {
  padding: 0;
}

.featured-skeleton {
  padding: var(--spacing-xl) 0;
  border-top: 3px solid var(--color-rule) !important;
  border-bottom: 1px solid var(--color-rule);
  margin-bottom: var(--spacing-xl);
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 var(--spacing-xl);
}

@media (max-width: 1024px) {
  .skeleton-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .skeleton-grid { grid-template-columns: 1fr; }
}

/* Skeleton pieces */
.skeleton-post {
  border-top: 1px solid var(--color-rule);
  padding: var(--spacing-lg) 0;
  animation: shimmer 1.6s ease-in-out infinite;
}

.skeleton-kicker {
  height: 10px;
  width: 80px;
  background: var(--color-rule);
  border-radius: 2px;
  margin-bottom: 0.625rem;
}

.skeleton-title {
  height: 20px;
  width: 85%;
  background: var(--color-rule);
  border-radius: 2px;
  margin-bottom: 0.375rem;
}

.skeleton-title--large {
  height: 36px;
  width: 90%;
  margin-bottom: 0.75rem;
}

.skeleton-text {
  height: 13px;
  background: var(--color-rule);
  border-radius: 2px;
  margin-bottom: 0.375rem;
}

.skeleton-text:last-of-type { width: 60%; }

.skeleton-meta {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.skeleton-meta-item {
  height: 11px;
  width: 80px;
  background: var(--color-rule);
  border-radius: 2px;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}

/* ── Empty state ── */
.posts-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl) var(--spacing-lg);
  text-align: center;
  border: 1px solid var(--color-rule);
  border-top: 3px solid var(--color-ink);
}

.posts-page__empty-icon {
  color: var(--color-ink-faint);
  margin-bottom: var(--spacing-md);
}

.posts-page__empty-title {
  font-family: var(--font-serif);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  color: var(--color-ink);
  margin-bottom: var(--spacing-sm);
}

.posts-page__empty-description {
  font-size: var(--font-size-sm);
  color: var(--color-ink-muted);
}

/* ── Loading more ── */
.posts-page__loading-more {
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl) 0;
  color: var(--color-ink-muted);
}

.posts-page__observer-target {
  height: 24px;
}

/* ── Scroll top ── */
.posts-page__scroll-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--color-ink);
  color: var(--color-paper);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.posts-page__scroll-top:hover {
  background: var(--color-accent);
  transform: translateY(-2px);
}

/* ── Error ── */
.error-message {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-xl);
  border: 1px solid rgba(214, 72, 43, 0.3);
  border-left: 3px solid var(--color-accent);
  background: var(--color-accent-light);
  color: var(--color-accent);
  font-size: var(--font-size-sm);
}

/* ── Fade transition ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── Spin animation ── */
.spinning {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Category chips ── */
.posts-page__chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.posts-page__chip {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-ink-muted);
  background: transparent;
  border: 1px solid var(--color-rule);
  border-radius: var(--border-radius-sm);
  padding: 0.25rem 0.625rem;
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  line-height: 1.4;
}

.posts-page__chip:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.posts-page__chip--active {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: var(--color-accent-light);
}

@media (max-width: 768px) {
  .posts-page__header {
    padding: var(--spacing-md);
    position: static;
  }

  .posts-page__title {
    font-size: var(--font-size-xl);
  }

  .posts-page__controls {
    flex-wrap: wrap;
  }

  .posts-page__search-wrap {
    max-width: 100%;
    flex: 1 1 100%;
  }

  .posts-page__select {
    flex: 1;
    min-width: 0;
  }

  .posts-page__refresh-label {
    display: none;
  }

  .posts-page__scroll-top {
    bottom: 5rem;
    right: 1rem;
  }

  .posts-page__main {
    padding-top: var(--spacing-lg);
  }
}
</style>
