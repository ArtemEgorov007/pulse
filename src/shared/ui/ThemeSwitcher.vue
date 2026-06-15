<template>
  <div class="theme-switcher">
    <button
      @click="toggleTheme"
      class="theme-switcher__button"
      :aria-label="`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`"
      :title="`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`"
    >
      <Icon
        v-if="currentTheme === 'light'"
        icon="ph:moon"
        width="16"
        height="16"
      />
      <Icon
        v-else
        icon="ph:sun"
        width="16"
        height="16"
      />
    </button>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'ThemeSwitcher',
  components: { Icon },
  data() {
    return {
      currentTheme: 'light'
    };
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else if (systemPrefersDark) {
      this.currentTheme = 'dark';
    }

    this.applyTheme();
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme();
      localStorage.setItem('theme', this.currentTheme);
    },
    applyTheme() {
      document.body.classList.add('theme-transition');
      if (this.currentTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 350);
    }
  }
};
</script>

<style scoped>
.theme-switcher__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: 1px solid var(--color-rule);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  color: var(--color-ink-muted);
  transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.theme-switcher__button:hover {
  color: var(--color-ink);
  border-color: var(--color-ink-muted);
  background: var(--color-surface-alt);
}

.theme-switcher__button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
