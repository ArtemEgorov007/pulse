<template>
  <header class="masthead">
    <!-- Scroll progress bar -->
    <div class="masthead__progress" :style="{ width: scrollProgress + '%' }"></div>

    <!-- Top strip: dateline + nav + theme -->
    <div class="masthead__top">
      <div class="masthead__top-inner">
        <span class="masthead__dateline">{{ formattedDate }}</span>

        <ul class="masthead__nav-list">
          <li>
            <router-link to="/posts" class="masthead__nav-link" aria-label="Home">
              <Icon icon="ph:house-simple" width="18" height="18" />
              <span class="masthead__nav-label">Home</span>
            </router-link>
          </li>
          <li>
            <router-link to="/favorites" class="masthead__nav-link" aria-label="Favorites">
              <Icon icon="ph:heart" width="18" height="18" />
              <span class="masthead__nav-label">Saved</span>
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="masthead__nav-link" aria-label="About">
              <Icon icon="ph:info" width="18" height="18" />
              <span class="masthead__nav-label">About</span>
            </router-link>
          </li>
          <li class="masthead__nav-divider" aria-hidden="true"></li>
          <li>
            <theme-switcher />
          </li>
        </ul>
      </div>
    </div>

    <!-- Rule -->
    <div class="masthead__rule" aria-hidden="true"></div>

    <!-- Masthead logo -->
    <div class="masthead__brand">
      <router-link to="/" class="masthead__logo" aria-label="Pulse — Home">
        <span class="masthead__logo-text">Pulse</span>
      </router-link>
      <p class="masthead__tagline">Technology &amp; Innovation</p>
    </div>

    <!-- Bottom rule -->
    <div class="masthead__rule masthead__rule--thick" aria-hidden="true"></div>
  </header>
</template>

<script>
import { Icon } from '@iconify/vue';
import ThemeSwitcher from './ThemeSwitcher.vue';

export default {
  name: 'Navbar',
  components: { Icon, ThemeSwitcher },
  data() {
    return {
      scrollProgress: 0
    };
  },
  computed: {
    formattedDate() {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
    }
  }
};
</script>

<style scoped>
.masthead {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-paper);
  border-bottom: 2px solid var(--color-ink);
  transition: background-color 0.35s ease, border-color 0.35s ease;
}

/* Scroll progress */
.masthead__progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--color-accent);
  transition: width 0.1s linear;
  z-index: 10;
}

/* Top strip */
.masthead__top {
  padding: 0 var(--spacing-xl);
}

.masthead__top-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.masthead__dateline {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-ink-muted);
  transition: color 0.35s ease;
}

/* Nav */
.masthead__nav-list {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

.masthead__nav-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-ink-muted);
  text-decoration: none;
  border-radius: var(--border-radius-sm);
  transition: color var(--transition-fast);
  position: relative;
}

.masthead__nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.625rem;
  right: 0.625rem;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform var(--transition-fast);
  transform-origin: center;
}

.masthead__nav-link:hover {
  color: var(--color-ink);
}

.masthead__nav-link.router-link-exact-active {
  color: var(--color-ink);
}

.masthead__nav-link.router-link-exact-active::after {
  transform: scaleX(1);
}

.masthead__nav-label {
  display: inline;
}

.masthead__nav-divider {
  width: 1px;
  height: 1rem;
  background: var(--color-rule);
  margin: 0 0.25rem;
}

/* Rule */
.masthead__rule {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin: 0 var(--spacing-xl);
  transition: border-color 0.35s ease;
}

.masthead__rule--thick {
  border-top-width: 3px;
  border-color: var(--color-ink);
  margin: 0;
}

/* Brand */
.masthead__brand {
  text-align: center;
  padding: 1rem var(--spacing-xl) 0.875rem;
}

.masthead__logo {
  text-decoration: none;
  display: inline-block;
}

.masthead__logo-text {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.03em;
  color: var(--color-ink);
  line-height: 1;
  transition: color var(--transition-fast);
  display: block;
}

.masthead__logo:hover .masthead__logo-text {
  color: var(--color-accent);
}

.masthead__tagline {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  margin-top: 0.25rem;
  transition: color 0.35s ease;
}

@media (max-width: 640px) {
  .masthead__nav-label {
    display: none;
  }

  .masthead__dateline {
    display: none;
  }

  .masthead__top {
    padding: 0 var(--spacing-md);
  }

  .masthead__rule {
    margin: 0 var(--spacing-md);
  }

  .masthead__brand {
    padding: 0.75rem var(--spacing-md) 0.75rem;
  }
}
</style>
