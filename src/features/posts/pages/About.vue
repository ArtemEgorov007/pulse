<template>
  <div class="about-page">
    <div class="about-page__top-rule"></div>

    <div class="container">
      <!-- Header -->
      <header class="about-page__header">
        <p class="about-page__kicker">About</p>
        <h1 class="about-page__title">Pulse: A Digital Broadsheet</h1>
        <p class="about-page__subtitle">
          Crafted with Vue 3 &amp; modern web standards
        </p>
      </header>

      <div class="about-page__rule"></div>

      <!-- Content body -->
      <div class="about-page__body">
        <!-- Main column -->
        <div class="about-page__main-col">
          <section class="about-page__section">
            <h2 class="about-page__section-title">Our Mission</h2>
            <p class="about-page__text">
              Pulse is built on the belief that reading the news should feel as elegant
              as the best editorial design — clean typography, deliberate hierarchy, and
              zero visual noise competing with the content.
            </p>
            <p class="about-page__text">
              The application lets you browse, search, and save technology stories from
              around the world. Every design decision serves readability: a paper-toned
              palette, a proper serif display face, and a layout that echoes the tradition
              of broadsheet journalism.
            </p>
            <p class="about-page__text">
              Developed by Egorov and validated by Oleshkevich — built to demonstrate
              that portfolio work can meet production-level quality.
            </p>
          </section>

          <div class="about-page__inner-rule"></div>

          <section class="about-page__section">
            <h2 class="about-page__section-title">Why Vue.js?</h2>
            <p class="about-page__text">
              Vue 3's Single File Components and reactive state management via Vuex make it
              straightforward to build performant, maintainable SPAs. Its progressive
              philosophy keeps bundle sizes lean while supporting complex feature sets.
            </p>
          </section>
        </div>

        <!-- Sidebar -->
        <aside class="about-page__sidebar">
          <div class="about-page__sidebar-block">
            <h3 class="about-page__sidebar-title">Stack</h3>
            <div class="about-page__tech-stack">
              <span class="about-page__tech-item" v-for="tech in techStack" :key="tech">{{ tech }}</span>
            </div>
          </div>

          <div class="about-page__sidebar-rule"></div>

          <div class="about-page__sidebar-block">
            <h3 class="about-page__sidebar-title">Quick Links</h3>
            <ul class="about-page__sidebar-links">
              <li>
                <router-link to="/posts" class="about-page__sidebar-link">
                  <Icon icon="ph:newspaper" width="14" height="14" />
                  Browse Feed
                </router-link>
              </li>
              <li>
                <router-link to="/favorites" class="about-page__sidebar-link">
                  <Icon icon="ph:heart" width="14" height="14" />
                  Saved Stories
                </router-link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <!-- CTA -->
      <div class="about-page__cta">
        <div class="about-page__cta-rule"></div>
        <div class="about-page__cta-inner">
          <p class="about-page__cta-text">Ready to start reading?</p>
          <router-link to="/posts" class="about-page__button">
            Open the Feed
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'AboutPage',
  components: { Icon },
  data() {
    return {
      techStack: ['Vue 3', 'Vue Router', 'Vuex', 'Vite', 'Axios', 'Dev.to API', 'ES6+']
    };
  }
};
</script>

<style scoped>
.about-page {
  padding-bottom: var(--spacing-3xl);
}

.about-page__top-rule {
  border-top: 3px solid var(--color-ink);
  transition: border-color 0.35s ease;
}

/* Header */
.about-page__header {
  padding: var(--spacing-xl) var(--spacing-2xl);
}

.about-page__kicker {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
}

.about-page__title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.025em;
  color: var(--color-ink);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-lg);
  transition: color 0.35s ease;
}

.about-page__subtitle {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-loose);
  color: var(--color-ink-muted);
  transition: color 0.35s ease;
}

/* Rule */
.about-page__rule {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin-bottom: var(--spacing-2xl);
}

/* Body layout */
.about-page__body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 0 var(--spacing-2xl);
  align-items: start;
}

/* Sections */
.about-page__section {
  margin-bottom: var(--spacing-xl);
}

.about-page__section:last-child {
  margin-bottom: 0;
}

.about-page__section-title {
  font-family: var(--font-serif);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.01em;
  color: var(--color-ink);
  margin-bottom: var(--spacing-md);
  transition: color 0.35s ease;
}

.about-page__text {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink-muted);
  line-height: var(--line-height-loose);
  margin-bottom: var(--spacing-md);
  transition: color 0.35s ease;
}

.about-page__text:last-child {
  margin-bottom: 0;
}

.about-page__inner-rule {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin: var(--spacing-xl) 0;
}

/* Sidebar */
.about-page__sidebar {
  border-left: 1px solid var(--color-rule);
  padding-left: var(--spacing-xl);
}

.about-page__sidebar-block {
  padding-bottom: var(--spacing-lg);
}

.about-page__sidebar-title {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-ink-faint);
  margin-bottom: var(--spacing-md);
}

/* Tech stack */
.about-page__tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.about-page__tech-item {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.02em;
  color: var(--color-accent);
  background: var(--color-accent-light);
  border: 1px solid rgba(214, 72, 43, 0.2);
  padding: 0.25rem 0.625rem;
  border-radius: var(--border-radius-sm);
  transition: color 0.35s ease, background 0.35s ease;
}

.about-page__sidebar-rule {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin-bottom: var(--spacing-lg);
}

/* Sidebar links */
.about-page__sidebar-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.about-page__sidebar-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.about-page__sidebar-link:hover {
  color: var(--color-accent);
}

/* CTA */
.about-page__cta {
  margin-top: var(--spacing-2xl);
}

.about-page__cta-rule {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin-bottom: var(--spacing-xl);
}

.about-page__cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.about-page__cta-text {
  font-family: var(--font-serif);
  font-size: var(--font-size-xl);
  color: var(--color-ink-muted);
  font-style: italic;
  transition: color 0.35s ease;
}

.about-page__button {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.02em;
  text-decoration: none;
  padding: 0.625rem 1.25rem;
  background: var(--color-accent);
  color: #ffffff;
  border: 1px solid var(--color-accent);
  border-radius: var(--border-radius-sm);
  transition: background var(--transition-fast), border-color var(--transition-fast);
}

.about-page__button:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  color: #ffffff;
}

@media (max-width: 1024px) {
  .about-page__body {
    grid-template-columns: 1fr 240px;
  }
}

@media (max-width: 768px) {
  .about-page__body {
    grid-template-columns: 1fr;
  }

  .about-page__sidebar {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid var(--color-rule);
    padding-top: var(--spacing-xl);
    margin-top: var(--spacing-lg);
  }

  .about-page__title {
    font-size: 1.75rem;
  }
}
</style>
