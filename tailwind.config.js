module.exports = {
    mode: 'jit',
	purge: [
	  './public/**/*.html',
	  './src/**/*.{js,jsx,ts,tsx,vue}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms') /* E.g. `npm install @tailwindcss/forms` */
	],
}