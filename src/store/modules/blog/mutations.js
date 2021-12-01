export default {
	addPost(state, payload) {
		state.blog.push(payload);
	},
	updatePost(state, payload) {
		const index = state.blog.findIndex(function (post) {
			return post.id === payload.id;
		});
		state.blog[index] = payload
	},
	setPosts(state, payload) {
		state.blog = payload;
	},
	setFetchTimestamp(state) {
		state.lastFetch = new Date().getTime();
	}
};