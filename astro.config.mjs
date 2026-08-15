// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Nerd.IA Docs · PoC',
			description:
				'Prueba de concepto bilingüe y no oficial para integrar la API pública de Nerd.IA.',
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Español',
					lang: 'es',
				},
				en: {
					label: 'English',
				},
			},
			sidebar: [
				{
					label: 'Primeros pasos',
					translations: { en: 'Getting Started' },
					items: [
						{ slug: 'introduction' },
						{ slug: 'quickstart' },
						{ slug: 'authentication' },
					],
				},
				{
					label: 'Guías',
					translations: { en: 'Guides' },
					items: [{ slug: 'guides/users' }, { slug: 'guides/send-message' }],
				},
				{
					label: 'Referencia API',
					translations: { en: 'API Reference' },
					items: [{ slug: 'api-reference' }],
				},
				{
					label: 'Recursos',
					translations: { en: 'Resources' },
					items: [{ slug: 'known-gaps' }],
				},
			],
		}),
	],
});
