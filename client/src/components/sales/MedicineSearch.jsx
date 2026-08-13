import { useMemo } from "react";
import {
  Search,
  Package,
} from "lucide-react";

const MedicineSearch = ({
  medicines = [],
  onSelectMedicine,
  search,
  setSearch,
}) => {
  const filteredMedicines = useMemo(() => {
    if (!search?.trim()) {
      return [];
    }

    const keyword =
      search.toLowerCase().trim();

    return medicines.filter(
      (medicine) => {
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
      }
    );
  }, [search, medicines]);

  return (
    <div className="relative">

      {/* Label */}

      <label
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700

          dark:text-slate-300
        "
      >
        Search Medicine
      </label>

      {/* Search Input */}

      <div className="relative">

        <Search
          size={18}
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Search medicine by name, generic or batch..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            py-3
            pl-10
            pr-4
            text-sm
            text-slate-700
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-100

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-200
            dark:placeholder:text-slate-500
            dark:focus:border-blue-500
            dark:focus:bg-slate-800
            dark:focus:ring-blue-950
          "
        />

      </div>

      {/* Search Results */}

      {filteredMedicines.length > 0 && (

        <div
          className="
            absolute
            z-20
            mt-2
            max-h-80
            w-full
            overflow-y-auto
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-xl

            dark:border-slate-700
            dark:bg-slate-900
            dark:shadow-black/30
          "
        >

          {filteredMedicines.map(
            (medicine) => {

              const stock =
                Number(
                  medicine.stock || 0
                );

              const isOutOfStock =
                stock <= 0;

              const isLowStock =
                stock > 0 &&
                stock <= 10;

              return (
                <button
                  key={medicine._id}
                  type="button"
                  disabled={
                    isOutOfStock
                  }
                  onClick={() => {
                    onSelectMedicine(
                      medicine
                    );

                    setSearch("");
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-slate-100
                    px-4
                    py-3.5
                    text-left
                    transition
                    hover:bg-slate-50

                    dark:border-slate-800
                    dark:hover:bg-slate-800/70

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  {/* Medicine Info */}

                  <div className="flex min-w-0 items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600

                        dark:bg-blue-950/50
                        dark:text-blue-400
                      "
                    >
                      <Package size={17} />
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-slate-800

                          dark:text-slate-100
                        "
                      >
                        {medicine.medicineName}
                      </p>

                      <p
                        className="
                          mt-0.5
                          truncate
                          text-xs
                          text-slate-500

                          dark:text-slate-400
                        "
                      >
                        {medicine.genericName ||
                          "Generic name not available"}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[11px]
                          text-slate-400

                          dark:text-slate-500
                        "
                      >
                        Batch:{" "}
                        {medicine.batchNumber ||
                          "-"}
                      </p>

                    </div>

                  </div>

                  {/* Medicine Details */}

                  <div className="shrink-0 text-right">

                    <div
                      className="
                        text-sm
                        font-bold
                        text-emerald-600

                        dark:text-emerald-400
                      "
                    >
                      ₹
                      {Number(
                        medicine.sellingPrice ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </div>

                    <div
                      className={`mt-1 text-xs font-semibold ${
                        isOutOfStock
                          ? "text-red-600 dark:text-red-400"
                          : isLowStock
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {isOutOfStock
                        ? "Out of Stock"
                        : `Stock: ${stock}`}
                    </div>

                    <div
                      className="
                        mt-1
                        text-[11px]
                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      Exp:{" "}
                      {medicine.expiryDate
                        ? new Date(
                            medicine.expiryDate
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </div>

                  </div>

                </button>
              );
            }
          )}

        </div>

      )}

      {/* No Results */}

      {search?.trim() &&
        filteredMedicines.length === 0 && (

          <div
            className="
              absolute
              z-20
              mt-2
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-4
              text-center
              text-sm
              text-slate-500
              shadow-xl

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-400
            "
          >
            No medicines found.
          </div>

        )}

      {/* Search Hint */}

      {!search && (

        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-blue-100
            bg-blue-50
            p-3
            text-sm
            text-blue-700

            dark:border-blue-900/60
            dark:bg-blue-950/40
            dark:text-blue-400
          "
        >

          <Package size={18} />

          Search by medicine name,
          generic name or batch number.

        </div>

      )}

    </div>
  );
};

export default MedicineSearch;