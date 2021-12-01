<template>
	<div class="my-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl mx-auto">
			<section>
				<div class="mb-16">
					<h1 class="text-lg leading-6 font-medium text-gray-900">
						New post
					</h1>
					<p class="mt-1 max-w-2xl text-sm text-gray-500">
						Publish a new blog post
					</p>
				</div>
				<post-form @save-data="saveData"
					mode="new"
				></post-form>
			</section>
		</div>
	</div>
</template>

<script>
	import PostForm from '../../components/blog/PostForm.vue';
	
	export default {
		components: {
			PostForm
		},
		methods: {
			saveData(data) {
				this.$store.dispatch('blog/addPost', data);
				this.$router.replace('/blog');
			}
		}
	}
</script>