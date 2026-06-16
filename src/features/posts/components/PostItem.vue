<template>
  <article
    class="post-card"
    tabindex="0"
    role="article"
    :aria-label="post.title"
    @keydown.enter="showDetails = true"
  >
    <!-- Kicker / category -->
    <div class="post-card__kicker" aria-label="Category">
      {{ post.category || 'Tech' }}
    </div>

    <!-- Headline — clickable to open details -->
    <h3 class="post-card__title" @click="showDetails = true" tabindex="0" role="button">
      {{ post.title }}
    </h3>

    <!-- Excerpt -->
    <p class="post-card__description">{{ post.body }}</p>

    <!-- Hairline rule before meta -->
    <div class="post-card__rule" aria-hidden="true"></div>

    <!-- Meta row -->
    <div class="post-card__meta">
      <span v-if="post.source" class="post-card__source">{{ post.source }}</span>
      <span v-if="post.source && post.publishedAt" class="post-card__sep" aria-hidden="true">·</span>
      <time v-if="post.publishedAt" class="post-card__date" :datetime="post.publishedAt" :title="formatDate(post.publishedAt)">
        {{ formatRelativeTime(post.publishedAt) }}
      </time>
      <span v-if="post.readingTime" class="post-card__sep" aria-hidden="true">·</span>
      <span v-if="post.readingTime" class="post-card__reading-time">{{ post.readingTime }} min read</span>
      <span v-if="post.reactions" class="post-card__sep" aria-hidden="true">·</span>
      <span v-if="post.reactions" class="post-card__reactions" :title="`${post.reactions} reactions`">
        <Icon icon="ph:heart" width="12" height="12" />{{ post.reactions }}
      </span>
      <span v-if="post.comments" class="post-card__sep" aria-hidden="true">·</span>
      <span v-if="post.comments" class="post-card__comments" :title="`${post.comments} comments`">
        <Icon icon="ph:chat-circle" width="12" height="12" />{{ post.comments }}
      </span>
    </div>

    <!-- Actions footer -->
    <div class="post-card__footer">
      <!-- Favorite toggle -->
      <button
        class="post-card__action"
        :class="{ 'post-card__action--active': isFavorite }"
        @click="toggleFavorite"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <Icon :icon="isFavorite ? 'ph:heart-fill' : 'ph:heart'" width="16" height="16" />
      </button>

      <!-- Pin toggle -->
      <button
        class="post-card__action"
        :class="{ 'post-card__action--active post-card__action--pin': post.pinned }"
        @click="$emit('pin', post.id)"
        :aria-label="post.pinned ? 'Unpin' : 'Pin'"
        :title="post.pinned ? 'Unpin' : 'Pin'"
      >
        <Icon :icon="post.pinned ? 'ph:push-pin-fill' : 'ph:push-pin'" width="16" height="16" />
      </button>

      <!-- Delete -->
      <delete-icon
        @delete="onDelete"
        title="Delete post"
        class="post-card__delete"
      />

      <!-- Read / View -->
      <button
        v-if="post.url && post.url !== '#'"
        class="post-card__read-btn"
        @click="openArticle(post.url)"
        aria-label="Read full article"
      >
        Read Article
        <Icon icon="ph:arrow-right" width="13" height="13" />
      </button>

      <button
        v-else
        class="post-card__read-btn"
        @click="showDetails = true"
        aria-label="View details"
      >
        View Details
        <Icon icon="ph:arrow-right" width="13" height="13" />
      </button>
    </div>
  </article>

  <PostDetailsModal
    v-if="showDetails"
    :post="post"
    @close="showDetails = false"
  />
</template>

<script>
import { DeleteIcon } from "@/shared/ui";
import { Icon } from "@iconify/vue";
import PostDetailsModal from "./PostDetailsModal.vue";
import { formatDate, formatRelativeTime } from "@/shared/lib/utils/dateUtils.js";
import notificationManager from '@/shared/lib/utils/notificationManager.js';

export default {
  name: "PostItem",
  components: { DeleteIcon, Icon, PostDetailsModal },
  props: {
    post: { type: Object, required: true }
  },
  emits: ["delete", "pin"],
  data() {
    return {
      showDetails: false
    };
  },
  computed: {
    isFavorite() {
      const favorites = this.$store.state.post?.favorites || [];
      return favorites.some(fav => fav.id === this.post.id);
    }
  },
  methods: {
    onDelete() {
      this.$emit("delete", this.post.id);
    },
    openArticle(url) {
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    formatDate,
    formatRelativeTime,
    toggleFavorite() {
      if (this.isFavorite) {
        this.$store.commit("post/removeFavorite", this.post.id);
        notificationManager.notify(`Removed from saved`, 'success');
      } else {
        this.$store.commit("post/addFavorite", { ...this.post });
        notificationManager.notify(`Saved to favorites`, 'success');
      }
    }
  }
};
</script>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg) 0;
  border-top: 1px solid var(--color-rule);
  background: transparent;
  transition: border-color var(--transition-fast);
  animation: revealUp 0.4s ease both;
  outline: none;
}

.post-card:first-child {
  border-top: none;
}

.post-card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: var(--border-radius-sm);
}

@keyframes revealUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Kicker */
.post-card__kicker {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
  line-height: 1;
}

/* Headline */
.post-card__title {
  font-family: var(--font-serif);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-snug);
  letter-spacing: -0.01em;
  color: var(--color-ink);
  margin-bottom: 0.625rem;
  cursor: pointer;
  transition: color var(--transition-fast);
  background: none;
  border: none;
  text-align: left;
  padding: 0;
}

.post-card__title:hover {
  color: var(--color-accent);
}

/* Excerpt */
.post-card__description {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink-muted);
  line-height: var(--line-height-base);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

/* Rule */
.post-card__rule {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin-bottom: 0.75rem;
}

/* Meta */
.post-card__meta {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  color: var(--color-ink-faint);
  margin-bottom: 0.75rem;
}

.post-card__source {
  color: var(--color-accent);
  font-weight: var(--font-weight-medium);
}

.post-card__sep {
  color: var(--color-rule);
}

.post-card__reading-time,
.post-card__reactions,
.post-card__comments {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
}

/* Footer */
.post-card__footer {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Action buttons (heart, pin, delete) */
.post-card__action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  color: var(--color-ink-faint);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: color var(--transition-fast), background var(--transition-fast);
  flex-shrink: 0;
}

.post-card__action:hover {
  color: var(--color-ink-muted);
  background: var(--color-neutral-100);
}

.post-card__action--active {
  color: var(--color-accent) !important;
}

.post-card__action--active.post-card__action--pin {
  color: var(--color-warning-500) !important;
}

.post-card__delete {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Read button */
.post-card__read-btn {
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
  padding: 0.25rem 0;
  transition: color var(--transition-fast);
  border-bottom: 1px solid transparent;
}

.post-card__read-btn:hover {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

/* Stagger delays for list items */
.post-card:nth-child(1)  { animation-delay: 0.04s; }
.post-card:nth-child(2)  { animation-delay: 0.08s; }
.post-card:nth-child(3)  { animation-delay: 0.12s; }
.post-card:nth-child(4)  { animation-delay: 0.16s; }
.post-card:nth-child(5)  { animation-delay: 0.20s; }
.post-card:nth-child(6)  { animation-delay: 0.24s; }
.post-card:nth-child(7)  { animation-delay: 0.28s; }
.post-card:nth-child(8)  { animation-delay: 0.32s; }
.post-card:nth-child(n+9){ animation-delay: 0.36s; }

@media (max-width: 768px) {
  .post-card__title {
    font-size: var(--font-size-lg);
  }
}
</style>
