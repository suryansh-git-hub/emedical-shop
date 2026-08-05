import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateSupplierHistoryPDF = (
  history
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(
    "Medical Shop Management System",
    14,
    20
  );

  doc.setFontSize(14);
  doc.text(
    "Supplier Purchase History",
    14,
    30
  );

  doc.setFontSize(11);

  doc.text(
    `Supplier : ${history.supplier.supplierName}`,
    14,
    42
  );

  doc.text(
    `Phone : ${history.supplier.contactNumber}`,
    14,
    49
  );

  doc.text(
    `Email : ${history.supplier.email}`,
    14,
    56
  );

  doc.text(
    `Total Purchases : ${history.totalPurchases}`,
    135,
    42
  );

  doc.text(
    `Total Amount : ₹${history.totalSpent}`,
    135,
    49
  );

  autoTable(doc, {
    startY: 65,

    head: [[
      "Invoice",
      "Date",
      "Medicines",
      "Amount",
    ]],

    body: history.purchases.map(
      (purchase) => [
        purchase.invoiceNumber,

        new Date(
          purchase.purchaseDate
        ).toLocaleDateString("en-IN"),

        purchase.medicines.length,

        `₹${purchase.totalAmount}`,
      ]
    ),
  });

  doc.save(
    `${history.supplier.supplierName}-Purchase-History.pdf`
  );
};