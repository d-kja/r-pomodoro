
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto Mono', 'Arial', 'sans-serif']
			},
		},
	},
	plugins: [
		skeleton({
			themes: { preset: ["crimson"] }
		})
	]
}

export default config;