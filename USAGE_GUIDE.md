# 📖 دليل الاستخدام - Usage Guide

دليل شامل لاستخدام وتخصيص الموقع الشخصي.

---

## 🚀 البدء السريع

### 1. التثبيت الأساسي

```bash
# استنسخ المستودع
git clone https://github.com/husseinabbasrashid/husseinabbasrashid.github.io.git

# انتقل إلى المجلد
cd husseinabbasrashid.github.io

# افتح في المتصفح
# يمكنك فتح index.html مباشرة
# أو استخدام خادم محلي
```

### 2. استخدام خادم محلي

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx http-server

# PHP
php -S localhost:8000

# ثم افتح http://localhost:8000
```

---

## 🎨 التخصيص

### 1. تغيير المعلومات الشخصية

#### في index.html
```html
<!-- ابحث عن هذا القسم -->
<section class="hero">
    <div class="hero-badge">✨ متاح للعمل الحر</div>
    <h1>
        <span>أنا حسين عباس</span><br>
        <span>مبدع رقمي & مطور</span>
    </h1>
    <p>
        أحول الأفكار المعقدة إلى تجارب ويب تفاعلية وسلسة.
    </p>
</section>

<!-- غيّر إلى -->
<section class="hero">
    <div class="hero-badge">✨ [حالتك]</div>
    <h1>
        <span>أنا [اسمك]</span><br>
        <span>[وصفك]</span>
    </h1>
    <p>
        [وصفك الشخصي]
    </p>
</section>
```

### 2. تغيير الألوان

#### في styles.css
```css
/* ابحث عن :root */
:root {
    /* غيّر هذه الألوان */
    --accent-primary: #3b82f6;      /* اللون الأساسي */
    --accent-secondary: #06b6d4;     /* اللون الثانوي */
    --accent-tertiary: #8b5cf6;     /* اللون الثالث */
}

/* مثال: ألوان خضراء */
:root {
    --accent-primary: #10b981;
    --accent-secondary: #059669;
    --accent-tertiary: #047857;
}

/* مثال: ألوان برتقالية */
:root {
    --accent-primary: #f59e0b;
    --accent-secondary: #d97706;
    --accent-tertiary: #b45309;
}
```

### 3. إضافة صورة شخصية

```html
<!-- في index.html -->
<div class="hero-avatar">
    <img src="path/to/your/image.jpg" alt="صورتك">
</div>
```

### 4. تحديث روابط التواصل

```html
<!-- ابحث عن قسم التواصل -->
<div class="social-grid">
    <a href="https://wa.me/YOUR_NUMBER" class="social-card">
        <i class="fab fa-whatsapp"></i>
    </a>
    <a href="https://t.me/YOUR_USERNAME" class="social-card">
        <i class="fab fa-telegram"></i>
    </a>
    <!-- أضف المزيد -->
</div>
```

---

## 📁 إضافة مشاريع

### 1. مشروع بسيط

```html
<div class="bento-card" data-aos="fade-up">
    <!-- صورة المشروع -->
    <img src="images/project1.jpg" class="project-image" alt="المشروع 1">
    
    <!-- تغطية داكنة -->
    <div class="project-overlay"></div>
    
    <!-- محتوى البطاقة -->
    <div class="card-content">
        <!-- التقنيات المستخدمة -->
        <div class="tech-stack">
            <span class="tech-badge">React</span>
            <span class="tech-badge">Node.js</span>
        </div>
        
        <!-- عنوان ووصف -->
        <h3>اسم المشروع</h3>
        <p>وصف قصير للمشروع</p>
        
        <!-- رابط المشروع -->
        <a href="https://project-url.com" class="card-link">
            <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</div>
```

### 2. مشروع كبير (Large)

```html
<div class="bento-card large" data-aos="fade-up">
    <!-- نفس المحتوى أعلاه -->
</div>
```

---

## 🎯 استخدام الميزات

### 1. Theme Toggle (تبديل الثيم)

```javascript
// يعمل تلقائياً عند النقر على زر الثيم
// للتحكم برمجياً:
const themeManager = new window.PortfolioApp.ThemeManager();
themeManager.toggle(); // تبديل الثيم
```

### 2. Language Toggle (تبديل اللغة)

```javascript
// يعمل تلقائياً عند النقر على زر اللغة
// للتحكم برمجياً:
const langManager = new window.PortfolioApp.LanguageManager();
langManager.toggle(); // تبديل اللغة
```

### 3. إضافة محتوى متعدد اللغات

```html
<!-- أضف data-ar و data-en -->
<h2 data-ar="مرحباً" data-en="Hello">مرحباً</h2>
<p data-ar="هذا نص عربي" data-en="This is English text">
    هذا نص عربي
</p>
```

### 4. تعطيل Custom Cursor

```javascript
// في main.js، علّق هذا السطر:
// new CustomCursor();
```

### 5. تعطيل Animated Background

```javascript
// في main.js، علّق هذا السطر:
// new AnimatedBackground();
```

---

## 🔧 إعداد Firebase

### 1. إنشاء مشروع

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. انقر "Add Project"
3. أدخل اسم المشروع
4. اتبع الخطوات

### 2. تفعيل الخدمات

```javascript
// Firestore Database
// 1. اذهب إلى Firestore Database
// 2. انقر "Create Database"
// 3. اختر "Start in test mode"

// Storage
// 1. اذهب إلى Storage
// 2. انقر "Get Started"
// 3. اتبع الخطوات

// Authentication
// 1. اذهب إلى Authentication
// 2. انقر "Get Started"
// 3. فعّل "Anonymous"
```

### 3. نسخ الإعدادات

```javascript
// في firebase-config.js
export const firebaseConfig = {
  apiKey: "نسخ من Firebase Console",
  authDomain: "نسخ من Firebase Console",
  projectId: "نسخ من Firebase Console",
  storageBucket: "نسخ من Firebase Console",
  messagingSenderId: "نسخ من Firebase Console",
  appId: "نسخ من Firebase Console"
};

// مفتاح المشرف (اختياري)
export const ADMIN_KEY = "your-secret-admin-key-123";
```

### 4. إعداد القواعد

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // رسائل عامة
    match /public_messages/{messageId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
    
    // تقارير
    match /reports/{reportId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /chat_images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## 📱 استخدام غرفة الدردشة

### 1. الوصول

```html
<!-- افتح chat.html -->
https://your-site.com/chat.html
```

### 2. الميزات

#### إرسال رسالة
1. أدخل اسمك
2. اكتب رسالتك
3. انقر إرسال

#### رفع صورة
1. انقر على أيقونة الصورة
2. اختر صورة
3. انقر إرسال

#### الرد على رسالة
1. انقر على الرسالة
2. اختر "رد"
3. اكتب ردك

#### إضافة تفاعل
1. انقر على الرسالة
2. اختر emoji
3. سيظهر تحت الرسالة

### 3. لوحة الإدارة

```html
<!-- افتح admin.html -->
https://your-site.com/admin.html?admin=YOUR_ADMIN_KEY

<!-- أو أدخل المفتاح في الصفحة -->
```

---

## 🎨 تخصيص متقدم

### 1. إضافة قسم جديد

```html
<!-- في index.html -->
<section id="new-section" class="section">
    <div class="container">
        <!-- عنوان القسم -->
        <div class="section-header" data-aos="fade-up">
            <h2>عنوان القسم</h2>
            <p>وصف القسم</p>
        </div>
        
        <!-- محتوى القسم -->
        <div class="content" data-aos="fade-up" data-aos-delay="100">
            <!-- محتواك هنا -->
        </div>
    </div>
</section>
```

### 2. إضافة تأثير حركي

```css
/* في styles.css */
@keyframes myAnimation {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.my-element {
    animation: myAnimation 0.6s ease-out;
}
```

### 3. إضافة نمط جديد

```css
/* في styles.css */
.my-custom-card {
    background: var(--bg-card);
    border: 1px solid var(--card-border);
    border-radius: var(--card-radius);
    padding: 24px;
    transition: all var(--transition);
}

.my-custom-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--card-shadow-hover);
}
```

### 4. إضافة وظيفة JavaScript

```javascript
// في main.js
class MyFeature {
    constructor() {
        this.init();
    }

    init() {
        console.log('My feature initialized!');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // أضف event listeners هنا
    }
}

// في نهاية DOMContentLoaded
new MyFeature();
```

---

## 🔍 استكشاف الأخطاء

### المشكلة: الموقع لا يعمل

**الحلول:**
```bash
# 1. تحقق من Console
# افتح DevTools (F12)
# انظر إلى Console للأخطاء

# 2. تحقق من الملفات
# تأكد من وجود جميع الملفات:
# - index.html
# - styles.css
# - main.js
# - firebase-config.js

# 3. تحقق من الروابط
# تأكد من صحة روابط CSS و JS في HTML
```

### المشكلة: Firebase لا يعمل

**الحلول:**
```javascript
// 1. تحقق من الإعدادات
console.log(firebaseConfig);

// 2. تحقق من الاتصال
firebase.firestore().collection('test').get()
    .then(() => console.log('✅ Connected'))
    .catch(err => console.error('❌ Error:', err));

// 3. تحقق من القواعد
// تأكد من إعداد Firestore Rules بشكل صحيح
```

### المشكلة: الصور لا تظهر

**الحلول:**
```html
<!-- 1. تحقق من المسار -->
<img src="images/photo.jpg" alt="Photo">
<!-- تأكد من وجود المجلد والصورة -->

<!-- 2. استخدم مسار كامل -->
<img src="https://example.com/image.jpg" alt="Photo">

<!-- 3. تحقق من الصيغة -->
<!-- استخدم: .jpg, .png, .webp, .svg -->
```

### المشكلة: الموقع بطيء

**الحلول:**
```bash
# 1. ضغط الصور
# استخدم TinyPNG أو ImageOptim

# 2. تصغير الملفات
npx cssnano styles.css styles.min.css
npx terser main.js -o main.min.js

# 3. استخدام CDN
# للمكتبات الخارجية

# 4. تفعيل Cache
# في .htaccess أو server config
```

---

## 📊 الأداء

### قياس الأداء

```bash
# استخدم Lighthouse
# 1. افتح DevTools (F12)
# 2. اذهب إلى Lighthouse
# 3. انقر "Generate Report"

# أو استخدم PageSpeed Insights
# https://pagespeed.web.dev/
```

### تحسين الأداء

```javascript
// 1. Lazy Loading
<img data-src="image.jpg" alt="Image" loading="lazy">

// 2. Preloading
<link rel="preload" href="critical.css" as="style">

// 3. Defer JavaScript
<script src="script.js" defer></script>

// 4. Minify Assets
// استخدم أدوات التصغير
```

---

## 🚀 النشر

### GitHub Pages

```bash
# 1. Push إلى GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. فعّل GitHub Pages
# Settings > Pages > Source: main branch

# 3. الموقع سيكون متاح على:
# https://username.github.io/
```

### Netlify

```bash
# 1. اذهب إلى netlify.com
# 2. انقر "New site from Git"
# 3. اختر المستودع
# 4. انقر "Deploy"
```

### Vercel

```bash
# 1. اذهب إلى vercel.com
# 2. انقر "Import Project"
# 3. اختر المستودع
# 4. انقر "Deploy"
```

---

## 📞 الدعم

### الحصول على المساعدة

1. **Documentation**
   - اقرأ README.md
   - اقرأ CONTRIBUTING.md
   - اقرأ هذا الدليل

2. **Issues**
   - ابحث في Issues الموجودة
   - افتح Issue جديد إذا لزم الأمر

3. **التواصل**
   - البريد: huseinabbas49039@gmail.com
   - WhatsApp: +964 776 300 1120
   - Telegram: @telhussein

---

## 🎓 موارد التعلم

### HTML/CSS
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

### JavaScript
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Firebase
- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase YouTube](https://www.youtube.com/firebase)

### Git/GitHub
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub Guides](https://guides.github.com/)

---

**آخر تحديث**: فبراير 2026

**الإصدار**: 2.0.0

صُنع بـ ❤️ من قبل Hussein Abbas
