<template>
	<form @submit.prevent="submitForm">
		<div class="form-control mb-10" :class="{invalid: !title.isValid}">
			<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
			<div class="mt-1">
				<input 
				type="text" 
				id="title" 
				class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
				v-model.trim="title.val" 
				@blur="clearValidity('title')" 
				/>
			</div>
			<p v-if="!title.isValid" class="error-prompt">Title can't be blank.</p>
		</div>
		<div class="form-control mb-10" :class="{invalid: !description.isValid}">
			<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
			<div class="mt-1">
				<textarea 
				id="description" 
				rows="5" 
				maxlength="500" 
				class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
				v-model.trim="description.val" 
				@blur="clearValidity('description')" 
				></textarea>
			</div>
			<p v-if="!description.isValid" class="error-prompt">Description can't be blank.</p>
		</div>
		<div class="form-control mb-10">
			<label for="imageCaption" class="block text-sm font-medium text-gray-700">Image caption</label>
			<div class="mt-1">
				<input 
				type="text" 
				id="imageCaption" 
				class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
				v-model.trim="imageCaption.val"
				/>
			</div>
		</div>
		<div class="form-control mb-10">
			<label for="imageAlt" class="block text-sm font-medium text-gray-700">Image alt text</label>
			<div class="mt-1">
				<input 
				type="text" 
				id="imageAlt" 
				class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
				v-model.trim="imageAlt.val"
				/>
			</div>
		</div>
		<div class="form-control mb-10" :class="{invalid: !readingTime.isValid}">
			<label for="readingTime" class="block text-sm font-medium text-gray-700">Reading time</label>
			<div class="mt-1">
				<input 
				type="text" 
				id="readingTime" 
				class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
				v-model.trim="readingTime.val"
				@blur="clearValidity('readingTime')" 
				/>
			</div>
			<p v-if="!readingTime.isValid" class="error-prompt">Reading time can't be blank.</p>
		</div>
		<div class="form-control mb-10" :class="{invalid: !author.isValid}">
			<label for="author" class="block text-sm font-medium text-gray-700">Author</label>
			<div class="mt-1">
				<input 
				type="text" 
				id="author"
				class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
				v-model.trim="author.val" 
				@blur="clearValidity('author')" 
				/>
			</div>
			<p v-if="!author.isValid" class="error-prompt">Author can't be blank.</p>
		</div>
		<div>
			<p v-if="!formIsValid" class="error-prompt">Please fix the input errors and try again.</p>
		</div>
		<div class="pt-5">
			<div class="flex justify-end">
				<button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Cancel
				</button>
				<button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Save
				</button>
			</div>
		</div>
	</form>
</template>

<script>
	
	export default {
		emits: ['save-data'],
		data() {
			return {
				title: {
					val: '',
					isValid: true
				},
				description: {
					val: '',
					isValid: true
				},
				imageCaption: {
					val: '',
					isValid: true
				},
				imageAlt: {
					val: '',
					isValid: true
				},
				readingTime: {
					val: '',
					isValid: true
				},
				author: {
					val: 'Jonathan',
					isValid: true
				},
				formIsValid: true
			}
		},
		methods: {
			clearValidity(input) {
				this[input].isValid = true;
			},
			validateForm() {
				this.formIsValid = true;
				if(this.title.val === '') {
					this.title.isValid = false;
					this.formIsValid = false;
				}
				if(this.description.val === '') {
					this.description.isValid = false;
					this.formIsValid = false;
				}
				/*
				if(this.imageCaption.val === '') {
					this.imageCaption.isValid = false;
					this.formIsValid = false;
				}
				if(this.imageAlt.val === '') {
					this.imageAlt.isValid = false;
					this.formIsValid = false;
				}
				*/
				if(this.readingTime.val === '') {
					this.readingTime.isValid = false;
					this.formIsValid = false;
				}
				if(this.author.val === '') {
					this.author.isValid = false;
					this.formIsValid = false;
				}
			},
			submitForm() {
				this.validateForm();
				if(!this.formIsValid) {
					return;
				}
				const formData = {
					title: this.title.val,
					desc: this.description.val,
					imgCap: this.imageCaption.val,
					imgAlt: this.imageAlt.val,
					readTime: this.readingTime.val,
					author: this.author.val
				}
				
				this.$emit('save-data', formData);
			}
		}
	}
	/*
		//id
		title
		//slug
		//category
		//tags
		description
		body
		//datePosted
		//imageUrl
		imageCaption
		imageAlt		
		readingTime
		author
	*/
</script>

<style>
	.error-prompt {
		color: red;
	}
	
	.form-control .error-prompt {
		text-align: right;
	}
	
	.invalid input,
	.invalid textarea {
		border:1px solid red;
	}
</style>