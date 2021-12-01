let timer;

export default {
	async login(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: 'login'
		})
	},
	async register(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: 'register'
		})
	},
	async auth(context, payload) {
		const mode = payload.mode;
		let url = 'http://localhost/api/user/login.php';
		let method = 'PUT';
		if (mode === 'register') {
			url = 'http://localhost/api/user/register.php';
			method = 'POST';
		}
		const response = await fetch(url, {
			method,
			body: JSON.stringify({
				email: payload.email,
				password: payload.password
			})
		});

		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
			throw error;
		}

		localStorage.setItem('userId', responseData.id);
		localStorage.setItem('token', responseData.auth_token);
		localStorage.setItem('tokenExpiration', responseData.token_expiry);

		const expiresIn = ( +localStorage.getItem('tokenExpiration') * 1000 ) - new Date().getTime();
		timer = setTimeout(function () {
			context.dispatch('autoLogout');
		}, expiresIn);

		context.commit('setUser', {
			userId: responseData.id,
			token: responseData.auth_token
		});
	},
	tryLogin(context) {
		const userId = localStorage.getItem('userId');
		const token = localStorage.getItem('token');
		const tokenExpiration = localStorage.getItem('tokenExpiration');

		const expiresIn = ( +tokenExpiration * 1000 ) - new Date().getTime();

		if (expiresIn < 0) {
			return;
		}

		timer = setTimeout(function () {
			context.dispatch('autoLogout');
		}, expiresIn);

		if (token && userId) {
			context.commit('setUser', {
				token,
				userId,
				tokenExpiration
			})
		}
	},
	logout(context) {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('tokenExpiration');

		clearTimeout(timer);

		context.commit('setUser', {
			userId: null,
			token: null
		});
	},
	autoLogout(context) {
		context.dispatch('logout');
		context.commit('setAutoLogout');
	}
};