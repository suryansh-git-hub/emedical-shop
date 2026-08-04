import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (sale) => {
  const doc = new jsPDF();

  // ------------------------------
  // Pharmacy Information
  // ------------------------------

  doc.setFontSize(20);
  doc.setTextColor(40);

  doc.text("Medical Shop Management", 14, 20);

  doc.setFontSize(10);

  doc.text(
    "123 Main Street, Lucknow, Uttar Pradesh",
    14,
    28
  );

  doc.text("Phone: +91 9876543210", 14, 34);

  // ------------------------------
  // Invoice Heading
  // ------------------------------

  doc.setFontSize(16);

  doc.text("INVOICE", 160, 20);

  doc.setFontSize(10);

  doc.text(
    `Invoice : ${sale.invoiceNumber}`,
    140,
    30
  );

  doc.text(
    `Date : ${new Date(
      sale.saleDate
    ).toLocaleDateString()}`,
    140,
    36
  );

  // ------------------------------
  // Customer
  // ------------------------------

  doc.setFontSize(12);

  doc.text("Customer Details", 14, 50);

  doc.setFontSize(10);

  doc.text(
    `Name : ${
      sale.customer?.customerName || "Walk-in Customer"
    }`,
    14,
    58
  );

  doc.text(
    `Phone : ${
      sale.customer?.phone || "-"
    }`,
    14,
    64
  );

  // ------------------------------
  // Medicines Table
  // ------------------------------

  autoTable(doc, {
    startY: 75,

    head: [
      [
        "Medicine",
        "Qty",
        "Price",
        "Total",
      ],
    ],

    body: sale.medicines.map((item) => [
      item.medicine?.medicineName,
      item.quantity,
      `₹${item.price}`,
      `₹${item.quantity * item.price}`,
    ]),
  });

  // ------------------------------
  // Grand Total
  // ------------------------------

  const finalY = doc.lastAutoTable.finalY + 12;

  doc.setFontSize(12);

  doc.text(
    `Grand Total : ₹${Number(
      sale.totalAmount
    ).toLocaleString()}`,
    140,
    finalY
  );

  // ------------------------------
  // Footer
  // ------------------------------

  doc.setFontSize(10);

  doc.text(
    "Thank you for visiting!",
    14,
    finalY + 25
  );

  doc.text(
    "Please visit again.",
    14,
    finalY + 31
  );

  doc.save(
    `${sale.invoiceNumber}.pdf`
  );
};