# JUL Modern Clothing - Vercel

استضافة المتجر تكون على Vercel، والطلب يرسل من الموقع مباشرة.

## الرفع

1. افتح https://vercel.com وسجل دخول.
2. اربط المشروع مع GitHub.
3. في Environment Variables أضف:
   - `DELIVERY_FEE_KWD`
   - `ORDER_WEBHOOK_URL` اختياري إذا تبي الطلبات تنحفظ في Google Sheet

## القيم المقترحة

```txt
DELIVERY_FEE_KWD=1.5
ORDER_WEBHOOK_URL=optional-google-apps-script-web-app-url
```

## حفظ الطلبات

إذا تبي الطلبات توصل Google Sheet:

1. افتح Google Apps Script.
2. انسخ كود `apps-script-orders.gs`.
3. Deploy كـ Web app.
4. حط رابط Web app في Vercel باسم `ORDER_WEBHOOK_URL`.
