// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	base: '/',
	integrations: [
		starlight({
			title: 'Шаблоны кода 1С',
			customCss: [
        		// Relative path to your custom CSS file
      	  		'./src/styles/custom.css',
     		 ],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://git.sinenikolsky.ru/artem/starlite-bsp-kb.git' }],
			sidebar: [
				{
					collapsed: true,
					label: 'Библиотека стандартных подсистем',
					autogenerate: { directory: 'bsp' },
				},
				{
					collapsed: true,
					label: 'Зарплата и управление персоналом',
					autogenerate: { directory: 'zup' },
				},
				{
					collapsed: true,
					label: 'ERP. Управление холдингом',
					autogenerate: { directory: 'erp_uh' },
				},
			],
		}),
	],
});
