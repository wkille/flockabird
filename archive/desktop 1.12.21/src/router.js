import { createRouter, createWebHistory } from 'vue-router';

import BlogArchive from './pages/blog/BlogArchive.vue';
import BlogPost from './pages/blog/BlogPost.vue';
import EditPost from './pages/blog/EditPost.vue';
import NewPost from './pages/blog/NewPost.vue';
import StaticPage from './pages/StaticPage.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/blog' },
		{ path: '/blog', component: BlogArchive },
		{ path: '/blog/:slug', component: BlogPost, props: true },
		{ path: '/blog/:slug/edit', component: EditPost, props: true },
		{ path: '/blog/new', component: NewPost },
		{ path: '/:slug', component: StaticPage },
		{ path: '/:notFound(.*)', component: NotFound }
	],
});

export default router;