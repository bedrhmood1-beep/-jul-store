# JUL Modern Clothing - Vercel

هذه أسهل استضافة 24 ساعة للمتجر.

## الرفع

1. افتح https://vercel.com وسجل دخول.
2. اضغط Add New ثم Project.
3. ارفع ملفات المشروع أو اربطه مع GitHub.
4. في Environment Variables أضف:
   - `MYFATOORAH_BASE_URL`
   - `MYFATOORAH_TOKEN`
   - `DELIVERY_FEE_KWD`
   - `ORDER_WEBHOOK_URL` اختياري إذا تبي الطلبات تنحفظ في Google Sheet

## قيم التجربة

استخدم هذه القيم للتجربة فقط:

```txt
MYFATOORAH_BASE_URL=https://apitest.myfatoorah.com
MYFATOORAH_TOKEN=replace-with-your-test-token
DELIVERY_FEE_KWD=1.5
```

## الدفع الحقيقي

بعد موافقة MyFatoorah على حسابك Live:

```txt
MYFATOORAH_BASE_URL=https://api.myfatoorah.com
MYFATOORAH_TOKEN=your-live-token
DELIVERY_FEE_KWD=1.5
```

لا تضع التوكن داخل `script.js` ولا ترسله في الشات.

## حفظ الطلبات

إذا تبي الطلبات توصل Google Sheet:

1. افتح Google Apps Script.
2. انسخ كود `apps-script-orders.gs`.
3. Deploy كـ Web app.
4. حط رابط Web app في Vercel باسم `ORDER_WEBHOOK_URL`.
