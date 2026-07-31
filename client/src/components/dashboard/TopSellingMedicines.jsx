function TopSellingMedicines() {
  const medicines = [
    { name: "Paracetamol", sold: 320 },
    { name: "Crocin", sold: 280 },
    { name: "Vitamin C", sold: 240 },
    { name: "Dolo 650", sold: 210 },
    { name: "Cetirizine", sold: 185 },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Top Selling Medicines
      </h2>

      {medicines.map((medicine) => (
        <div
          key={medicine.name}
          className="mb-4 flex items-center justify-between"
        >
          <span>{medicine.name}</span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {medicine.sold} Sold
          </span>
        </div>
      ))}
    </div>
  );
}

export default TopSellingMedicines;