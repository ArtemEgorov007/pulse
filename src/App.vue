<template>
  <div class="app-layout">
    <navbar v-if="!isMobile" class="desktop-nav"></navbar>

    <main class="app-main">
      <router-view></router-view>
    </main>

    <footer class="app-footer">
      <div class="app-footer__inner">
        <div class="app-footer__brand">
          <span class="app-footer__logo">Pulse</span>
          <span class="app-footer__tagline">Technology &amp; Innovation</span>
        </div>
        <div class="app-footer__links">
          <router-link to="/posts">Home</router-link>
          <router-link to="/favorites">Saved</router-link>
          <router-link to="/about">About</router-link>
        </div>
        <p class="app-footer__copy">&copy; {{ currentYear }} Pulse. All rights reserved.</p>
      </div>
    </footer>

    <MobileNav />
    <NotificationContainer />
  </div>
</template>

<script>
import Navbar from "@/shared/ui/Navbar.vue";
import MobileNav from "@/shared/ui/MobileNav.vue";
import NotificationContainer from "@/shared/ui/NotificationContainer.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  components: { Navbar, MobileNav, NotificationContainer },
  setup() {
    const isMobile = ref(false);
    const currentYear = new Date().getFullYear();

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

    return { isMobile, currentYear };
  }
};
</script>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
}

/* Footer */
.app-footer {
  background: var(--color-paper);
  border-top: 1px solid var(--color-rule);
  padding: var(--spacing-xl) var(--spacing-xl);
  margin-top: var(--spacing-3xl);
  transition: background-color 0.35s ease, border-color 0.35s ease;
}

.app-footer__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--spacing-lg);
}

.app-footer__brand {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app-footer__logo {
  font-family: var(--font-serif);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-ink);
  letter-spacing: -0.02em;
  line-height: 1;
}

.app-footer__tagline {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

.app-footer__links {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
}

.app-footer__links a {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-ink-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.app-footer__links a:hover {
  color: var(--color-accent);
}

.app-footer__copy {
  font-size: var(--font-size-xs);
  color: var(--color-ink-faint);
  text-align: right;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .app-footer__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .app-footer__brand {
    align-items: center;
  }

  .app-footer__copy {
    text-align: center;
  }

  .app-main {
    padding-bottom: 72px;
  }
}
</style>
