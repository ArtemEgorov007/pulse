<template>
  <div class="hero">
    <!-- Top rule -->
    <div class="hero__top-rule"></div>

    <div class="container">
      <!-- Masthead intro -->
      <div class="hero__lead">
        <div class="hero__lead-left">
          <p class="hero__kicker">Welcome to Pulse</p>
          <h1 class="hero__title">
            The world's technology stories, curated for you.
          </h1>
          <p class="hero__subtitle">
            Browse, discover and save the latest in tech, science and innovation.
            A modern editorial experience built on Vue 3.
          </p>
          <div class="hero__actions">
            <router-link to="/posts" class="hero__btn hero__btn--primary">
              Read Today's News
            </router-link>
            <router-link to="/about" class="hero__btn hero__btn--secondary">
              About Pulse
            </router-link>
          </div>
        </div>

        <!-- Editorial decoration: large drop cap / symbol -->
        <div class="hero__lead-right" aria-hidden="true">
          <div class="hero__initial">P</div>
        </div>
      </div>

      <!-- Divider -->
      <div class="hero__rule"></div>

      <!-- Feature cards -->
      <div class="hero__features">
        <div class="feature-card">
          <div class="feature-card__num" aria-hidden="true">01</div>
          <Icon icon="ph:heart" width="28" height="28" class="feature-card__icon" />
          <h3 class="feature-card__title">Save Favorites</h3>
          <p class="feature-card__description">Bookmark articles you love and return to them anytime.</p>
        </div>

        <div class="feature-card">
          <div class="feature-card__num" aria-hidden="true">02</div>
          <Icon icon="ph:magnifying-glass" width="28" height="28" class="feature-card__icon" />
          <h3 class="feature-card__title">Smart Search</h3>
          <p class="feature-card__description">Find exactly what you're looking for across all stories.</p>
        </div>

        <div class="feature-card">
          <div class="feature-card__num" aria-hidden="true">03</div>
          <Icon icon="ph:bell-simple" width="28" height="28" class="feature-card__icon" />
          <h3 class="feature-card__title">Live Feed</h3>
          <p class="feature-card__description">Fresh stories pulled straight from the Dev.to API in real time.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'MainPage',
  components: { Icon }
};
</script>

<style scoped>
.hero {
  padding-bottom: var(--spacing-3xl);
}

.hero__top-rule {
  border-top: 3px solid var(--color-ink);
  transition: border-color 0.35s ease;
}

/* ── Lead section ── */
.hero__lead {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: var(--spacing-xl);
  padding: var(--spacing-2xl) 0 var(--spacing-xl);
}

.hero__kicker {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
}

.hero__title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  letter-spacing: -0.025em;
  color: var(--color-ink);
  margin-bottom: var(--spacing-lg);
  max-width: 18ch;
  transition: color 0.35s ease;
}

.hero__subtitle {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink-muted);
  line-height: var(--line-height-loose);
  max-width: 48ch;
  margin-bottom: var(--spacing-xl);
}

/* Buttons */
.hero__actions {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.02em;
  text-decoration: none;
  padding: 0.625rem 1.25rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}

.hero__btn--primary {
  background: var(--color-accent);
  color: #ffffff;
  border-color: var(--color-accent);
}

.hero__btn--primary:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  color: #ffffff;
}

.hero__btn--secondary {
  background: transparent;
  color: var(--color-ink-muted);
  border-color: var(--color-rule);
}

.hero__btn--secondary:hover {
  color: var(--color-ink);
  border-color: var(--color-ink-muted);
  background: var(--color-neutral-100);
}

/* Drop-cap / decorative initial */
.hero__lead-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--spacing-xl);
}

.hero__initial {
  font-family: var(--font-serif);
  font-size: clamp(6rem, 12vw, 11rem);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-rule);
  user-select: none;
  transition: color 0.35s ease;
}

/* Rule between sections */
.hero__rule {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin-bottom: var(--spacing-2xl);
}

/* ── Feature cards ── */
.hero__features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

.feature-card {
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-xl) 0;
  border-left: 1px solid var(--color-rule);
  padding-left: var(--spacing-xl);
  position: relative;
  transition: border-color 0.35s ease;
}

.feature-card:first-child {
  border-left: none;
  padding-left: 0;
}

.feature-card__num {
  font-family: var(--font-serif);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  color: var(--color-ink-faint);
  letter-spacing: 0.06em;
  margin-bottom: var(--spacing-md);
  transition: color 0.35s ease;
}

.feature-card__icon {
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
  display: block;
}

.feature-card__title {
  font-family: var(--font-serif);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-ink);
  margin-bottom: var(--spacing-sm);
  transition: color 0.35s ease;
}

.feature-card__description {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink-muted);
  line-height: var(--line-height-base);
  transition: color 0.35s ease;
}

@media (max-width: 1024px) {
  .hero__features {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg) 0;
  }

  .hero__features .feature-card:nth-child(2) {
    border-left: 1px solid var(--color-rule);
    padding-left: var(--spacing-xl);
  }

  .hero__features .feature-card:nth-child(3) {
    border-left: none;
    padding-left: 0;
  }
}

@media (max-width: 768px) {
  .hero__lead {
    grid-template-columns: 1fr;
  }

  .hero__lead-right {
    display: none;
  }

  .hero__title {
    max-width: none;
  }

  .hero__features {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .feature-card {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid var(--color-rule);
    padding-top: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
  }

  .feature-card:first-child {
    border-top: none;
    padding-top: 0;
  }
}
</style>
