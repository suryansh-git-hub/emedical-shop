import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateCustomerHistoryPDF = (
  history
) => {
  const doc = new jsPDF();

  // ==========================
  // Title
  // ==========================

  doc.setFontSize(18);

  doc.text(
    "Medical Shop Management System",
    14,
    20
  );

  doc.setFontSize(14);

  doc.text(
    "Customer Purchase History",
    14,
    30
  );

  // ==========================
  // Customer Details
  // ==========================

  doc.setFontSize(11);

  doc.text(
    `Customer : ${history.customer.customerName}`,
    14,
    42
  );

  doc.text(
    `Phone : ${history.customer.contactNumber}`,
    14,
    49
  );

  doc.text(
    `Email : ${history.customer.email}`,
    14,
    56
  );

  doc.text(
    `Total Orders : ${history.totalOrders}`,
    140,
    42
  );

  doc.text(
    `Total Spent : ₹${history.totalSpent}`,
    140,
    49
  );

  // ==========================
  // Table
  // ==========================

  autoTable(doc, {
    startY: 65,

    head: [
      [
        "Invoice",
        "Date",
        "Medicines",
        "Amount",
      ],
    ],

    body: history.sales.map((sale) => [
      sale.invoiceNumber,

      new Date(
        sale.saleDate
      ).toLocaleDateString("en-IN"),

      sale.medicines.length,

      `₹${sale.totalAmount}`,
    ]),
  });

  // ==========================
  // Save
  // ==========================

  doc.save(
    `${history.customer.customerName}-Purchase-History.pdf`
  );
};