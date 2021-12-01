<template>
    <div class="relative mt-24 px-4 sm:px-6 lg:px-8">
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
		<div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
			{{ body }}
		</div>
	</div>
</template>

<script>
	export default {
		props: ['slug'],
		data() {
			return {
				currentPost: null
			};
		},
		computed: {
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
			}
		},		
		created() {
			this.currentPost = this.$store.getters['blog/posts'].find((post) => post.slug === this.slug);
		}
	}
</script>