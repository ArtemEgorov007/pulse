<template>
  <div class="post-list">
    <!-- Featured lead — first pinned or first post -->
    <div v-if="featuredPost" class="featured-post" @click="openFeatured" tabindex="0" role="button" :aria-label="featuredPost.title" @keydown.enter="openFeatured">
      <div class="featured-post__kicker">
        {{ featuredPost.category || featuredPost.source || 'Featured' }}
      </div>
      <h2 class="featured-post__title">{{ featuredPost.title }}</h2>
      <p class="featured-post__excerpt">{{ featuredPost.body }}</p>
      <div class="featured-post__rule" aria-hidden="true"></div>
      <div class="featured-post__meta">
        <span v-if="featuredPost.source" class="featured-post__source">{{ featuredPost.source }}</span>
        <span v-if="featuredPost.source && featuredPost.publishedAt" aria-hidden="true">·</span>
        <time v-if="featuredPost.publishedAt">{{ formatDate(featuredPost.publishedAt) }}</time>
        <button class="featured-post__read-btn" @click.stop="openFeaturedArticle">
          Read Article
          <Icon icon="ph:arrow-right" width="13" height="13" />
        </button>
      </div>
    </div>

    <!-- Column grid for remaining posts -->
    <div class="post-list__columns">
      <div
        v-for="(column, colIdx) in columns"
        :key="colIdx"
        class="post-list__column"
      >
        <post-item
          v-for="element in column"
          :key="element.id"
          :post="element"
          @delete="$emit('delete', element.id)"
          @pin="togglePin"
        />
      </div>
    </div>

    <!-- Featured modal -->
    <PostDetailsModal
      v-if="showFeaturedDetails"
      :post="featuredPost"
      @close="showFeaturedDetails = false"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { PostItem } from "@/features/posts/components";
import PostDetailsModal from "./PostDetailsModal.vue";
import { Icon } from "@iconify/vue";

export default {
  name: "PostList",
  components: { PostItem, PostDetailsModal, Icon },
  props: {
    posts: { type: Array, required: true }
  },
  emits: ["delete"],
  data() {
    return {
      isMobile: window.innerWidth <= 768,
      isTablet: window.innerWidth <= 1024,
      showFeaturedDetails: false
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    sortedPosts() {
      if (!Array.isArray(this.posts)) return [];
      return [...this.posts].sort((a, b) => {
        const aPinned = a.pinned || false;
        const bPinned = b.pinned || false;
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;
        return 0;
      });
    },
    featuredPost() {
      return this.sortedPosts[0] || null;
    },
    remainingPosts() {
      return this.sortedPosts.slice(1);
    },
    columnCount() {
      if (this.isMobile) return 1;
      if (this.isTablet) return 2;
      return 3;
    },
    columns() {
      const cols = Array.from({ length: this.columnCount }, () => []);
      this.remainingPosts.forEach((post, idx) => {
        cols[idx % this.columnCount].push(post);
      });
      return cols;
    }
  },
  methods: {
    ...mapMutations("post", ["togglePin"]),
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      this.isTablet = window.innerWidth <= 1024;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },
    openFeatured() {
      if (!this.featuredPost) return;
      if (this.featuredPost.url && this.featuredPost.url !== '#') return;
      this.showFeaturedDetails = true;
    },
    openFeaturedArticle() {
      if (!this.featuredPost) return;
      if (this.featuredPost.url && this.featuredPost.url !== '#') {
        window.open(this.featuredPost.url, '_blank', 'noopener,noreferrer');
      } else {
        this.showFeaturedDetails = true;
      }
    }
  }
};
</script>

<style scoped>
.post-list {
  width: 100%;
}

/* ── Featured lead ── */
.featured-post {
  border-top: 3px solid var(--color-ink);
  border-bottom: 1px solid var(--color-rule);
  padding: var(--spacing-xl) 0 var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.featured-post:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.featured-post__kicker {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

.featured-post__title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 3vw, 2.75rem);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  letter-spacing: -0.02em;
  color: var(--color-ink);
  margin-bottom: 0.875rem;
  transition: color var(--transition-fast);
}

.featured-post:hover .featured-post__title {
  color: var(--color-accent);
}

.featured-post__excerpt {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink-muted);
  line-height: var(--line-height-loose);
  max-width: 72ch;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
}

.featured-post__rule {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin-bottom: 0.875rem;
}

.featured-post__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  color: var(--color-ink-faint);
}

.featured-post__source {
  color: var(--color-accent);
  font-weight: var(--font-weight-medium);
}

.featured-post__read-btn {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.03em;
  color: var(--color-ink-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  border-bottom: 1px solid transparent;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.featured-post__read-btn:hover {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

/* ── Column grid ── */
.post-list__columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 var(--spacing-xl);
}

.post-list__column {
  border-left: 1px solid var(--color-rule);
  padding-left: var(--spacing-xl);
}

.post-list__column:first-child {
  border-left: none;
  padding-left: 0;
}

@media (max-width: 1024px) {
  .post-list__columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .post-list__columns {
    grid-template-columns: 1fr;
  }

  .post-list__column {
    border-left: none;
    padding-left: 0;
  }

  .featured-post__title {
    font-size: 1.625rem;
  }
}
</style>
