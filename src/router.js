import { createRouter, createWebHistory } from 'vue-router';

import BlogArchive from './pages/blog/BlogArchive.vue';
import BlogPost from './pages/blog/BlogPost.vue';
import EditPost from './pages/blog/EditPost.vue';
import NewPost from './pages/blog/NewPost.vue';
import StaticPage from './pages/StaticPage.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/blog' },
		{ path: '/blog', component: BlogArchive },
		{ path: '/blog/:slug', component: BlogPost, props: true },
		{ path: '/blog/:slug/edit', component: EditPost, props: true, meta: { requiresAuth: true } },
		{ path: '/blog/new', component: NewPost, meta: { requiresAuth: true } },
		{ path: '/:slug', component: StaticPage },
		{ path: '/login', component: UserAuth, meta: { requiresUnauth: true } },
		{ path: '/:notFound(.*)', component: NotFound }
	],
});

router.beforeEach(function(to, from, next) {
	if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next('/login');
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next('/blog');
	} else {
		next();
	}
});

export default router;