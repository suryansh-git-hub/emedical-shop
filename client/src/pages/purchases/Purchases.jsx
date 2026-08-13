import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Loader,
  Search,
  X,
  RotateCcw,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

import AddPurchaseButton from "../../components/purchase/AddPurchaseButton";
import PurchaseForm from "../../components/purchase/PurchaseForm";
import PurchaseModal from "../../components/purchase/PurchaseModal";
import PurchaseTable from "../../components/purchase/PurchaseTable";

import {
  getPurchases,
  getSuppliers,
  getMedicines,
  addPurchase,
} from "../../services/purchaseService";

// ==========================================
// Initial Form Data
// ==========================================

const initialFormData = {
  supplier: "",
  invoiceNumber: "",
  purchaseDate: new Date().toISOString().split("T")[0],

  medicines: [
    {
      medicine: "",
      quantity: 1,
      purchasePrice: "",
    },
  ],
};

// ==========================================
// Purchases Component
// ==========================================

const Purchases = () => {
  // ==========================================
  // Purchase Data
  // ==========================================

  const [loading, setLoading] = useState(true);

  const [purchases, setPurchases] = useState([]);

  const [suppliers, setSuppliers] = useState([]);

  const [medicines, setMedicines] = useState([]);

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

  const [totalPurchases, setTotalPurchases] =
    useState(0);

  const limit = 10;

  // ==========================================
  // Purchase Modal
  // ==========================================

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [formData, setFormData] =
    useState(initialFormData);

  // ==========================================
  // React Router
  // ==========================================

  const location = useLocation();

  const navigate = useNavigate();

  const selectedMedicine =
    location.state?.medicine || null;

  // ==========================================
  // Search Debouncing
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedSearch = search.trim();

      setDebouncedSearch(trimmedSearch);

      // New search always starts from page 1
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // ==========================================
  // Fetch Purchases
  // ==========================================

  const fetchPurchases = async (
    searchValue = "",
    pageValue = 1
  ) => {
    try {
      setLoading(true);

      const response = await getPurchases(
        searchValue,
        pageValue,
        limit
      );

      const purchaseList =
        response.purchases || [];

      setPurchases(purchaseList);

      setTotalPurchases(
        Number(response.totalPurchases) || 0
      );

      setTotalPages(
        Math.max(
          Number(response.totalPages) || 1,
          1
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch purchases."
      );

      setPurchases([]);

      setTotalPurchases(0);

      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Fetch Suppliers
  // ==========================================

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();

      setSuppliers(
        response.suppliers || []
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch suppliers."
      );
    }
  };

  // ==========================================
  // Fetch Medicines
  // ==========================================

  const fetchMedicines = async () => {
    try {
      const response = await getMedicines();

      setMedicines(
        response.medicines || []
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch medicines."
      );
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    const loadDropdownData = async () => {
      await Promise.all([
        fetchSuppliers(),
        fetchMedicines(),
      ]);
    };

    loadDropdownData();
  }, []);

  // ==========================================
  // Fetch Purchases
  // Search / Pagination
  // ==========================================

  useEffect(() => {
    fetchPurchases(
      debouncedSearch,
      page
    );
  }, [debouncedSearch, page]);

  // ==========================================
  // Keep Page Valid
  // ==========================================

  useEffect(() => {
    if (
      page > totalPages &&
      totalPages > 0
    ) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // ==========================================
  // Clear Search
  // ==========================================

  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  // ==========================================
  // Reset Search
  // ==========================================

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  // ==========================================
  // Open Add Purchase Modal
  // ==========================================

  const handleAddPurchase = () => {
    setFormData({
      ...initialFormData,

      medicines: [
        {
          medicine: "",
          quantity: 1,
          purchasePrice: "",
        },
      ],
    });

    setIsModalOpen(true);
  };

  // ==========================================
  // Open Purchase From Inventory
  // ==========================================

  useEffect(() => {
    if (!selectedMedicine) return;

    setFormData({
      ...initialFormData,

      medicines: [
        {
          medicine: selectedMedicine._id,
          quantity: 1,
          purchasePrice: "",
        },
      ],
    });

    setIsModalOpen(true);

    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [
    selectedMedicine,
    navigate,
    location.pathname,
  ]);

  // ==========================================
  // Close Purchase Modal
  // ==========================================

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setFormData({
      ...initialFormData,

      medicines: [
        {
          medicine: "",
          quantity: 1,
          purchasePrice: "",
        },
      ],
    });
  };

  // ==========================================
  // Save Purchase
  // ==========================================

  const handleSavePurchase = async (e) => {
    e.preventDefault();

    try {
      const response =
        await addPurchase(formData);

      toast.success(
        response.message ||
          "Purchase created successfully."
      );

      handleCloseModal();

      await fetchPurchases(
        debouncedSearch,
        page
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create purchase."
      );
    }
  };

  // ==========================================
  // Previous Page
  // ==========================================

  const handlePrevious = () => {
    if (
      page > 1 &&
      !loading
    ) {
      setPage(
        (previousPage) =>
          previousPage - 1
      );
    }
  };

  // ==========================================
  // Next Page
  // ==========================================

  const handleNext = () => {
    if (
      page < totalPages &&
      !loading
    ) {
      setPage(
        (previousPage) =>
          previousPage + 1
      );
    }
  };

  // ==========================================
  // Showing Range
  // ==========================================

  const firstPurchase =
    totalPurchases === 0
      ? 0
      : (page - 1) * limit + 1;

  const lastPurchase =
    totalPurchases === 0
      ? 0
      : Math.min(
          page * limit,
          totalPurchases
        );

  // ==========================================
  // Initial Loading
  // ==========================================

  if (
    loading &&
    purchases.length === 0
  ) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f5f7fb] dark:bg-slate-950">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50">
          <Loader
            size={26}
            className="animate-spin text-blue-600 dark:text-blue-400"
          />
        </div>

        <p className="mt-4 font-semibold text-slate-700 dark:text-slate-200">
          Loading purchases...
        </p>

        <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
          Fetching purchase information.
        </p>

      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-full bg-[#f5f7fb] dark:bg-slate-950">

      <div className="mx-auto max-w-[1500px] space-y-6">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm

            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Title */}

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-100 dark:shadow-none">

                <ShoppingCart
                  size={27}
                  className="text-white"
                />

              </div>

              <div>

                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Purchase Management
                </span>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                  Purchases
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Manage medicine purchases,
                  suppliers and inventory stock.
                </p>

              </div>

            </div>

            {/* Add Purchase */}

            <AddPurchaseButton
              onClick={
                handleAddPurchase
              }
            />

          </div>

        </div>

        {/* ==========================================
            SEARCH
        ========================================== */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            sm:p-6

            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                Find Purchases
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Search by invoice number or
                supplier name.
              </p>

            </div>

            <button
              type="button"
              onClick={handleReset}
              className="
                inline-flex
                w-fit
                items-center
                gap-2
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

                dark:border-slate-700
                dark:text-slate-300
                dark:hover:border-blue-800
                dark:hover:bg-blue-950/40
                dark:hover:text-blue-400
              "
            >
              <RotateCcw size={15} />
              Reset
            </button>

          </div>

          {/* Search Input */}

          <div className="relative">

            <Search
              size={18}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400

                dark:text-slate-500
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
              placeholder="Search by invoice number or supplier name..."
              className="
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
                dark:focus:ring-blue-950
              "
            />

            {/* Clear */}

            {search && (
              <button
                type="button"
                onClick={
                  handleClearSearch
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-8
                  w-8
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
                <X size={16} />
              </button>
            )}

          </div>

          {/* Debounce Indicator */}

          {search !== debouncedSearch && (
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">

              <Loader
                size={13}
                className="animate-spin"
              />

              Searching...

            </div>
          )}

          {/* Active Search */}

          {debouncedSearch && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">

              <Search size={15} />

              <span>
                Showing results for{" "}
                <span className="font-bold">
                  "{debouncedSearch}"
                </span>
              </span>

            </div>
          )}

        </div>

        {/* ==========================================
            PURCHASE TABLE
        ========================================== */}

        <PurchaseTable
          purchases={purchases}
        />

        {/* ==========================================
            TABLE LOADING
        ========================================== */}

        {loading &&
          purchases.length > 0 && (
            <div className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-blue-600 dark:text-blue-400">

              <Loader
                size={16}
                className="animate-spin"
              />

              Updating purchases...

            </div>
          )}

        {/* ==========================================
            PAGINATION
        ========================================== */}

        {totalPurchases > 0 && (
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              py-4
              shadow-sm

              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* Result Information */}

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">

                  <FileText size={17} />

                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400">

                  Showing{" "}

                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {firstPurchase}
                  </span>

                  {" "}to{" "}

                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {lastPurchase}
                  </span>

                  {" "}of{" "}

                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {totalPurchases}
                  </span>

                  {" "}purchases

                </p>

              </div>

              {/* Pagination Controls */}

              <div className="flex items-center gap-2">

                {/* Previous */}

                <button
                  type="button"
                  onClick={
                    handlePrevious
                  }
                  disabled={
                    page === 1 ||
                    loading
                  }
                  className="
                    inline-flex
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

                {/* Current Page */}

                <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-bold text-white shadow-sm">
                  {page}
                </div>

                <span className="px-1 text-sm text-slate-400 dark:text-slate-500">
                  of {totalPages}
                </span>

                {/* Next */}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    page >= totalPages ||
                    loading
                  }
                  className="
                    inline-flex
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

        {/* ==========================================
            PURCHASE MODAL
        ========================================== */}

        <PurchaseModal
          isOpen={isModalOpen}
          onClose={
            handleCloseModal
          }
        >

          <PurchaseForm
            formData={formData}
            setFormData={setFormData}
            suppliers={suppliers}
            medicines={medicines}
            onSubmit={
              handleSavePurchase
            }
            selectedMedicine={
              selectedMedicine
            }
          />

        </PurchaseModal>

      </div>

    </div>
  );
};

export default Purchases;