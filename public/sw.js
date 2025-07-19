// Service Worker for background audio playback
const CACHE_NAME = 'prologue-audio-v1';

// Install event - cache audio files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(self.clients.claim());
});

// Fetch event - handle audio requests
self.addEventListener('fetch', (event) => {
  // Only handle audio requests
  if (event.request.url.includes('.mp3') || event.request.url.includes('audio')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the audio file for offline playback
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Try to serve from cache if network fails
          return caches.match(event.request);
        })
    );
  }
});

// Background sync for audio playback
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-audio') {
    console.log('Background audio sync triggered');
    // Handle background audio sync if needed
  }
});

// Handle push notifications for audio controls
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Audio playback',
      icon: '/prologue.png',
      badge: '/prologue.png',
      tag: 'audio-playback',
      requireInteraction: false,
      actions: [
        {
          action: 'play',
          title: 'Play',
          icon: '/play-icon.png'
        },
        {
          action: 'pause', 
          title: 'Pause',
          icon: '/pause-icon.png'
        },
        {
          action: 'stop',
          title: 'Stop',
          icon: '/stop-icon.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification('Orthodox Hagiography', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action) {
    // Send message to main thread to control audio
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: 'audio-control',
          action: event.action
        });
      });
    });
  } else {
    // Open the app when notification is clicked
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
}); 