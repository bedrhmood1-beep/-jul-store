# JUL Store Launch Checklist

## جاهز داخل الكود

- صفحة تفاصيل لكل منتج عند الضغط على الكرت.
- سلة مشتريات مع المقاس واللون والكمية.
- نموذج عنوان كامل: المنطقة، القطعة، الشارع، المنزل، الدور/الشقة.
- ربط دفع عبر MyFatoorah من خلال `/api/create-payment`.
- صفحة تأكيد بعد الرجوع من بوابة الدفع.
- حفظ آخر طلب على جهاز العميل لعرض ملخص الطلب.
- تتبع محلي بسيط للزيارات، مشاهدات المنتجات، إضافات السلة، ومحاولات الدفع.
- لوحة تحكم على `/admin.html` لتعديل المنتجات وتحميل `products.json`.

## المطلوب منك خارج الكود

1. MyFatoorah Live
   - من Vercel افتح Project Settings ثم Environment Variables.
   - أضف:
     - `MYFATOORAH_BASE_URL=https://api.myfatoorah.com`
     - `MYFATOORAH_TOKEN=YOUR_LIVE_TOKEN`
     - `DELIVERY_FEE_KWD=1.5`

2. إرسال الطلبات إلى Google Sheet
   - افتح Google Apps Script.
   - انسخ كود `apps-script-orders.gs`.
   - Deploy كـ Web app.
   - خذ رابط Web app وحطه في Vercel باسم:
     - `ORDER_WEBHOOK_URL`

3. الدومين الخاص
   - من Vercel: Project Settings ثم Domains.
   - أضف الدومين.
   - اتبع DNS records اللي يعطيك إياها Vercel عند شركة الدومين.

4. تجربة نهائية
   - افتح الموقع من الجوال.
   - اضغط منتج وادخل صفحة التفاصيل.
   - أضف للسلة.
   - املأ العنوان.
   - جرّب الدفع.
   - تأكد الطلب ظهر في MyFatoorah، وإذا فعلت Webhook تأكد وصل Google Sheet.
