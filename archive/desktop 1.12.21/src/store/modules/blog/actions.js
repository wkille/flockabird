export default {
	async addPost(context, data) {
		const postData = {
			//id: 4,
			title: data.title,
			slug: data.title.replace(/[\W_]+/g,'-'),
			category_id: 1,
			//tags: '',
			description: data.desc,
			body: '',
			//datePosted: new Date(),
			image_url: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
			image_caption: data.imgCap,
			image_alt: data.imgAlt,
			reading_time: data.readTime,
			author: data.author
		};
		
		const response = await fetch('http://localhost/php_rest_api_arete/api/post/create.php', {
			method: 'POST',
			body: JSON.stringify(postData)
		});
		
		if (!response.ok) {
			// error ...
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}
		
		const responseData = await response.json();
		
		console.log(responseData);
		
		if (responseData.error) {
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}
		
		context.commit('addPost', {
			...postData
		});
	},
	async loadPosts(context, payload) {
		if (!payload.forceRefresh && !context.getters.shouldUpdate) {
			return;
		}
	
		const response = await fetch(
			'http://localhost/php_rest_api_arete/api/post/read.php'
		);
		const responseData = await response.json();
		
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}		
		
		const posts =[];
		
		for (const key in responseData.data) {
			const post = {
				id: +responseData.data[key].id,
				title: responseData.data[key].title,
				slug: responseData.data[key].title.replace(/[\W_]+/g,'-'),
				category: responseData.data[key].category,
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