<template>
  <div class="delete-wrapper">
    <button
      class="delete-icon"
      @click="showConfirm = true"
      :title="title"
      aria-label="Delete post"
    >
      <Icon icon="ph:trash" width="16" height="16" />
    </button>

    <transition name="fade">
      <div
        v-if="showConfirm"
        class="confirm-overlay"
        @click.self="showConfirm = false"
        role="dialog"
        aria-modal="true"
        aria-label="Confirm deletion"
      >
        <div class="confirm-dialog">
          <p class="confirm-text">Delete this post?</p>
          <div class="confirm-actions">
            <button class="btn btn--danger" @click="confirmDelete">Delete</button>
            <button class="btn btn--secondary" @click="showConfirm = false">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "DeleteIcon",
  components: { Icon },
  emits: ["delete"],
  props: {
    title: { type: String, default: "Delete" }
  },
  data: () => ({
    showConfirm: false
  }),
  methods: {
    confirmDelete() {
      this.$emit("delete");
      this.showConfirm = false;
    }
  }
};
</script>

<style scoped>
.delete-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-ink-faint);
  border-radius: var(--border-radius-sm);
  transition: color var(--transition-fast), background var(--transition-fast);
}

.delete-icon:hover {
  color: var(--color-error-500);
  background: rgba(239, 68, 68, 0.08);
}

.delete-icon:focus-visible {
  outline: 2px solid var(--color-error-500);
  outline-offset: 2px;
}

/* Confirm overlay */
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(22, 21, 26, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.confirm-dialog {
  background: var(--color-surface);
  border: 1px solid var(--color-rule);
  border-top: 3px solid var(--color-ink);
  padding: var(--spacing-xl);
  max-width: 260px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-xl);
  border-radius: var(--border-radius-sm);
  animation: scaleIn 0.2s cubic-bezier(0.2, 0.8, 0.3, 1) both;
}

.confirm-text {
  font-family: var(--font-serif);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-ink);
  margin-bottom: var(--spacing-lg);
  line-height: var(--line-height-snug);
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
}

.btn {
  padding: 0.5rem 1.125rem;
  border: 1px solid transparent;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
}

.btn:active { transform: translateY(1px); }

.btn--danger {
  background: var(--color-error-500);
  color: #ffffff;
  border-color: var(--color-error-500);
}

.btn--danger:hover {
  background: var(--color-error-600);
  border-color: var(--color-error-600);
}

.btn--secondary {
  background: transparent;
  color: var(--color-ink-muted);
  border-color: var(--color-rule);
}

.btn--secondary:hover {
  color: var(--color-ink);
  border-color: var(--color-ink-muted);
  background: var(--color-neutral-100);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scaleIn {
  from { transform: scale(0.94); opacity: 0; }
  to   { transform: scale(1);    opacity: 1; }
}
</style>
