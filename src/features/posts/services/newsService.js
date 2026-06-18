import axios from 'axios';

const BASE_URL = 'https://dev.to/api';

const newsService = {
    /**
     * Fetch articles from Dev.to API
     * @param {Object} options
     * @param {number} options.page - Page number (1-based)
     * @param {number} options.pageSize - Number of articles per page
     * @param {string} options.tag - Optional tag filter (dev.to lowercase tag)
     * @returns {Promise<{articles: Array, hasMore: boolean}>}
     */
    async fetchArticles({ page = 1, pageSize = 10, tag = '' } = {}) {
        const params = { per_page: pageSize, page };
        if (tag) params.tag = tag;

        const response = await axios.get(`${BASE_URL}/articles`, { params });

        const articles = response.data.map(a => ({
            id: a.id,
            title: a.title,
            body: a.description || 'No description available',
            url: a.url,
            publishedAt: a.published_at || a.published_timestamp,
            source: a.organization?.name || a.user?.name || 'DEV Community',
            author: a.user?.name || null,
            authorAvatar: a.user?.profile_image_90 || a.user?.profile_image || null,
            image: a.cover_image || a.social_image || null,
            tags: Array.isArray(a.tag_list) ? a.tag_list : [],
            category: (a.tag_list && a.tag_list[0]) || 'Tech',
            readingTime: a.reading_time_minutes || null,
            reactions: a.public_reactions_count || 0,
            comments: a.comments_count || 0
        }));

        return {
            articles,
            hasMore: articles.length === pageSize
        };
    },

    /**
     * Fallback data for network failures only
     * @param {number} page
     * @param {number} pageSize
     * @returns {{articles: Array, hasMore: boolean}}
     */
    getFallbackData(page, pageSize) {
        const fallbackArticles = [
            {
                id: 1,
                title: 'Breakthrough in Quantum Computing Achieved',
                body: 'Scientists demonstrate quantum supremacy with new 128-qubit processor, paving the way for revolutionary advances in cryptography and drug discovery.',
                url: 'https://dev.to',
                source: 'Tech Science Journal',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['technology', 'science'],
                category: 'technology',
                readingTime: null,
                reactions: 0,
                comments: 0
            },
            {
                id: 2,
                title: 'AI Assistant Surpasses Human Performance in Coding Tasks',
                body: 'New language model shows exceptional ability to generate, debug, and optimize code across multiple programming languages with near-perfect accuracy.',
                url: 'https://dev.to',
                source: 'AI Research Daily',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['ai', 'programming'],
                category: 'ai',
                readingTime: null,
                reactions: 0,
                comments: 0
            },
            {
                id: 3,
                title: 'Next-Gen Internet Protocol Deployment Accelerates',
                body: 'IPv6 adoption reaches 75% globally as organizations migrate to the new standard, promising enhanced security and unlimited address space.',
                url: 'https://dev.to',
                source: 'Network World',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['webdev', 'technology'],
                category: 'webdev',
                readingTime: null,
                reactions: 0,
                comments: 0
            },
            {
                id: 4,
                title: 'Post-Quantum Cryptography Standard Announced',
                body: 'NIST selects CRYSTALS-Kyber as the new encryption standard to protect against future quantum computer attacks.',
                url: 'https://dev.to',
                source: 'Cybersecurity Magazine',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['technology', 'programming'],
                category: 'technology',
                readingTime: null,
                reactions: 0,
                comments: 0
            },
            {
                id: 5,
                title: 'Edge Computing Reduces Latency to Near Zero',
                body: 'Distributed computing architecture brings data processing closer to end users, enabling real-time applications like autonomous vehicles.',
                url: 'https://dev.to',
                source: 'Cloud Computing Weekly',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['webdev', 'technology'],
                category: 'webdev',
                readingTime: null,
                reactions: 0,
                comments: 0
            },
            {
                id: 6,
                title: 'JavaScript Framework Benchmarks 2025',
                body: 'Comprehensive comparison of modern JavaScript frameworks reveals surprising performance winners in real-world scenarios.',
                url: 'https://dev.to',
                source: 'DEV Community',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['javascript', 'webdev'],
                category: 'javascript',
                readingTime: null,
                reactions: 0,
                comments: 0
            },
            {
                id: 7,
                title: 'Web Components Are Ready for Production',
                body: 'After years of evolution, native web components have matured into a reliable choice for building reusable UI elements.',
                url: 'https://dev.to',
                source: 'DEV Community',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['webdev', 'javascript'],
                category: 'webdev',
                readingTime: null,
                reactions: 0,
                comments: 0
            },
            {
                id: 8,
                title: 'TypeScript 6.0 Brings Major DX Improvements',
                body: 'The latest TypeScript release introduces faster compilation, improved inference, and new syntax features.',
                url: 'https://dev.to',
                source: 'DEV Community',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['javascript', 'programming'],
                category: 'javascript',
                readingTime: null,
                reactions: 0,
                comments: 0
            },
            {
                id: 9,
                title: 'Building Accessible UIs with Modern CSS',
                body: 'A deep dive into CSS techniques that improve accessibility while keeping your designs beautiful and maintainable.',
                url: 'https://dev.to',
                source: 'DEV Community',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['webdev', 'programming'],
                category: 'webdev',
                readingTime: null,
                reactions: 0,
                comments: 0
            },
            {
                id: 10,
                title: 'The Rise of AI-Assisted Code Review',
                body: 'Development teams are integrating AI tools into their code review process, catching bugs and enforcing standards automatically.',
                url: 'https://dev.to',
                source: 'DEV Community',
                publishedAt: new Date().toISOString(),
                author: null,
                authorAvatar: null,
                image: null,
                tags: ['ai', 'programming'],
                category: 'ai',
                readingTime: null,
                reactions: 0,
                comments: 0
            }
        ];

        const startIndex = (page - 1) * pageSize;
        const paginatedArticles = fallbackArticles.slice(startIndex, startIndex + pageSize);

        return {
            articles: paginatedArticles,
            hasMore: startIndex + pageSize < fallbackArticles.length
        };
    }
};

export default newsService;
