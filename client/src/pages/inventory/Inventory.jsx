import { useEffect, useRef, useState } from "react";
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
  updateInventoryStock,
} from "../../services/inventoryService";

const Inventory = () => {
  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] = useState(true);

  const [updatingStock, setUpdatingStock] =
    useState(false);

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
  // Request Tracking
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

  const loadInventory = async (
    showLoader = true
  ) => {
    const currentRequestId =
      ++requestIdRef.current;

    try {
      if (showLoader) {
        setLoading(true);
      }

      const params = {
        search: debouncedSearch,
        page,
        limit,
      };

      let response;

      // ========================================
      // Select API According To Filter
      // ========================================

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

      // ========================================
      // Ignore Old Request
      // ========================================

      if (
        currentRequestId !==
        requestIdRef.current
      ) {
        return;
      }

      // ========================================
      // Update Inventory
      // ========================================

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
      if (
        currentRequestId !==
        requestIdRef.current
      ) {
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
      if (
        currentRequestId ===
        requestIdRef.current
      ) {
        setLoading(false);
      }
    }
  };

  // ==========================================
  // LOAD INVENTORY WHEN FILTER / SEARCH / PAGE
  // CHANGES
  // ==========================================

  useEffect(() => {
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
  // UPDATE STOCK
  // Add / Remove
  // ==========================================

  const handleStockUpdate = async (
    inventoryItem,
    type
  ) => {
    // ========================================
    // Validate Inventory Item
    // ========================================

    if (
      !inventoryItem ||
      !inventoryItem.medicine?._id
    ) {
      toast.error(
        "Medicine information is missing."
      );

      return;
    }

    // ========================================
    // Medicine Information
    // ========================================

    const medicineId =
      inventoryItem.medicine._id;

    const medicineName =
      inventoryItem.medicine.medicineName ||
      "this medicine";

    // ========================================
    // Determine Action
    // Backend expects:
    // "increase" or "decrease"
    // ========================================

    const action =
      type === "add"
        ? "increase"
        : "decrease";

    const actionText =
      action === "increase"
        ? "Add"
        : "Remove";

    // ========================================
    // Ask Quantity
    // ========================================

    const quantityInput =
      window.prompt(
        `${actionText} how many units of ${medicineName}?`,
        "1"
      );

    // User clicked Cancel
    if (quantityInput === null) {
      return;
    }

    // ========================================
    // Convert Quantity
    // ========================================

    const quantity =
      Number(quantityInput);

    // ========================================
    // Validate Quantity
    // ========================================

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      toast.error(
        "Please enter a valid whole number greater than 0."
      );

      return;
    }

    // ========================================
    // Current Inventory Stock
    // ========================================

    const currentStock =
      Number(
        inventoryItem.currentStock
      ) || 0;

    // ========================================
    // Remove Stock Validation
    // ========================================

    if (
      action === "decrease" &&
      quantity > currentStock
    ) {
      toast.error(
        `Only ${currentStock} units are available.`
      );

      return;
    }

    try {
      setUpdatingStock(true);

      // ======================================
      // UPDATE BOTH:
      //
      // Medicine.stock
      // Inventory.currentStock
      // ======================================

      const response =
        await updateInventoryStock(
          medicineId,
          action,
          quantity
        );

      toast.success(
        response.message ||
          `${
            action === "increase"
              ? "Stock added"
              : "Stock removed"
          } successfully.`
      );

      // ======================================
      // Reload Current Inventory
      // ======================================

      await loadInventory(false);
    } catch (error) {
      console.error(
        "Stock Update Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update stock."
      );
    } finally {
      setUpdatingStock(false);
    }
  };

  // ==========================================
  // INCREASE STOCK
  // ==========================================

  const handleIncreaseStock = (
    inventoryItem
  ) => {
    handleStockUpdate(
      inventoryItem,
      "add"
    );
  };

  // ==========================================
  // REDUCE STOCK
  // ==========================================

  const handleReduceStock = (
    inventoryItem
  ) => {
    handleStockUpdate(
      inventoryItem,
      "remove"
    );
  };

  // ==========================================
  // STOCK HISTORY
  // ==========================================

  const handleViewHistory = async (
    medicineId
  ) => {
    if (!medicineId) {
      toast.error(
        "Medicine information is missing."
      );

      return;
    }

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
      console.error(
        "Stock History Error:",
        error
      );

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
    if (
      page > 1 &&
      !loading &&
      !updatingStock
    ) {
      setPage(
        (prev) => prev - 1
      );
    }
  };

  const handleNext = () => {
    if (
      page < totalPages &&
      !loading &&
      !updatingStock
    ) {
      setPage(
        (prev) => prev + 1
      );
    }
  };

  // ==========================================
  // INITIAL LOADING
  // ==========================================

  if (
    loading &&
    inventory.length === 0
  ) {
    return (
      <div className="
        flex
        min-h-[60vh]
        flex-col
        items-center
        justify-center
      ">
        <div className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-blue-50
          dark:bg-blue-950/40
        ">
          <Loader
            size={26}
            className="
              animate-spin
              text-blue-600
              dark:text-blue-400
            "
          />
        </div>

        <p className="
          mt-4
          font-semibold
          text-slate-700
          dark:text-slate-200
        ">
          Loading inventory...
        </p>

        <p className="
          mt-1
          text-sm
          text-slate-400
          dark:text-slate-500
        ">
          Fetching your stock information.
        </p>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="
      mx-auto
      max-w-[1600px]
      space-y-6
      pb-10
    ">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      ">

        <div className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          <div className="flex items-center gap-4">

            <div className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-600
              shadow-lg
              shadow-blue-100
              dark:shadow-none
            ">
              <PackageSearch
                size={27}
                className="text-white"
              />
            </div>

            <div>

              <span className="
                text-sm
                font-semibold
                text-blue-600
                dark:text-blue-400
              ">
                Stock Management
              </span>

              <h1 className="
                mt-1
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                dark:text-slate-100
                sm:text-3xl
              ">
                Inventory
              </h1>

              <p className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              ">
                Monitor stock levels, expiry dates
                and inventory movement.
              </p>

            </div>

          </div>

          {/* RESET */}

          <button
            type="button"
            onClick={handleReset}
            disabled={updatingStock}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:border-blue-800
              dark:hover:bg-blue-950/40
              dark:hover:text-blue-400
            "
          >
            <RotateCcw size={16} />
            Reset
          </button>

        </div>

      </div>

      {/* ==========================================
          SEARCH + FILTER
      ========================================== */}

      <div className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
        sm:p-6
      ">

        <div className="mb-5">

          <h2 className="
            font-semibold
            text-slate-900
            dark:text-slate-100
          ">
            Find Inventory
          </h2>

          <p className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          ">
            Search medicines or filter inventory
            by stock status.
          </p>

        </div>

        <div className="
          flex
          flex-col
          gap-4
          lg:flex-row
        ">

          {/* SEARCH */}

          <div className="
            relative
            min-w-0
            flex-1
          ">

            <Search
              size={18}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                z-10
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search medicine, generic name, company, category or batch..."
              className="
                block
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                py-3.5
                pl-11
                pr-11
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
                dark:focus:ring-blue-950/50
              "
            />

            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="
                  absolute
                  right-3
                  top-1/2
                  z-10
                  flex
                  h-7
                  w-7
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-200
                  hover:text-slate-700
                  dark:hover:bg-slate-700
                  dark:hover:text-slate-200
                "
                title="Clear search"
              >
                <X size={15} />
              </button>
            )}

          </div>

          {/* FILTER */}

          <div className="shrink-0 lg:w-auto">

            <InventoryFilter
              selectedFilter={
                selectedFilter
              }
              setSelectedFilter={
                handleFilterChange
              }
            />

          </div>

        </div>

        {/* SEARCH STATUS */}

        {search !==
          debouncedSearch && (
          <div className="
            mt-3
            flex
            items-center
            gap-2
            text-xs
            font-medium
            text-blue-600
            dark:text-blue-400
          ">
            <Loader
              size={13}
              className="animate-spin"
            />

            Searching...
          </div>
        )}

        {/* ACTIVE SEARCH */}

        {search ===
          debouncedSearch &&
          debouncedSearch && (
            <div className="
              mt-4
              rounded-xl
              bg-blue-50
              px-4
              py-3
              text-sm
              text-blue-700
              dark:bg-blue-950/40
              dark:text-blue-300
            ">
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

      <div className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      ">

        {/* INVENTORY HEADER */}

        <div className="
          border-b
          border-slate-200
          px-5
          py-5
          dark:border-slate-800
          sm:px-6
        ">

          <div className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          ">

            <div>

              <h2 className="
                font-semibold
                text-slate-900
                dark:text-slate-100
              ">
                Inventory Records
              </h2>

              <p className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              ">
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
              <span className="
                w-fit
                rounded-full
                bg-blue-50
                px-3
                py-1.5
                text-xs
                font-semibold
                text-blue-600
                dark:bg-blue-950/40
                dark:text-blue-400
              ">
                Page {page} of{" "}
                {totalPages}
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
            updatingStock={
              updatingStock
            }
          />

        </div>

        {/* ==========================================
            PAGINATION
        ========================================== */}

        {totalItems > 0 && (

          <div className="
            border-t
            border-slate-200
            px-5
            py-4
            dark:border-slate-800
            sm:px-6
          ">

            <div className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            ">

              {/* SHOWING */}

              <p className="
                text-sm
                text-slate-500
                dark:text-slate-400
              ">
                Showing{" "}

                <span className="
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                ">
                  {(page - 1) *
                    limit +
                    1}
                </span>

                {" "}to{" "}

                <span className="
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                ">
                  {Math.min(
                    page * limit,
                    totalItems
                  )}
                </span>

                {" "}of{" "}

                <span className="
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                ">
                  {totalItems}
                </span>
              </p>

              {/* CONTROLS */}

              <div className="flex items-center gap-2">

                {/* PREVIOUS */}

                <button
                  type="button"
                  disabled={
                    page === 1 ||
                    loading ||
                    updatingStock
                  }
                  onClick={
                    handlePrevious
                  }
                  className="
                    flex
                    items-center
                    gap-1
                    rounded-xl
                    border
                    border-slate-200
                    px-3.5
                    py-2
                    text-sm
                    font-medium
                    text-slate-600
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    dark:border-slate-700
                    dark:text-slate-300
                    dark:hover:border-blue-800
                    dark:hover:bg-blue-950/40
                    dark:hover:text-blue-400
                  "
                >
                  <ChevronLeft
                    size={16}
                  />

                  Previous
                </button>

                {/* CURRENT PAGE */}

                <div className="
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600
                  px-3
                  text-sm
                  font-bold
                  text-white
                ">
                  {page}
                </div>

                {/* NEXT */}

                <button
                  type="button"
                  disabled={
                    page >=
                      totalPages ||
                    loading ||
                    updatingStock
                  }
                  onClick={
                    handleNext
                  }
                  className="
                    flex
                    items-center
                    gap-1
                    rounded-xl
                    border
                    border-slate-200
                    px-3.5
                    py-2
                    text-sm
                    font-medium
                    text-slate-600
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    dark:border-slate-700
                    dark:text-slate-300
                    dark:hover:border-blue-800
                    dark:hover:bg-blue-950/40
                    dark:hover:text-blue-400
                  "
                >
                  Next

                  <ChevronRight
                    size={16}
                  />
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