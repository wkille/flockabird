export default {
	addPost(state, payload) {
		state.blog.push(payload);
	},
	setPosts(state, payload) {
		state.blog = payload;
	},
	setFetchTimestamp(state) {
		state.lastFetch = new Date().getTime();
	}
};