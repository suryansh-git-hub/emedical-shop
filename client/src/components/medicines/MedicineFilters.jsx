import {
  Filter,
  ArrowDownUp,
} from "lucide-react";

function MedicineFilters({
  category,
  setCategory,
  company,
  setCompany,
  expiry,
  setExpiry,
  sortBy,
  setSortBy,
  order,
  setOrder,
  setPage,
}) {
  const handleChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      {/* Filter Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
          <Filter
            size={16}
            className="text-slate-600"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Filters & Sorting
          </h3>

          <p className="text-xs text-slate-500">
            Refine your medicine inventory
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              handleChange(
                setCategory,
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2.5
              text-sm
              text-slate-700
              outline-none
              transition
              focus:border-blue-400
              focus:ring-4
              focus:ring-blue-50
            "
          >
            <option value="">
              All Categories
            </option>

            <option value="Tablet">
              Tablet
            </option>

            <option value="Capsule">
              Capsule
            </option>

            <option value="Syrup">
              Syrup
            </option>

            <option value="Injection">
              Injection
            </option>

            <option value="Ointment">
              Ointment
            </option>

            <option value="Drops">
              Drops
            </option>

            <option value="Powder">
              Powder
            </option>
          </select>
        </div>

        {/* Company */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600">
            Company
          </label>

          <input
            type="text"
            value={company}
            onChange={(e) =>
              handleChange(
                setCompany,
                e.target.value
              )
            }
            placeholder="Search company..."
            className="
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2.5
              text-sm
              text-slate-700
              placeholder:text-slate-400
              outline-none
              transition
              focus:border-blue-400
              focus:ring-4
              focus:ring-blue-50
            "
          />
        </div>

        {/* Expiry */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600">
            Expiry Status
          </label>

          <select
            value={expiry}
            onChange={(e) =>
              handleChange(
                setExpiry,
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2.5
              text-sm
              text-slate-700
              outline-none
              transition
              focus:border-blue-400
              focus:ring-4
              focus:ring-blue-50
            "
          >
            <option value="">
              All Medicines
            </option>

            <option value="valid">
              Valid
            </option>

            <option value="near">
              Near Expiry
            </option>

            <option value="expired">
              Expired
            </option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
            <ArrowDownUp size={13} />
            Sort By
          </label>

          <select
            value={sortBy}
            onChange={(e) =>
              handleChange(
                setSortBy,
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2.5
              text-sm
              text-slate-700
              outline-none
              transition
              focus:border-blue-400
              focus:ring-4
              focus:ring-blue-50
            "
          >
            <option value="createdAt">
              Newest
            </option>

            <option value="medicineName">
              Medicine Name
            </option>

            <option value="sellingPrice">
              Selling Price
            </option>

            <option value="purchasePrice">
              Purchase Price
            </option>

            <option value="stockQuantity">
              Stock
            </option>

            <option value="expiryDate">
              Expiry Date
            </option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600">
            Sort Order
          </label>

          <select
            value={order}
            onChange={(e) =>
              handleChange(
                setOrder,
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2.5
              text-sm
              text-slate-700
              outline-none
              transition
              focus:border-blue-400
              focus:ring-4
              focus:ring-blue-50
            "
          >
            <option value="desc">
              Descending ↓
            </option>

            <option value="asc">
              Ascending ↑
            </option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default MedicineFilters;