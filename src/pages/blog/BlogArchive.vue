<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<div>
		<base-dialog
			:show="!!error"
			title="An error occurred!"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<div class="bg-white overflow-hidden">
				<div
					class="
						px-4
						py-5
						sm:p-6 sm:min-h-[50px]
						md:min-h-[100px]
						lg:min-h-[150px]
					"
				>
					<img class="mx-auto" src="../../assets/homeBanner.jpg" alt="A banner image with a photo of Jonathan Powell on the left, the words 'Arete Publishing Ltd' and a mountain range in the background." />
				</div>
			</div>
		</section>
		<section>
			<!-- FILTER -->
		</section>
		<div
			v-if="isLoggedIn"
			class="admin-controls mt-12 pt-8 flex justify-end"
		>
			<base-button
				type="button"
				class="
					inline-flex
					items-center
					bg-white
					py-2
					px-4
					border border-gray-300
					rounded-md
					shadow-sm
					text-sm
					font-medium
					text-blue-gray-900
					hover:bg-blue-gray-50
					focus:outline-none
					focus:ring-2
					focus:ring-offset-2
					focus:ring-blue-500
				"
				@click="loadPosts(true)"
			>
				<RefreshIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
				Reload posts
			</base-button>
			<base-button link to="/blog/new" class="ml-3 mr-4 lg:mr-12">
				<!--<button type="button" class="ml-3 lg:mr-12 inline-flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
					<PencilAltIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
					New Post
				</button>-->
				<PencilAltIcon
					class="-ml-0.5 mr-2 h-4 w-4"
					aria-hidden="true"
				/>
				New Post
			</base-button>
		</div>
		<section
			class="
				relative
				bg-gray-50
				mt-4
				pt-8
				pb-20
				px-4
				sm:px-6
				lg:pb-28 lg:px-8
			"
		>
			<div class="absolute inset-0">
				<div class="bg-white h-1/3 sm:h-2/3" />
			</div>
			<div class="relative max-w-7xl mx-auto">
				<div class="text-center">
					<h2
						class="
							text-3xl
							tracking-tight
							font-extrabold
							text-gray-900
							sm:text-4xl
						"
					>
						From the blog
					</h2>
					<p
						class="
							mt-3
							max-w-2xl
							mx-auto
							text-xl text-gray-500
							sm:mt-4
						"
					>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Ipsa libero labore natus atque, ducimus sed.
					</p>
				</div>
				<div v-if="isLoading">
					<base-spinner></base-spinner>
				</div>
				<div
					v-else-if="hasPosts"
					class="
						mt-12
						max-w-lg
						mx-auto
						grid
						gap-5
						lg:grid-cols-3 lg:max-w-none
					"
				>
					<blog-item
						v-for="post in filteredPosts"
						:key="post.id"
						:id="post.id"
						:title="post.title"
						:slug="post.slug"
						:description="post.description"
						:date-posted="post.datePosted"
						:image-url="post.imageUrl"
						:image-alt="post.imageAlt"
						:reading-time="post.readingTime"
						:author="post.author"
					></blog-item>
				</div>
				<h3 v-else>No posts found.</h3>
			</div>
		</section>
	</div>
</template>

<script>
import BlogItem from "../../components/blog/BlogItem.vue";
import { RefreshIcon, PencilAltIcon } from "@heroicons/vue/solid";

export default {
	components: {
		RefreshIcon,
		PencilAltIcon,
		BlogItem,
	},
	data() {
		return {
			isLoading: false,
			error: null,
		};
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},
		filteredPosts() {
			return this.$store.getters["blog/posts"];
		},
		hasPosts() {
			return !this.isLoading && this.$store.getters["blog/hasPosts"];
		},
	},
	created() {
		this.loadPosts();
	},
	methods: {
		async loadPosts(refresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("blog/loadPosts", {
					forceRefresh: refresh,
				});
			} catch (error) {
				this.error = error.message || "Something went wrong!";
			}
			this.isLoading = false;
			//console.log(this.$store.getters['blog/posts'])
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>
