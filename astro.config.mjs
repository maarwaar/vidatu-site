import { defineConfig } from 'astro/config';
// BASE is '/preview' while the full site is being reviewed; set BASE='/' at launch.
export default defineConfig({ site: 'https://vidatu.com', base: process.env.BASE || '/preview', trailingSlash: 'always' });
