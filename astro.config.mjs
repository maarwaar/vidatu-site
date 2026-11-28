import { defineConfig } from 'astro/config';
// The site lives at the root since launch (26 Nov). BASE='/preview' only for a review copy.
export default defineConfig({ site: 'https://vidatu.com', base: process.env.BASE || '/', trailingSlash: 'always' });
