<template>
    <div v-if="isLoading">
		<base-spinner></base-spinner>
	</div>
	<div v-else-if="hasPost" class="my-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl mx-auto">
			<section>
				<div class="mb-16">
					<h1 class="text-lg leading-6 font-medium text-gray-900">
						Edit post
					</h1>
					<p class="mt-1 max-w-2xl text-sm text-gray-500">
						Editing a published blog post
					</p>
				</div>
				<post-form @save-data="saveData"
					mode="update"
					:id="id"
					:title="title"
					:body="body"
					:description="description"
					:image-caption="imageCaption"
					:image-url="imageUrl"
					:image-alt="imageAlt"
					:reading-time="readingTime"
					:author="author"
					:date-posted="datePosted"
				></post-form>
			</section>
		</div>
	</div>
	<h3 v-else>Post not found.</h3>
</template>

<script>
	import PostForm from '../../components/blog/PostForm.vue';
	
	export default {
		props: ['slug'],
		components: {
			PostForm
		},
		data() {
			return {
				isLoading: false,
				currentPost: null,
				error: null
			};
		},
		computed: {
			hasPost() {
				return !this.isLoading && this.currentPost !== null;
			},
			id() {
				return this.currentPost.id;
			},
			title() {
				return this.currentPost.title;
			},
			description() {
				return this.currentPost.description;
			},
			categoryId() {
				return this.currentPost.categoryId;
			},
			imageUrl() {
				return this.currentPost.imageUrl;
			},
			imageAlt() {
				return this.currentPost.imageAlt;
			},
			imageCaption() {
				return this.currentPost.imageCaption;
			},
			categoryName() {
				return this.currentPost.category.name;
			},
			author() {
				return this.currentPost.author;
			},
			datePosted() {
				return this.currentPost.datePosted;
			},
			readingTime() {
				return this.currentPost.readingTime;
			},
			body() {
				return this.currentPost.body;
			},
			dateReadable() {
				const date = new Date(this.currentPost.datePosted);
				const dateTimeFormat = new Intl.DateTimeFormat('en', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});
				return dateTimeFormat.format(date);
			}
		},
		methods: {
			async loadPost(refresh = false) {
				this.isLoading = true;
				try {
					await this.$store.dispatch('blog/loadPosts', {forceRefresh: refresh});
				} catch (error) {
					this.error = error.message || 'Something went wrong: failed to load posts';
				}
				this.currentPost = this.$store.getters['blog/posts'].find((post) => post.slug === this.slug);
				this.isLoading = false;
			},
			/*async updateStore(data) {
				this.isLoading = true;
				try {
					await this.$store.dispatch('blog/updatePost', data);
				} catch (error) {
					this.error = error.message || 'Something went wrong: failed to save post';
				}
			},
			saveData(data) {
				this.updateStore(data).then(this.$router.replace('/blog'));
			},*/
			saveData(data) {
				this.$store.dispatch('blog/updatePost', data);
				this.$router.replace('/blog');
			},
			handleError() {
				this.error = null;
			}
		},
		created() {
			this.loadPost();
		}
	}
</script>