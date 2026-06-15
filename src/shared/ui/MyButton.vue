<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    @click="$emit('click', $event)"
    class="my-button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    buttonClass() {
      return [
        `my-button--${this.variant}`,
        `my-button--${this.size}`,
        { 'my-button--disabled': this.disabled }
      ];
    }
  }
};
</script>

<style scoped>
.my-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border: 1px solid transparent;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-family: var(--font-sans);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.02em;
  transition: all var(--transition-fast);
  outline: none;
  white-space: nowrap;
}

.my-button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.my-button:active:not(:disabled) {
  transform: translateY(1px);
}

.my-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

/* Primary — solid accent */
.my-button--primary {
  background: var(--color-accent);
  color: #ffffff;
  border-color: var(--color-accent);
}

.my-button--primary:hover:not(:disabled) {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

/* Secondary — outlined ink */
.my-button--secondary {
  background: transparent;
  color: var(--color-ink-muted);
  border-color: var(--color-rule);
}

.my-button--secondary:hover:not(:disabled) {
  color: var(--color-ink);
  border-color: var(--color-ink-muted);
  background: var(--color-neutral-100);
}

/* Danger */
.my-button--danger {
  background: var(--color-error-500);
  color: #ffffff;
  border-color: var(--color-error-500);
}

.my-button--danger:hover:not(:disabled) {
  background: var(--color-error-600);
  border-color: var(--color-error-600);
}

/* Sizes */
.my-button--small {
  padding: 0.375rem 0.75rem;
  font-size: var(--font-size-xs);
}

.my-button--medium {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
}

.my-button--large {
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-base);
}

.my-button--disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none !important;
}
</style>
