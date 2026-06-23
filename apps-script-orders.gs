const SPREADSHEET_ID = "1-G6gUkB5xmEOqDrNaiARkM00aQKVqocfkTNtDxkZfKw";
const MERCHANT_EMAIL = "bedrhmood1@gmail.com";

function doPost(e) {
  const order = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("Orders") || ss.insertSheet("Orders");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "order_id",
      "date",
      "customer",
      "mobile",
      "area",
      "block",
      "street",
      "house",
      "floor",
      "items",
      "subtotal",
      "delivery",
      "total",
      "payment_method",
      "myfatoorah_invoice",
      "payment_link",
      "status",
    ]);
  }

  const items = (order.items || [])
    .map((item) => {
      const variant = `Size ${item.size || "-"} / ${item.color || "-"}`;
      return `${item.name} (${variant}) x ${item.quantity} = ${Number(item.lineTotal || 0).toFixed(3)} KWD`;
    })
    .join("\n");

  const myfatoorah = order.myfatoorah || {};
  const paymentMethod = order.paymentMethod || order.payment || "";
  const address = order.address || {};

  sheet.appendRow([
    order.id,
    new Date(),
    order.customer,
    order.mobile,
    address.area,
    address.block,
    address.street,
    address.house,
    address.floor,
    items,
    Number(order.subtotal || 0).toFixed(3),
    Number(order.delivery || myfatoorah.delivery || 0).toFixed(3),
    Number(order.total || myfatoorah.total || 0).toFixed(3),
    paymentMethod,
    myfatoorah.invoiceId || "",
    myfatoorah.paymentUrl || "",
    "payment_link_created",
  ]);

  MailApp.sendEmail({
    to: MERCHANT_EMAIL,
    subject: `طلب جديد من JUL ${order.id}`,
    htmlBody: `
      <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7">
        <h2>طلب جديد من متجر JUL</h2>
        <p><b>رقم الطلب:</b> ${order.id}</p>
        <p><b>الاسم:</b> ${order.customer}</p>
        <p><b>الهاتف:</b> ${order.mobile}</p>
        <p><b>العنوان:</b> ${address.area || ""}، قطعة ${address.block || ""}، ${address.street || ""}، منزل ${address.house || ""} ${address.floor ? "، " + address.floor : ""}</p>
        <p><b>طريقة الدفع:</b> ${paymentMethod}</p>
        <p><b>ملاحظات:</b> ${order.notes || "لا يوجد"}</p>
        <h3>المنتجات</h3>
        <pre style="font-family:Arial,sans-serif">${items}</pre>
        <p><b>التوصيل:</b> ${Number(order.delivery || myfatoorah.delivery || 0).toFixed(3)} د.ك</p>
        <h3>الإجمالي: ${Number(order.total || myfatoorah.total || 0).toFixed(3)} د.ك</h3>
        <p><b>فاتورة MyFatoorah:</b> ${myfatoorah.invoiceId || ""}</p>
      </div>
    `,
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, order_id: order.id }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput("JUL orders endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
