export default {
	async addPost(context, data) {
		const dateNow = new Date();
		const postData = {
			title: data.title,
			slug: data.title.replace(/[\W_]+/g,'-').toLowerCase(),
			category_id: data.categoryId,
			//tags: '',
			description: data.desc,
			body: data.body,
			datePosted: dateNow.toString(),
			image_url: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
			image_caption: data.imgCap,
			image_alt: data.imgAlt,
			reading_time: data.readTime,
			author: data.author,
			token: context.rootGetters.token
		};
		
		const response = await fetch('http://localhost/api/post/create.php', {
			method: 'POST',
			body: JSON.stringify(postData)
		});
		
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}
		
		const responseData = await response.json();
		
		//console.log(responseData);
		
		if (responseData.error) {
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}
		
		context.commit('addPost', {
			id: responseData.id,
			...postData
		});
	},
	async updatePost(context, data) {
		const postData = {
			id: data.id,
			title: data.title,
			slug: data.title.replace(/[\W_]+/g,'-').toLowerCase(),
			category_id: data.categoryId,
			//tags: '',
			description: data.desc,
			body: data.body,
			image_url: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
			image_caption: data.imgCap,
			image_alt: data.imgAlt,
			reading_time: data.readTime,
			author: data.author,
			date_posted: data.datePosted,
			token: context.rootGetters.token
		};
		
		const response = await fetch('http://localhost/api/post/update.php', {
			method: 'PUT',
			body: JSON.stringify(postData)
		});
		
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}
		
		const responseData = await response.json();
		
		console.log(responseData);
		
		if (responseData.error) {
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}

		context.commit('updatePost', {
			id: postData.id,
			title: postData.title,
			slug: postData.slug,
			categoryId: postData.category_id,
			description: postData.description,
			body: postData.body,
			datePosted: postData.date_posted,
			imageUrl: postData.image_url,
			imageCaption: postData.image_caption,
			imageAlt: postData.image_alt,
			readingTime: postData.reading_time,
			author: postData.author
		});
	},
	async loadPosts(context, payload) {
		if (!payload.forceRefresh && !context.getters.shouldUpdate) {
			return;
		}
	
		const response = await fetch(
			'http://localhost/api/post/read.php'
		);
		const responseData = await response.json();
		
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}
		
		const posts =[];
		
		for (const key in responseData.data) {
			const post = {
				id: responseData.data[key].id,
				title: responseData.data[key].title,
				slug: responseData.data[key].slug,
				categoryId: responseData.data[key].category_id,
				//tags: '',
				description: responseData.data[key].description,
				body: responseData.data[key].body,
				datePosted: responseData.data[key].date_posted,
				imageUrl: responseData.data[key].image_url,
				imageCaption: responseData.data[key].image_caption,
				imageAlt: responseData.data[key].image_alt,
				readingTime: responseData.data[key].reading_time,
				author: responseData.data[key].author
			};
			posts.push(post);
		}
		context.commit('setPosts', posts);
		context.commit('setFetchTimestamp');
	}
};