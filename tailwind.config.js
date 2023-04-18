/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				amazon_blue: {
					light: '#232F3E',
					DEFAULT: '#131921',
				},
			},
		},
	},
	plugins: [],
};
