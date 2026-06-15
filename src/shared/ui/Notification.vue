<template>
  <div class="notification" :class="`notification--${type}`" role="alert" aria-live="polite">
    <div class="notification__bar" aria-hidden="true"></div>
    <div class="notification__body">
      <Icon :icon="icon" width="16" height="16" class="notification__icon" aria-hidden="true" />
      <span class="notification__message">{{ message }}</span>
      <button class="notification__close" @click="$emit('close')" aria-label="Close notification">
        <Icon icon="ph:x" width="14" height="14" />
      </button>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'Notification',
  components: { Icon },
  props: {
    message: { type: String, required: true },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
    }
  },
  emits: ['close'],
  computed: {
    icon() {
      return {
        info:    'ph:info',
        success: 'ph:check-circle',
        warning: 'ph:warning',
        error:   'ph:x-circle'
      }[this.type] || 'ph:info';
    }
  }
};
</script>

<style scoped>
.notification {
  display: flex;
  background: var(--color-surface);
  border: 1px solid var(--color-rule);
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  animation: slideIn 0.25s cubic-bezier(0.2, 0.8, 0.3, 1) both;
  min-width: 280px;
  max-width: 360px;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

/* Left colour bar */
.notification__bar {
  width: 3px;
  flex-shrink: 0;
  align-self: stretch;
}

.notification--info    .notification__bar { background: var(--color-accent); }
.notification--success .notification__bar { background: var(--color-success-500); }
.notification--warning .notification__bar { background: var(--color-warning-500); }
.notification--error   .notification__bar { background: var(--color-error-500); }

/* Body */
.notification__body {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.75rem 0.75rem 0.875rem;
  flex: 1;
}

/* Icon */
.notification__icon {
  flex-shrink: 0;
}

.notification--info    .notification__icon { color: var(--color-accent); }
.notification--success .notification__icon { color: var(--color-success-500); }
.notification--warning .notification__icon { color: var(--color-warning-500); }
.notification--error   .notification__icon { color: var(--color-error-500); }

/* Message */
.notification__message {
  flex: 1;
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-ink);
  line-height: var(--line-height-snug);
}

/* Close */
.notification__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  color: var(--color-ink-faint);
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: color var(--transition-fast), background var(--transition-fast);
  flex-shrink: 0;
}

.notification__close:hover {
  color: var(--color-ink);
  background: var(--color-neutral-100);
}

@media (max-width: 768px) {
  .notification {
    min-width: 240px;
    max-width: calc(100vw - 2rem);
  }
}
</style>
