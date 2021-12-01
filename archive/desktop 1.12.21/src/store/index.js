import { createStore } from 'vuex';

import blogModule from './modules/blog/index.js';

const store = createStore({
	modules: {
		blog: blogModule
	}
});

export default store;
