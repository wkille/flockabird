<template>
	<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
		<router-link :to="postLink" class="block mt-2">
			<div class="flex-shrink-0">
				<img class="h-48 w-full object-cover" :src="imageUrl" :alt="imageAlt" />
			</div>
		</router-link>
		<div class="flex-1 bg-white p-6 flex flex-col justify-between">
			<div class="flex-1">
				<!--
				<p class="text-sm font-medium text-indigo-600">
					{{ category.name }}
				</p>
				-->
				<router-link :to="postLink" class="block mt-2">
					<p class="text-xl font-semibold text-gray-900">
						{{ title }}
					</p>
					<p class="mt-3 text-base text-gray-500">
						{{ description }}
					</p>
				</router-link>
			</div>
			<div class="mt-6 flex items-center">
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
	</div>
</template>

<script>
export default {
	props: {
		id: String,
		title: String,
		slug: String,
		categoryId: String,
		description: String,
		datePosted: String,
		imageUrl: String,
		imageAlt: String,
		readingTime: String,
		author: String,
	},
	computed: {
		dateReadable() {
			const date = new Date(Date.parse(this.datePosted));
			const dateTimeFormat = new Intl.DateTimeFormat("en", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
			return dateTimeFormat.format(date);
		},
		postLink() {
			const routePath = this.$route.path.endsWith("/")
				? this.$route.path.slice(0, -1)
				: this.$route.path;
			return routePath + "/" + this.slug;
		},
	},
};
</script>