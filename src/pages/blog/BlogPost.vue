<template>
    <div v-if="isLoading">
		<base-spinner></base-spinner>
	</div>
	<div v-else-if="hasPost" class="relative mt-24 px-4 sm:px-6 lg:px-8">
		<div v-if="isLoggedIn" class="admin-controls mt-12 pt-8 flex justify-end">
			<base-button link :to="editLink" class="ml-3 mr-4 lg:mr-12">
				<PencilAltIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
				Edit
			</base-button>
		</div>
		<div class="text-lg max-w-prose mx-auto">
			<h1>{{ title }}</h1>
			<figure>
				<img class="w-full rounded-lg" :src="imageUrl" :alt="imageAlt" width="1310" height="873" />
				<figcaption>{{ imageCaption }}</figcaption>
			</figure>
			<div class="mt-6 flex items-center">
				<!--
				<p class="text-sm font-medium text-indigo-600">
					{{ categoryName }}
				</p>
				-->
				<div class="ml-3">
					<p class="text-sm font-medium text-gray-900">
						By {{ author }}
					</p>
					<div class="flex space-x-1 text-sm text-gray-500">
						<time :datePosted="datePosted">
							{{ dateReadable }}
						</time>
						<span aria-hidden="true">
							&middot;
						</span>
						<span> {{ readingTime }} read </span>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto" v-html="body"></div>
	</div>
	<h3 v-else>Post not found.</h3>
</template>

<script>
	import { PencilAltIcon } from '@heroicons/vue/solid';
	export default {
		components: {
			PencilAltIcon
		},
		props: ['slug'],
		data() {
			return {
				isLoading: false,
				currentPost: null
			};
		},
		computed: {
			hasPost() {
				return !this.isLoading && this.currentPost !== null;
			},
			title() {
				return this.currentPost.title;
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
			},
			isLoggedIn() {
				return this.$store.getters.isAuthenticated;
			},
			editLink() {
				return this.$route.path + "/edit";
			}
		},
		created() {
			this.loadPost();
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
			}
		}
	}
</script>