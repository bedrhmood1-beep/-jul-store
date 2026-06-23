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
      "total",
      "payment",
      "status",
    ]);
  }

  const items = order.items
    .map((item) => `${item.name} x ${item.quantity} = ${Number(item.lineTotal).toFixed(3)} KWD`)
    .join("\n");

  sheet.appendRow([
    order.id,
    new Date(),
    order.customer,
    order.mobile,
    order.address.area,
    order.address.block,
    order.address.street,
    order.address.house,
    order.address.floor,
    items,
    Number(order.total).toFixed(3),
    order.payment,
    "new",
  ]);

  MailApp.sendEmail({
    to: MERCHANT_EMAIL,
    subject: `فاتورة طلب جديد ${order.id}`,
    htmlBody: `
      <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7">
        <h2>فاتورة طلب جديد من JUL</h2>
        <p><b>رقم الطلب:</b> ${order.id}</p>
        <p><b>الاسم:</b> ${order.customer}</p>
        <p><b>الهاتف:</b> ${order.mobile}</p>
        <p><b>العنوان:</b> ${order.address.area}، قطعة ${order.address.block}، ${order.address.street}، منزل ${order.address.house} ${order.address.floor ? "، " + order.address.floor : ""}</p>
        <p><b>طريقة الدفع:</b> ${order.payment}</p>
        <p><b>ملاحظات:</b> ${order.notes || "لا يوجد"}</p>
        <h3>المنتجات</h3>
        <pre style="font-family:Arial,sans-serif">${items}</pre>
        <h3>الإجمالي: ${Number(order.total).toFixed(3)} د.ك</h3>
      </div>
    `,
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, order_id: order.id }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput("JUL invoice endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
