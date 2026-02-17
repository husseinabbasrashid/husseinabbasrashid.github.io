# 🌟 NovaStream Pro - Enhanced Edition

## نظرة عامة

**NovaStream Pro** هو تطبيق احترافي متكامل لتحميل وتشغيل الوسائط المتعددة مع واجهة مستخدم عصرية وميزات متقدمة.

## ✨ الميزات الرئيسية

### 🎬 مشغل وسائط متقدم
- تشغيل الفيديو والصوت بجودة عالية
- دعم جميع الصيغ الشائعة (MP4, MKV, MP3, FLAC, وغيرها)
- واجهة تحكم عائمة (HUD) احترافية
- ملء الشاشة مع تحكم كامل

### 🎨 تعديلات الفيديو المتقدمة
```python
# لوحة FX Panel - تشمل:
- ☀️ السطوع (Brightness): -100 إلى +100
- 🌓 التباين (Contrast): -100 إلى +100
- 🎨 التشبع (Saturation): -100 إلى +100
- زر إعادة التعيين السريع
```

### 🎚️ معادل صوت احترافي (5-Band EQ)
```python
# نطاقات ترددية:
- 60Hz   (Bass)
- 250Hz  (Low-Mid)
- 1kHz   (Mid)
- 4kHz   (High-Mid)
- 16kHz  (Treble)

# إعدادات مسبقة:
- Flat (محايد)
- Rock (صخري)
- Pop (شعبي)
- Jazz (جاز)
- Classical (كلاسيكي)
- Bass Boost (تعزيز الباص)
- Treble Boost (تعزيز الحدة)
```

### 🎵 وضع الموسيقى التفاعلي
- كشف تلقائي لملفات الصوت
- رسوم متحركة للأيقونات الموسيقية
- خلفية متدرجة جذابة
- تبديل سلس بين الأوضاع

### ⬇️ مدير تحميلات قوي
- تحميل من YouTube (فيديو/صوت/قوائم تشغيل)
- اختيار الجودة (4K, 1080p, 720p, 480p, Audio)
- تحميل الترجمات تلقائياً
- تضمين الصور المصغرة
- شريط تقدم مفصل

### 🔍 محرك بحث متقدم
- بحث مباشر في YouTube
- عرض النتائج مع المعاينات
- تشغيل مباشر (Streaming)
- تحميل سريع
- فلاتر وترتيب

### 🎨 6 سمات احترافية
1. **Deep Dark (Purple)** - بنفسجي داكن
2. **AMOLED Black** - أسود نقي
3. **Ocean Blue** - أزرق محيطي
4. **Emerald Night** - أخضر زمردي
5. **Sunset Orange** - برتقالي غروب
6. **Neon Pink** - وردي نيون

## 🚀 التثبيت

### المتطلبات
```bash
Python 3.8+
PySide6
yt-dlp
FFmpeg
```

### خطوات التثبيت

#### 1. تثبيت Python Dependencies
```bash
pip install PySide6
pip install yt-dlp
```

#### 2. تثبيت FFmpeg

**Windows (Chocolatey):**
```bash
choco install ffmpeg
```

**Windows (Scoop):**
```bash
scoop install ffmpeg
```

**Windows (يدوي):**
1. تحميل من: https://ffmpeg.org/download.html
2. استخراج الملفات
3. إضافة المسار إلى PATH

**Linux:**
```bash
sudo apt install ffmpeg  # Ubuntu/Debian
sudo dnf install ffmpeg  # Fedora
```

**macOS:**
```bash
brew install ffmpeg
```

#### 3. تشغيل التطبيق
```bash
python playlist_downloader.py
```

## 📖 دليل الاستخدام

### اختصارات لوحة المفاتيح

| المفتاح | الوظيفة |
|---------|---------|
| `Space` | تشغيل/إيقاف مؤقت |
| `→` | تقديم 5 ثوان |
| `←` | ترجيع 5 ثوان |
| `↑` | رفع الصوت 5% |
| `↓` | خفض الصوت 5% |
| `F` | ملء الشاشة |
| `M` | كتم الصوت |

### استخدام المشغل

#### 1. فتح مجلد الوسائط
```
الإعدادات → اختر مجلد التحميل → تصفح
```

#### 2. تشغيل ملف
- انقر نقراً مزدوجاً على الملف
- أو استخدم قائمة السياق (Right-click)

#### 3. التحكم في التشغيل
- استخدم HUD العائم (يظهر عند تحريك الماوس)
- أو استخدم شريط التشغيل السفلي

### استخدام معادل الصوت

#### 1. فتح المعادل
```
انقر على زر 📊 في HUD أو شريط التشغيل
```

#### 2. اختيار إعداد مسبق
```
Preset → اختر (Rock, Pop, Jazz, إلخ)
```

#### 3. تعديل يدوي
```
اسحب المنزلقات لضبط الترددات
```

### استخدام تعديلات الفيديو

#### 1. فتح لوحة FX
```
انقر على زر 🪄 في HUD
```

#### 2. ضبط الإعدادات
```
- السطوع: اسحب المنزلق لليمين/اليسار
- التباين: اسحب المنزلق لليمين/اليسار
- التشبع: اسحب المنزلق لليمين/اليسار
```

#### 3. إعادة التعيين
```
انقر على زر Reset
```

### التحميل من YouTube

#### 1. نسخ الرابط
```
انسخ رابط الفيديو أو قائمة التشغيل من YouTube
```

#### 2. لصق في التطبيق
```
صفحة التحميل → الصق الرابط → اختر الجودة
```

#### 3. خيارات إضافية
```
☑️ تحميل الترجمات
☑️ تحميل الصورة المصغرة
☑️ تحميل قائمة التشغيل كاملة
```

#### 4. بدء التحميل
```
انقر على 🚀 Start Download
```

### البحث في YouTube

#### 1. فتح صفحة البحث
```
القائمة الجانبية → 🔍 Discover
```

#### 2. إدخال كلمة البحث
```
اكتب في شريط البحث → Enter
```

#### 3. تصفح النتائج
```
- انقر على ▶ تشغيل للبث المباشر
- انقر على ⬇ تحميل للتحميل
```

## 🔧 الإعدادات المتقدمة

### تغيير السمة
```
الإعدادات → المظهر والسمات → اختر السمة
```

### تغيير مجلد التحميل
```
الإعدادات → مجلد التحميل → تغيير المجلد
```

### تنظيف التخزين المؤقت
```
الإعدادات → إعدادات احترافية → تنظيف التخزين المؤقت
```

## 🎯 ميزات متقدمة

### 1. استئناف التشغيل
- يحفظ التطبيق موضع التشغيل تلقائياً
- عند إعادة فتح الملف، يستأنف من آخر موضع

### 2. قائمة السياق
```
Right-click على ملف:
- ▶️ تشغيل
- 📂 فتح في المجلد
- 🗑️ حذف
```

### 3. Recently Played
- يعرض الشريط الجانبي آخر 10 ملفات مشغلة
- انقر نقراً مزدوجاً للتشغيل السريع

### 4. التقاط لقطة شاشة
```
أثناء تشغيل فيديو:
انقر على زر 📷 في HUD
```

### 5. التحكم في السرعة
```
انقر على زر السرعة (1x) في HUD
اختر: 0.25x, 0.5x, 0.75x, 1x, 1.25x, 1.5x, 1.75x, 2x
```

## 🐛 حل المشاكل

### المشكلة: لا يعمل FFmpeg
**الحل:**
```bash
# تحقق من التثبيت
ffmpeg -version

# إذا لم يعمل، أعد التثبيت
choco install ffmpeg --force
```

### المشكلة: فشل التحميل
**الحل:**
1. تحقق من اتصال الإنترنت
2. تحديث yt-dlp: `pip install --upgrade yt-dlp`
3. جرب جودة أقل

### المشكلة: لا تظهر المصغرات
**الحل:**
1. تأكد من تثبيت FFmpeg
2. أعد تشغيل التطبيق
3. امسح التخزين المؤقت

### المشكلة: تجمد الواجهة
**الحل:**
1. أغلق التطبيق وأعد فتحه
2. قلل عدد الملفات في المجلد
3. امسح سجل التشغيل

## 📊 الأداء

### نصائح لتحسين الأداء:
1. استخدم SSD لتخزين الملفات
2. أغلق التطبيقات الأخرى أثناء التحميل
3. استخدم جودة مناسبة (ليس دائماً 4K)
4. نظف التخزين المؤقت بانتظام

### متطلبات النظام الموصى بها:
- **المعالج:** Intel i5 أو أفضل
- **الذاكرة:** 8GB RAM
- **التخزين:** 500MB مساحة فارغة
- **الشاشة:** 1920x1080 أو أعلى

## 🔐 الخصوصية والأمان

- لا يتم جمع أي بيانات شخصية
- جميع الإعدادات محلية
- لا توجد اتصالات خارجية (عدا YouTube)
- الكود مفتوح المصدر

## 🤝 المساهمة

نرحب بالمساهمات! يمكنك:
- الإبلاغ عن الأخطاء
- اقتراح ميزات جديدة
- تحسين الكود
- ترجمة الواجهة

## 📝 التحديثات القادمة

### v2.2 (قريباً)
- [ ] مدير قوائم تشغيل متقدم
- [ ] محرر بيانات وصفية
- [ ] محول صيغ مدمج
- [ ] مزامنة سحابية
- [ ] دعم Chromecast

### v2.3 (مستقبلاً)
- [ ] دعم Spotify
- [ ] دعم SoundCloud
- [ ] تسجيل الشاشة
- [ ] بث مباشر
- [ ] تطبيق موبايل

## 📄 الترخيص

```
MIT License

Copyright (c) 2026 NovaStream Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 الفريق

**NovaStream Team**
- تطوير: فريق NovaStream
- التصميم: فريق UI/UX
- الاختبار: مجتمع المستخدمين

## 📞 الدعم

- **البريد الإلكتروني:** support@novastream.app
- **GitHub:** github.com/novastream/pro
- **Discord:** discord.gg/novastream

## 🌟 شكر خاص

- **PySide6** - إطار عمل الواجهة
- **yt-dlp** - محرك التحميل
- **FFmpeg** - معالجة الوسائط
- **المجتمع** - الدعم والتغذية الراجعة

---

**صُنع بـ ❤️ بواسطة NovaStream Team**

**الإصدار:** 2.1 Enhanced  
**تاريخ الإصدار:** 2026  
**آخر تحديث:** فبراير 2026

---

## 🎉 استمتع بتجربة NovaStream Pro!

للحصول على أفضل تجربة:
1. جرب جميع السمات
2. استكشف جميع الميزات
3. شارك ملاحظاتك
4. استمتع بالوسائط المفضلة لديك!

**#NovaStreamPro #MediaPlayer #YouTubeDownloader #OpenSource**
