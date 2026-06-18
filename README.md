# 🚀 Pulse — Modern Vue 3 News Application

**Pulse** is a modern news application built with **Vue 3** and **Vite** that demonstrates best practices in frontend development. This project showcases API integration, state management, responsive UI design, and modern development techniques.

---

## ✨ Key Features

* ⚡ **Lightning Fast Development** with Vite's hot module replacement
* 🎨 **Vue 3 Single File Components** (Options & Composition API)
* 📱 **Fully Responsive Design** that works on all device sizes
* 🌙 **Dark/Light Theme Switching** with persistent user preferences
* ❤️ **Favorites System** to save and manage preferred articles
* 🔍 **Search & Sort Functionality** to find relevant content
* 📚 **Infinite Scrolling** for seamless content browsing
* 🛠 **Custom Directives** and reusable UI components
* 🌌 **Clean, Maintainable Code** following modern best practices
* 📰 **Real-time Technology News** powered by Dev.to API

---

## 🛠 Technologies & Tools

* [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
* [Vite](https://vitejs.dev/) - Next generation frontend tooling
* [Vuex](https://vuex.vuejs.org/) - State management pattern + library
* [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
* [Iconify](https://iconify.design/) - Universal icon framework
* [Dev.to API](https://developers.forem.com/api) - Public tech articles API (no key required)
* [Axios](https://axios-http.com/) - Promise based HTTP client
* CSS Variables & Modern CSS Features

---

## 📦 Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/ArtemEgorov007/pulse.git
cd pulse
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Environment Configuration

No API key required — Pulse uses the public [Dev.to API](https://developers.forem.com/api) which is keyless and CORS-friendly.

### 4. Development Server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Production Build

```sh
npm run build
```

---

## 🖥 Application Features

The application fetches real-time technology news from the [Dev.to API](https://dev.to/api/articles) and presents them in an engaging interface:

* **Pulse**: Browse the latest technology news articles
* **Favorites**: Save articles to your personal favorites list
* **Search**: Find specific articles by keywords
* **Sorting**: Sort articles by title or description
* **Infinite Scroll**: Automatically load more articles as you scroll
* **Responsive Design**: Optimized for mobile, tablet, and desktop
* **Theme Switching**: Toggle between light and dark themes
* **External Links**: Read full articles on their original sources
* **Detailed View**: View article details in a modal popup

---

## 🎨 UI/UX Improvements

Recent enhancements to the user interface include:

* **Modern Card Design**: Enhanced visual hierarchy and improved readability
* **Smooth Animations**: Subtle transitions and hover effects for better user experience
* **Skeleton Loading**: Animated placeholders during content loading
* **Enhanced Notifications**: Beautiful toast notifications with different types (success, error, info, warning)
* **Improved Accessibility**: Better keyboard navigation and screen reader support
* **Focus Management**: Proper focus handling for modals and interactive elements

---

## 🐞 Known Limitations

* The application uses the public Dev.to API which may have rate limits under heavy load
* Favorites are persisted in localStorage
* Some experimental features may have inconsistent behavior

---

## 🚀 Future Improvements

Planned enhancements for the application:

- [ ] Add pagination as an alternative to infinite scrolling
- [ ] Support for multiple news categories
- [ ] User authentication and personalized feeds
- [ ] Advanced filtering options
- [ ] Offline support with service workers
- [ ] Progressive Web App (PWA) capabilities
- [ ] Performance optimization for large datasets
- [ ] Enhanced accessibility features
- [ ] Internationalization support

---

## 🤝 Contributing

Contributions are welcome! To contribute to this project:

1. Sync `main`: `git checkout main && git pull origin main`
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push the branch: `git push -u origin feature/your-feature`
5. Open a Pull Request and merge into `main`
6. After merge, update local `main`: `git checkout main && git pull origin main`

> **Note:** Pushing to a feature branch that was already merged does **not** update `main`. Either open a new PR or push directly to `main` if you work solo.

Please ensure your code follows the existing style and includes appropriate tests.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Feel free to use, modify, and distribute this project as you see fit.