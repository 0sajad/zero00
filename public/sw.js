
// OCTA NETWORK - Service Worker v4.0
const CACHE_NAME = 'octa-network-v4-0-0';
const STATIC_CACHE = 'octa-static-v4';
const DYNAMIC_CACHE = 'octa-dynamic-v4';

// الملفات الأساسية للتخزين المؤقت
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css'
];

// الملفات المستثناة من التخزين المؤقت
const EXCLUDE_PATTERNS = [
  /\/api\//,
  /\/__/,
  /\/admin\//,
  /\.map$/,
  /hot-update/
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 تثبيت Service Worker لـ OCTA NETWORK');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('💾 تخزين الملفات الأساسية...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ تم تثبيت Service Worker بنجاح');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ خطأ في تثبيت Service Worker:', error);
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 تفعيل Service Worker لـ OCTA NETWORK');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ حذف cache قديم:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ تم تفعيل Service Worker بنجاح');
        return self.clients.claim();
      })
  );
});

// اعتراض الطلبات
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // تجاهل الطلبات المستثناة
  if (EXCLUDE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    return;
  }
  
  // معالجة طلبات التنقل
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }
  
  // معالجة الطلبات الأخرى
  event.respondWith(handleResourceRequest(request));
});

// معالجة طلبات التنقل
async function handleNavigationRequest(request) {
  try {
    // محاولة الحصول على الاستجابة من الشبكة
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // تخزين الاستجابة في cache ديناميكي
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('🌐 الشبكة غير متاحة، استخدام cache...');
  }
  
  // في حالة فشل الشبكة، إرجاع index.html من cache
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match('/index.html');
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // في حالة عدم وجود cache، إرجاع صفحة خطأ بسيطة
  return new Response(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OCTA NETWORK - غير متصل</title>
      <style>
        body { 
          font-family: -apple-system, system-ui, sans-serif; 
          margin: 0; 
          padding: 20px; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          direction: rtl;
        }
        .container {
          text-align: center;
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          max-width: 500px;
        }
        h1 { color: #667eea; margin-bottom: 20px; }
        p { color: #666; line-height: 1.6; }
        button {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div style="font-size: 60px; margin-bottom: 20px;">🌐</div>
        <h1>OCTA NETWORK</h1>
        <p>التطبيق غير متصل بالإنترنت حالياً</p>
        <p>يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى</p>
        <button onclick="window.location.reload()">🔄 إعادة المحاولة</button>
      </div>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// معالجة طلبات الموارد
async function handleResourceRequest(request) {
  try {
    // البحث في cache أولاً
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // إرجاع النسخة المحفوظة وتحديثها في الخلفية
      updateCacheInBackground(request);
      return cachedResponse;
    }
    
    // إذا لم توجد في cache، جلب من الشبكة
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // تخزين في cache ديناميكي
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('❌ خطأ في جلب المورد:', request.url);
    
    // في حالة الخطأ، محاولة الحصول على نسخة محفوظة
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // إرجاع استجابة خطأ
    return new Response('المورد غير متاح', { 
      status: 503, 
      statusText: 'Service Unavailable' 
    });
  }
}

// تحديث cache في الخلفية
async function updateCacheInBackground(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse);
    }
  } catch (error) {
    // تجاهل الأخطاء في التحديث الخلفي
  }
}

// رسائل من التطبيق الرئيسي
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_UPDATE':
      updateSpecificCache(payload);
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches();
      break;
      
    default:
      console.log('رسالة غير معروفة:', type);
  }
});

// تحديث cache محدد
async function updateSpecificCache(urls) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await Promise.all(
      urls.map(url => {
        return fetch(url).then(response => {
          if (response.ok) {
            return cache.put(url, response);
          }
        }).catch(() => {});
      })
    );
    console.log('✅ تم تحديث cache محدد');
  } catch (error) {
    console.error('❌ خطأ في تحديث cache:', error);
  }
}

// مسح جميع caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('✅ تم مسح جميع caches');
  } catch (error) {
    console.error('❌ خطأ في مسح caches:', error);
  }
}

// تنظيف cache دوري
setInterval(async () => {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    // حذف الملفات القديمة (أكثر من 7 أيام)
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    for (const request of requests) {
      const response = await cache.match(request);
      const dateHeader = response?.headers.get('date');
      
      if (dateHeader) {
        const responseDate = new Date(dateHeader).getTime();
        if (responseDate < weekAgo) {
          await cache.delete(request);
        }
      }
    }
    
    console.log('🧹 تنظيف cache دوري مكتمل');
  } catch (error) {
    console.error('❌ خطأ في تنظيف cache:', error);
  }
}, 24 * 60 * 60 * 1000); // كل 24 ساعة
