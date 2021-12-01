module.exports = {
	purge: ['./public/**/*.html', './src/**/*.vue'],
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
