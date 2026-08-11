import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Loader,
  Search,
  RotateCcw,
  PackageSearch,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import InventoryTable from "../../components/inventory/InventoryTable";
import InventoryFilter from "../../components/inventory/InventoryFilter";
import InventoryModal from "../../components/inventory/InventoryModal";
import StockHistoryTable from "../../components/inventory/StockHistoryTable";

import {
  getInventory,
  getLowStockMedicines,
  getOutOfStockMedicines,
  getNearExpiryMedicines,
  getStockHistory,
  getExpiredMedicines,
} from "../../services/inventoryService";

const Inventory = () => {
  const navigate = useNavigate();

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Inventory
  // ==========================================

  const [inventory, setInventory] = useState([]);

  // ==========================================
  // Filter
  // ==========================================

  const [selectedFilter, setSelectedFilter] =
    useState("all");

  // ==========================================
  // Search
  // ==========================================

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  // ==========================================
  // Pagination
  // ==========================================

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalItems, setTotalItems] =
    useState(0);

  const limit = 10;

  // ==========================================
  // Stock History
  // ==========================================

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [stockHistory, setStockHistory] =
    useState([]);

  // ==========================================
  // REQUEST TRACKING
  // Prevents stale/out-of-order API responses
  // from overwriting newer ones (this was the
  // root cause of search + pagination looking
  // "broken" — a slower older request would
  // resolve after a newer one and clobber state)
  // ==========================================

  const requestIdRef = useRef(0);

  // ==========================================
  // DEBOUNCE SEARCH
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // ==========================================
  // LOAD INVENTORY
  // ==========================================

  useEffect(() => {
    const loadInventory = async () => {
      // Mark this call as the latest request.
      const currentRequestId = ++requestIdRef.current;

      try {
        setLoading(true);

        const params = {
          search: debouncedSearch,
          page: page,
          limit: limit,
        };

        console.log(
          "Inventory API Params:",
          params
        );

        let response;

        if (selectedFilter === "low-stock") {
          response =
            await getLowStockMedicines(params);
        } else if (
          selectedFilter === "out-of-stock"
        ) {
          response =
            await getOutOfStockMedicines(params);
        } else if (
          selectedFilter === "near-expiry"
        ) {
          response =
            await getNearExpiryMedicines(params);
        } else if (
          selectedFilter === "expired"
        ) {
          response =
            await getExpiredMedicines(params);
        } else {
          response =
            await getInventory(params);
        }

        console.log(
          "Inventory API Response:",
          response
        );

        // If a newer request has started since this one
        // was fired, ignore this (now stale) response.
        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        setInventory(
          response.inventory || []
        );

        setTotalItems(
          Number(response.totalItems) || 0
        );

        setTotalPages(
          Math.max(
            Number(response.totalPages) || 1,
            1
          )
        );
      } catch (error) {
        // Ignore errors from stale/cancelled-in-spirit requests too.
        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        console.error(
          "Inventory Error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load inventory."
        );

        setInventory([]);
        setTotalItems(0);
        setTotalPages(1);
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    };

    loadInventory();
  }, [
    selectedFilter,
    debouncedSearch,
    page,
  ]);

  // ==========================================
  // FILTER
  // ==========================================

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    setPage(1);
  };

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedFilter("all");
    setPage(1);
  };

  // ==========================================
  // INCREASE STOCK
  // ==========================================

  const handleIncreaseStock = (medicine) => {
    navigate("/purchases", {
      state: {
        medicine,
      },
    });
  };

  // ==========================================
  // REDUCE STOCK
  // ==========================================

  const handleReduceStock = (medicine) => {
    navigate("/sales", {
      state: {
        medicine,
      },
    });
  };

  // ==========================================
  // STOCK HISTORY
  // ==========================================

  const handleViewHistory = async (
    medicineId
  ) => {
    try {
      const response =
        await getStockHistory(
          medicineId
        );

      setStockHistory(
        response.history || []
      );

      setIsModalOpen(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch stock history."
      );
    }
  };

  // ==========================================
  // PAGINATION
  // ==========================================

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading && inventory.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
          <Loader
            size={26}
            className="animate-spin text-blue-600"
          />
        </div>

        <p className="mt-4 font-semibold text-slate-700">
          Loading inventory...
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Fetching your stock information.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 pb-10">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-100">
              <PackageSearch
                size={27}
                className="text-white"
              />
            </div>

            <div>
              <span className="text-sm font-semibold text-blue-600">
                Stock Management
              </span>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Inventory
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Monitor stock levels, expiry dates
                and inventory movement.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <RotateCcw size={16} />
            Reset
          </button>

        </div>

      </div>

      {/* ==========================================
          SEARCH + FILTER
      ========================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-5">
          <h2 className="font-semibold text-slate-900">
            Find Inventory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search medicines or filter inventory
            by stock status.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">

          {/* SEARCH */}

          <div className="relative min-w-0 flex-1">

            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search medicine, generic name, company, category or batch..."
              className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              >
                <X size={15} />
              </button>
            )}

          </div>

          {/* FILTER */}

          <div className="shrink-0 lg:w-auto">
            <InventoryFilter
              selectedFilter={selectedFilter}
              setSelectedFilter={
                handleFilterChange
              }
            />
          </div>

        </div>

        {/* SEARCH STATUS */}

        {search !== debouncedSearch && (
          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-blue-600">
            <Loader
              size={13}
              className="animate-spin"
            />
            Searching...
          </div>
        )}

        {search === debouncedSearch &&
          debouncedSearch && (
            <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Search results for{" "}
              <span className="font-bold">
                "{debouncedSearch}"
              </span>
            </div>
          )}

      </div>

      {/* ==========================================
          INVENTORY
      ========================================== */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Inventory Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {totalItems > 0
                  ? `${totalItems} record${
                      totalItems !== 1
                        ? "s"
                        : ""
                    } found`
                  : "No inventory records found"}
              </p>
            </div>

            {totalItems > 0 && (
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                Page {page} of {totalPages}
              </span>
            )}

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <InventoryTable
            inventory={inventory}
            onIncreaseStock={
              handleIncreaseStock
            }
            onReduceStock={
              handleReduceStock
            }
            onViewHistory={
              handleViewHistory
            }
          />

        </div>

        {/* ==========================================
            PAGINATION
        ========================================== */}

        {totalItems > 0 && (
          <div className="border-t border-slate-200 px-5 py-4 sm:px-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-slate-500">

                Showing{" "}

                <span className="font-semibold text-slate-700">
                  {(page - 1) * limit + 1}
                </span>

                {" "}to{" "}

                <span className="font-semibold text-slate-700">
                  {Math.min(
                    page * limit,
                    totalItems
                  )}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-slate-700">
                  {totalItems}
                </span>

              </p>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  disabled={
                    page === 1 || loading
                  }
                  onClick={handlePrevious}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-bold text-white">
                  {page}
                </div>

                <button
                  type="button"
                  disabled={
                    page >= totalPages ||
                    loading
                  }
                  onClick={handleNext}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* ==========================================
          STOCK HISTORY
      ========================================== */}

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
      >
        <StockHistoryTable
          history={stockHistory}
        />
      </InventoryModal>

    </div>
  );
};

export default Inventory;
