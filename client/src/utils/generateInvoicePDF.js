import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (sale) => {
  const doc = new jsPDF();

  // ==========================
  // Header
  // ==========================

  doc.setFontSize(22);
  doc.setTextColor(30, 64, 175);
  doc.text("Medical Shop", 14, 20);

  doc.setFontSize(11);
  doc.setTextColor(80);

  doc.text(
    "Medical Shop Management System",
    14,
    28
  );

  doc.text(
    "Lucknow, Uttar Pradesh",
    14,
    34
  );

  doc.text(
    "Phone : +91 XXXXX XXXXX",
    14,
    40
  );

  doc.text(
    "GSTIN : XXXXXXXX1234",
    14,
    46
  );

  doc.setFontSize(20);
  doc.setTextColor(0);

  doc.text("TAX INVOICE", 145, 22);

  doc.setFontSize(11);

  doc.text(
    `Invoice : ${sale.invoiceNumber}`,
    145,
    32
  );

  doc.text(
    `Date : ${new Date(
      sale.saleDate
    ).toLocaleDateString()}`,
    145,
    38
  );

  // ==========================
  // Customer
  // ==========================

  doc.setFontSize(13);

  doc.text("Customer Details", 14, 60);

  doc.setFontSize(10);

  doc.text(
    `Name : ${
      sale.customer?.customerName || "-"
    }`,
    14,
    68
  );

  doc.text(
    `Contact : ${
      sale.customer?.contactNumber || "-"
    }`,
    14,
    74
  );

  doc.text(
    `Email : ${
      sale.customer?.email || "-"
    }`,
    100,
    68
  );

  doc.text(
    `Address : ${
      sale.customer?.address || "-"
    }`,
    100,
    74
  );

  // ==========================
  // Medicine Table
  // ==========================

  autoTable(doc, {
    startY: 85,

    head: [[
      "Medicine",
      "Qty",
      "Price",
      "GST",
      "Total",
    ]],

    body: sale.medicines.map((item) => {

      const subtotal =
        item.quantity *
        item.sellingPrice;

      const gst =
        (subtotal *
          (item.gst || 0)) /
        100;

      return [
        item.medicine?.medicineName,
        item.quantity,
        `₹${item.sellingPrice}`,
        `${item.gst || 0}%`,
        `₹${(subtotal + gst).toFixed(2)}`,
      ];
    }),
  });

  // ==========================
  // Billing Summary
  // ==========================

  const finalY =
    doc.lastAutoTable.finalY + 15;

  doc.setFontSize(11);

  doc.text(
    `Subtotal : ₹${(
      sale.subtotal ?? 0
    ).toFixed(2)}`,
    130,
    finalY
  );

  doc.text(
    `GST : ₹${(
      sale.gstAmount ?? 0
    ).toFixed(2)}`,
    130,
    finalY + 8
  );

  doc.text(
    `Discount : ₹${(
      sale.discount ?? 0
    ).toFixed(2)}`,
    130,
    finalY + 16
  );

  doc.setFontSize(13);

  doc.text(
    `Grand Total : ₹${(
      sale.grandTotal ??
      sale.totalAmount ??
      0
    ).toFixed(2)}`,
    130,
    finalY + 28
  );

  doc.setFontSize(11);

  doc.text(
    `Payment : ${
      sale.paymentMethod
    }`,
    130,
    finalY + 40
  );

  doc.text(
    `Cash Received : ₹${(
      sale.cashReceived ?? 0
    ).toFixed(2)}`,
    130,
    finalY + 48
  );

  doc.text(
    `Change Returned : ₹${(
      sale.changeReturned ?? 0
    ).toFixed(2)}`,
    130,
    finalY + 56
  );

  // ==========================
  // Footer
  // ==========================

  doc.setFontSize(10);

  doc.text(
    "Thank you for choosing our Medical Shop.",
    14,
    finalY + 75
  );

  doc.text(
    "Medicines once sold will not be taken back.",
    14,
    finalY + 81
  );

  doc.text(
    "Please keep this invoice for future reference.",
    14,
    finalY + 87
  );

  doc.text(
    "Get Well Soon!",
    14,
    finalY + 95
  );

  doc.save(`${sale.invoiceNumber}.pdf`);
};