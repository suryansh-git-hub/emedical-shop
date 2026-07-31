function ExpiringMedicines() {
  const medicines = [
    {
      name: "Dolo 650",
      expiry: "15 Aug 2026",
    },
    {
      name: "Vitamin C",
      expiry: "20 Aug 2026",
    },
    {
      name: "Cetirizine",
      expiry: "01 Sep 2026",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Expiring Medicines
      </h2>

      {medicines.map((medicine) => (
        <div
          key={medicine.name}
          className="mb-4 flex items-center justify-between"
        >
          <span>{medicine.name}</span>

          <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
            {medicine.expiry}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ExpiringMedicines;