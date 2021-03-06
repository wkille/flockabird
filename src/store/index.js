import { createStore } from 'vuex';

import blogModule from './modules/blog/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
	modules: {
		blog: blogModule,
		auth: authModule
	}
});

export default store;
