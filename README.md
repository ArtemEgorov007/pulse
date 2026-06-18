# Pulse

Новостное приложение на Vue 3 — лента технологических статей из [Dev.to API](https://dev.to/api/articles).

**Демо:** [artemegorov007.github.io/pulse](https://artemegorov007.github.io/pulse/)

## Возможности

- Лента статей с бесконечной прокруткой
- Поиск, сортировка, фильтр по тегам
- Избранное (localStorage)
- Светлая / тёмная тема
- Адаптивная вёрстка

## Стек

Vue 3 · Vite · Vuex · Vue Router · Axios · Iconify · Dev.to API

Ключ API не нужен.

## Запуск

```sh
git clone https://github.com/ArtemEgorov007/pulse.git
cd pulse
npm install
npm run dev
```

Приложение откроется на [localhost:3000](http://localhost:3000).

Сборка:

```sh
npm run build
```

## Git-workflow

```sh
git checkout main && git pull origin main
git checkout -b feature/my-change
# ... правки ...
git push -u origin feature/my-change
# PR → merge в main
```

> Коммиты в уже сmerged-енную feature-ветку не попадают в `main` автоматически.

## Лицензия

[MIT](LICENSE)
