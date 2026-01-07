// ضع هنا إعدادات Firebase الخاصة بك لتفعيل الدردشة العامة (Firestore)
// مثال:
// export const firebaseConfig = {
//   apiKey: "...",
//   authDomain: "...",
//   projectId: "...",
//   storageBucket: "...",
//   messagingSenderId: "...",
//   appId: "..."
// };

// إذا لم تقم بإضافة القيم، سيعمل نظام الدردشة فقط محليًا (localStorage) لأغراض العرض.
export const firebaseConfig = {
  apiKey: "AIzaSyBgATDvc0MRJ-uknqIVUUi1gq6pS1v7coQ",
  authDomain: "my-public-chat-8cc7f.firebaseapp.com",
  projectId: "my-public-chat-8cc7f",
  storageBucket: "my-public-chat-8cc7f.firebasestorage.app",
  messagingSenderId: "707480574674",
  appId: "1:707480574674:web:4b30cb5a691a0a92516b0b"
};

// مفتاح مشرف مبدئي (استبدله فورًا بقيمة خاصة قوية أو استخدم Custom Claims عبر Firebase Auth).
// هذا المفتاح يُستخدم فقط للوصول المحلي إلى لوحة الإدارة (admin.html) إذا اخترت هذه الطريقة.
export const ADMIN_KEY = 'b6f2c1e3d9a7e8f3c5b1d6a9f7c8e2b3a4c5d6e7f8b9a0c1d2e3f4b5a6c7d8e';

// تعليمات سريعة لتفعيل الأمان الكامل:
// 1) فعّل Firebase Authentication (مثلاً Email/Password) وقم بإضافة حسابات المشرفين.
// 2) استخدم Custom Claims لإعطاء الخاصية admin للمستخدمين (مستحسن بدلًا من ADMIN_KEY).
// 3) غيّر قواعد Firestore (انظر FIREBASE_RULES.txt) لتطلب أن يكون المستخدم موثوقًا (admin) للتحكم (delete/update/pin).
// 4) أضف Cloud Function بسيطة لفرض rate-limiting على مستوى الخادم إن لزم.
