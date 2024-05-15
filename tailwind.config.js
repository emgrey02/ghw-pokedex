/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/app/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			gridTemplateRows: {
				'mobile': '80px 160px auto auto auto',
				'bs': '80px 160px auto 100px'
			},
		},
	},
	plugins: [],
};

