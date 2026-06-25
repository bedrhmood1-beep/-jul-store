// Legacy filename kept for convenience. Use this file the same way as apps-script-orders.gs.
// It records JUL orders and sends an email notification.

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
      "status",
      "notes",
    ]);
  }

  const address = order.address || {};
  const items = (order.items || [])
    .map((item) => `${item.name} (${item.size || "-"} / ${item.color || "-"}) x ${item.quantity}`)
    .join("\n");

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
    Number(order.delivery || 0).toFixed(3),
    Number(order.total || 0).toFixed(3),
    order.status || "received",
    order.notes || "",
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
        <p><b>ملاحظات:</b> ${order.notes || "لا يوجد"}</p>
        <h3>المنتجات</h3>
        <pre style="font-family:Arial,sans-serif">${items}</pre>
        <h3>الإجمالي: ${Number(order.total || 0).toFixed(3)} د.ك</h3>
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
