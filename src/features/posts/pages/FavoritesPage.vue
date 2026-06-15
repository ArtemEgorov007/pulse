<template>
  <div class="favorites-page">
    <div class="favorites-page__top-rule"></div>

    <div class="container">
      <header class="favorites-page__header">
        <div class="favorites-page__header-left">
          <router-link to="/posts" class="favorites-page__back">
            <Icon icon="ph:arrow-left" width="14" height="14" />
            Back to feed
          </router-link>
          <div class="favorites-page__title-row">
            <h1 class="favorites-page__title">Saved Stories</h1>
            <span class="favorites-page__count" v-if="favorites.length > 0">
              {{ favorites.length }} {{ favorites.length === 1 ? 'article' : 'articles' }}
            </span>
          </div>
        </div>
      </header>

      <div class="favorites-page__rule"></div>

      <main class="favorites-page__main">
        <div v-if="favorites.length === 0" class="favorites-page__empty">
          <Icon icon="ph:heart" width="40" height="40" class="favorites-page__empty-icon" />
          <h2 class="favorites-page__empty-title">No saved articles yet</h2>
          <p class="favorites-page__empty-desc">Click the heart icon on any story to save it here</p>
          <my-button @click="$router.push('/posts')" variant="primary" size="medium">
            Browse Stories
          </my-button>
        </div>

        <post-list
          v-else
          :posts="favorites"
          @delete="handleRemoveFavorite"
        />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { PostList } from "@/features/posts/components";
import { Icon } from "@iconify/vue";

export default {
  name: "FavoritesPage",
  components: { PostList, Icon },
  computed: {
    ...mapState("post", ["favorites"])
  },
  methods: {
    handleRemoveFavorite(postId) {
      this.$store.commit("post/removeFavorite", postId);
    }
  }
};
</script>

<style scoped>
.favorites-page {
  padding-bottom: var(--spacing-3xl);
}

.favorites-page__top-rule {
  border-top: 3px solid var(--color-ink);
  transition: border-color 0.35s ease;
}

/* Header */
.favorites-page__header {
  padding: var(--spacing-xl) 0 var(--spacing-lg);
}

.favorites-page__back {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-ink-muted);
  text-decoration: none;
  margin-bottom: var(--spacing-md);
  transition: color var(--transition-fast);
}

.favorites-page__back:hover {
  color: var(--color-accent);
}

.favorites-page__title-row {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.favorites-page__title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.025em;
  color: var(--color-ink);
  line-height: 1;
  transition: color 0.35s ease;
}

.favorites-page__count {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-accent);
  padding: 0.25rem 0.625rem;
  border: 1px solid rgba(214, 72, 43, 0.3);
  background: var(--color-accent-light);
  border-radius: var(--border-radius-sm);
}

/* Rule */
.favorites-page__rule {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin-bottom: var(--spacing-xl);
}

/* Empty */
.favorites-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-3xl) var(--spacing-lg);
  border: 1px solid var(--color-rule);
}

.favorites-page__empty-icon {
  color: var(--color-ink-faint);
  margin-bottom: var(--spacing-md);
}

.favorites-page__empty-title {
  font-family: var(--font-serif);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  color: var(--color-ink);
  margin-bottom: var(--spacing-sm);
}

.favorites-page__empty-desc {
  font-size: var(--font-size-sm);
  color: var(--color-ink-muted);
  margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
  .favorites-page__title {
    font-size: 1.625rem;
  }
}
</style>
