import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				green: '#233A41',
				white: '#ffffff',
				orange: '#B9502B',
				yellow: '#F7C604',
				peach: '#fff6e8',
				grey: '#6b7280',
			  },
			fontFamily: {
				sans: ["Proxima Nova", ...fontFamily.sans],
			},
		},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
	],
}
