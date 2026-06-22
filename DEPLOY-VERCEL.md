# JUL Modern Clothing - Vercel

هذه أسهل استضافة 24 ساعة للمتجر.

## الرفع

1. افتح https://vercel.com وسجل دخول.
2. اضغط Add New ثم Project.
3. ارفع ملفات المشروع أو اربطه مع GitHub.
4. في Environment Variables أضف:
   - `MYFATOORAH_BASE_URL`
   - `MYFATOORAH_TOKEN`

## قيم التجربة

استخدم هذه القيم للتجربة فقط:

```txt
MYFATOORAH_BASE_URL=https://apitest.myfatoorah.com
MYFATOORAH_TOKEN=replace-with-your-test-token
```

## الدفع الحقيقي

بعد موافقة MyFatoorah على حسابك Live:

```txt
MYFATOORAH_BASE_URL=https://api.myfatoorah.com
MYFATOORAH_TOKEN=your-live-token
```

لا تضع التوكن داخل `script.js` ولا ترسله في الشات.
