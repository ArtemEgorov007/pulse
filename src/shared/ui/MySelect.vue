<template>
  <select
    :value="modelValue"
    @change="handleChange"
    class="my-select"
  >
    <option disabled value="" class="my-select__placeholder">
      Select from the list...
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      class="my-select__option"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'update:value'],
  methods: {
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value);
      this.$emit('update:value', event.target.value);
    }
  }
};
</script>

<style scoped>
.my-select {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.875rem;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink);
  background-color: var(--color-surface);
  border: 1px solid var(--color-rule);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235a5660' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.my-select:focus {
  border-color: var(--color-ink-muted);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
}

.my-select:disabled {
  background-color: var(--color-neutral-100);
  cursor: not-allowed;
  opacity: 0.6;
}

.my-select__placeholder {
  color: var(--color-ink-faint);
}

.my-select__option {
  color: var(--color-ink);
  background-color: var(--color-surface);
  padding: 0.5rem;
}
</style>
