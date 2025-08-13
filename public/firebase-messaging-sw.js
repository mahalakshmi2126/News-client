importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDir_0W-lhaIOoqu2c7A2Xsni8T9F-_Wsg",
  authDomain: "news-web-app-2126.firebaseapp.com",
  projectId: "news-web-app-2126",
  storageBucket: "news-web-app-2126.appspot.com",
  messagingSenderId: "211904953853",
  appId: "1:211904953853:web:286858b3449cb8b0c62d94",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/logo192.png",
    data: { click_action: payload.notification.click_action || "/" }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.click_action)
  );
});