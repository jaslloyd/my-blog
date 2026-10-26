// The Gatsby site registered a Workbox service worker (gatsby-plugin-offline)
// at /sw.js. Browsers re-check this URL, find this version, and it then clears
// the old caches, unregisters itself and reloads open tabs onto the new site.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			await Promise.all(keys.map((key) => caches.delete(key)));
			await self.registration.unregister();
			const clients = await self.clients.matchAll({ type: 'window' });
			clients.forEach((client) => client.navigate(client.url));
		})(),
	);
});
