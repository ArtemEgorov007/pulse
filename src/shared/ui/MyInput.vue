<template>
  <input
    :class="inputClass"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
    class="my-input"
  />
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'password', 'email', 'number', 'tel', 'url'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  emits: ['update:modelValue', 'input', 'blur', 'focus'],
  computed: {
    inputClass() {
      return [
        `my-input--${this.size}`,
        { 'my-input--disabled': this.disabled }
      ];
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
      this.$emit('input', event.target.value);
    },
    handleBlur(event) {
      this.$emit('blur', event);
    },
    handleFocus(event) {
      this.$emit('focus', event);
    }
  }
};
</script>

<style scoped>
.my-input {
  width: 100%;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink);
  background: var(--color-surface);
  border: 1px solid var(--color-rule);
  border-radius: var(--border-radius-sm);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
}

.my-input::placeholder {
  color: var(--color-ink-faint);
}

.my-input:focus {
  border-color: var(--color-ink-muted);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
  background: var(--color-surface);
}

.my-input:disabled {
  background: var(--color-neutral-100);
  cursor: not-allowed;
  color: var(--color-ink-faint);
}

.my-input--small  { padding: 0.375rem 0.625rem; }
.my-input--medium { padding: 0.5rem 0.875rem; }
.my-input--large  { padding: 0.75rem 1rem; font-size: var(--font-size-base); }

.my-input--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
