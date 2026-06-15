<template>
  <nav class="mobile-nav" v-if="isMobile" aria-label="Mobile navigation">
    <router-link
      to="/posts"
      class="mobile-nav__link"
      :class="{ 'mobile-nav__link--active': $route.name === 'Posts' }"
      aria-label="Home"
    >
      <Icon icon="ph:house-simple" width="22" height="22" />
      <span class="mobile-nav__label">Home</span>
    </router-link>

    <router-link
      to="/favorites"
      class="mobile-nav__link"
      :class="{ 'mobile-nav__link--active': $route.name === 'Favorites' }"
      aria-label="Saved"
    >
      <Icon icon="ph:heart" width="22" height="22" />
      <span class="mobile-nav__label">Saved</span>
    </router-link>

    <router-link
      to="/about"
      class="mobile-nav__link"
      :class="{ 'mobile-nav__link--active': $route.name === 'About' }"
      aria-label="About"
    >
      <Icon icon="ph:info" width="22" height="22" />
      <span class="mobile-nav__label">About</span>
    </router-link>

    <div class="mobile-nav__divider" aria-hidden="true"></div>

    <div class="mobile-nav__link mobile-nav__theme">
      <theme-switcher />
    </div>
  </nav>
</template>

<script>
import { Icon } from '@iconify/vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ThemeSwitcher from './ThemeSwitcher.vue';

export default {
  name: 'MobileNav',
  components: { Icon, ThemeSwitcher },
  setup() {
    const isMobile = ref(false);

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      checkMobile();
      window.addEventListener('resize', checkMobile);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile);
    });

    return { isMobile };
  }
};
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom));
  background: var(--color-paper);
  border-top: 2px solid var(--color-ink);
  z-index: 1000;
  transition: background-color 0.35s ease, border-color 0.35s ease;
}

.mobile-nav__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--color-ink-muted);
  transition: color var(--transition-fast);
  border-radius: var(--border-radius-sm);
}

.mobile-nav__link:hover {
  color: var(--color-ink);
}

.mobile-nav__link--active {
  color: var(--color-accent);
}

.mobile-nav__label {
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mobile-nav__divider {
  width: 1px;
  height: 2rem;
  background: var(--color-rule);
}

.mobile-nav__theme {
  color: inherit;
  padding: 0.5rem;
}

@media (max-width: 380px) {
  .mobile-nav__label {
    display: none;
  }
}
</style>
