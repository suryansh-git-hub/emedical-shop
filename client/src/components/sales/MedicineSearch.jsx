import { useMemo, useState } from "react";
import { Search, Package } from "lucide-react";

const MedicineSearch = ({
  medicines,
  onSelectMedicine,
}) => {
  const [search, setSearch] = useState("");

  const filteredMedicines = useMemo(() => {
    if (!search.trim()) return [];

    const keyword = search.toLowerCase();

    return medicines.filter((medicine) => {
      return (
        medicine.medicineName
          ?.toLowerCase()
          .includes(keyword) ||
        medicine.genericName
          ?.toLowerCase()
          .includes(keyword) ||
        medicine.batchNumber
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [search, medicines]);

  return (
    <div className="relative">

      <label className="mb-2 block text-sm font-semibold">
        Search Medicine
      </label>

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-lg border py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
        />

      </div>

      {filteredMedicines.length > 0 && (
        <div className="absolute z-20 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">

          {filteredMedicines.map((medicine) => (
            <button
              key={medicine._id}
              type="button"
              onClick={() => {
                onSelectMedicine(medicine);
                setSearch("");
              }}
              className="flex w-full items-center justify-between border-b px-4 py-3 text-left transition hover:bg-gray-100"
            >

              <div>

                <p className="font-semibold">
                  {medicine.medicineName}
                </p>

                <p className="text-sm text-gray-500">
                  {medicine.genericName}
                </p>

                <p className="text-xs text-gray-400">
                  Batch : {medicine.batchNumber}
                </p>

              </div>

              <div className="text-right">

                <div className="font-semibold text-green-600">
                  ₹{medicine.sellingPrice}
                </div>

                <div
                  className={`text-sm font-medium ${
                    medicine.stock > 10
                      ? "text-green-600"
                      : medicine.stock > 0
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Stock : {medicine.stock}
                </div>

                <div className="text-xs text-gray-400">
                  Exp :
                  {" "}
                  {medicine.expiryDate
                    ? new Date(
                        medicine.expiryDate
                      ).toLocaleDateString()
                    : "-"}
                </div>

              </div>

            </button>
          ))}

        </div>
      )}

      {!search && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">

          <Package size={18} />

          Search by medicine name, generic name or batch number.

        </div>
      )}

    </div>
  );
};

export default MedicineSearch;