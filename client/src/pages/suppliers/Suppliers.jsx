import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Loader,
  Search,
  X,
  RotateCcw,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import AddSupplierButton from "../../components/suppliers/AddSupplierButton";
import SupplierModal from "../../components/suppliers/SupplierModal";
import SupplierForm from "../../components/suppliers/SupplierForm";
import SupplierTable from "../../components/suppliers/SupplierTable";
import SupplierHistoryModal from "../../components/suppliers/SupplierHistoryModal";

import {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierPurchaseHistory,
} from "../../services/supplierService";

// ==========================================
// Initial Form Data
// ==========================================

const initialFormData = {
  supplierName: "",
  contactNumber: "",
  email: "",
  address: "",
  gstNumber: "",
};

const Suppliers = () => {
  // ==========================================
  // Suppliers
  // ==========================================

  const [suppliers, setSuppliers] = useState([]);

  const [loading, setLoading] = useState(true);

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

  const [totalSuppliers, setTotalSuppliers] =
    useState(0);

  // Suppliers per page
  const limit = 10;

  // ==========================================
  // Supplier Modal
  // ==========================================

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingSupplier, setEditingSupplier] =
    useState(null);

  const [formData, setFormData] =
    useState({
      ...initialFormData,
    });

  // ==========================================
  // Purchase History
  // ==========================================

  const [history, setHistory] = useState(null);

  const [isHistoryOpen, setIsHistoryOpen] =
    useState(false);

  // ==========================================
  // Search Debouncing
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());

      // Whenever search changes,
      // start from page 1.
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // ==========================================
  // Fetch Suppliers
  // ==========================================

  const fetchSuppliers = async (
    searchValue = debouncedSearch,
    pageValue = page
  ) => {
    try {
      setLoading(true);

      const response = await getSuppliers(
        searchValue,
        pageValue,
        limit
      );

      // ======================================
      // Set Suppliers
      // ======================================

      const supplierList =
        response.suppliers || [];

      setSuppliers(supplierList);

      // ======================================
      // Set Total Suppliers
      // ======================================
      //
      // Backend normally sends totalSuppliers.
      // Fallback to returned array length
      // just in case.
      //

      setTotalSuppliers(
        Number(response.totalSuppliers) ||
          supplierList.length ||
          0
      );

      // ======================================
      // Set Total Pages
      // ======================================

      setTotalPages(
        Math.max(
          Number(response.totalPages) || 1,
          1
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch suppliers."
      );

      setSuppliers([]);
      setTotalSuppliers(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Fetch when search/page changes
  // ==========================================

  useEffect(() => {
    fetchSuppliers(
      debouncedSearch,
      page
    );
  }, [debouncedSearch, page]);

  // ==========================================
  // Clear Search
  // ==========================================

  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  // ==========================================
  // Reset
  // ==========================================

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  // ==========================================
  // Add Supplier
  // ==========================================

  const handleAddSupplier = () => {
    setEditingSupplier(null);

    setFormData({
      ...initialFormData,
    });

    setIsModalOpen(true);
  };

  // ==========================================
  // Edit Supplier
  // ==========================================

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);

    setFormData({
      supplierName:
        supplier.supplierName || "",

      contactNumber:
        supplier.contactNumber || "",

      email:
        supplier.email || "",

      address:
        supplier.address || "",

      gstNumber:
        supplier.gstNumber || "",
    });

    setIsModalOpen(true);
  };

  // ==========================================
  // Close Supplier Modal
  // ==========================================

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setEditingSupplier(null);

    setFormData({
      ...initialFormData,
    });
  };

  // ==========================================
  // Delete Supplier
  // ==========================================

  const handleDeleteSupplier = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this supplier?"
      );

    if (!confirmDelete) return;

    try {
      const response =
        await deleteSupplier(id);

      toast.success(
        response.message ||
          "Supplier deleted successfully."
      );

      // ======================================
      // If the last supplier on the current
      // page was deleted, move to previous page
      // ======================================

      if (
        suppliers.length === 1 &&
        page > 1
      ) {
        setPage(
          (previousPage) =>
            previousPage - 1
        );
      } else {
        await fetchSuppliers(
          debouncedSearch,
          page
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete supplier."
      );
    }
  };

  // ==========================================
  // Supplier Purchase History
  // ==========================================

  const handleSupplierHistory = async (
    supplier
  ) => {
    try {
      const response =
        await getSupplierPurchaseHistory(
          supplier._id
        );

      setHistory(response);

      setIsHistoryOpen(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch purchase history."
      );
    }
  };

  // ==========================================
  // Save Supplier
  // ==========================================

  const handleSaveSupplier = async (e) => {
    e.preventDefault();

    try {
      let response;

      // ======================================
      // Update
      // ======================================

      if (editingSupplier) {
        response = await updateSupplier(
          editingSupplier._id,
          formData
        );
      }

      // ======================================
      // Create
      // ======================================

      else {
        response = await addSupplier(
          formData
        );
      }

      toast.success(
        response.message ||
          "Supplier saved successfully."
      );

      handleCloseModal();

      // Refresh current page
      await fetchSuppliers(
        debouncedSearch,
        page
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  // ==========================================
  // Previous Page
  // ==========================================

  const handlePrevious = () => {
    if (page > 1 && !loading) {
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

  const firstSupplier =
    totalSuppliers === 0
      ? 0
      : (page - 1) * limit + 1;

  const lastSupplier = Math.min(
    page * limit,
    totalSuppliers
  );

  // ==========================================
  // Initial Loading
  // ==========================================

  if (
    loading &&
    suppliers.length === 0
  ) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
          <Loader
            size={26}
            className="animate-spin text-blue-600"
          />
        </div>

        <p className="mt-4 font-semibold text-slate-700">
          Loading suppliers...
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Fetching supplier information.
        </p>

      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-full bg-[#f5f7fb]">

      <div className="mx-auto max-w-[1500px] space-y-6">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-100">

                <Building2
                  size={27}
                  className="text-white"
                />

              </div>

              <div>

                <span className="text-sm font-semibold text-blue-600">
                  Supplier Management
                </span>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Suppliers
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage supplier information,
                  contacts and purchase history.
                </p>

              </div>

            </div>

            <AddSupplierButton
              onClick={
                handleAddSupplier
              }
            />

          </div>

        </div>

        {/* ==========================================
            SEARCH
        ========================================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Find Suppliers
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search suppliers by name or
                contact number.
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
              placeholder="Search by supplier name or phone number..."
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
              "
            />

            {/* Clear Search */}

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
                "
                title="Clear search"
              >

                <X size={16} />

              </button>
            )}

          </div>

          {/* Searching Indicator */}

          {search !== debouncedSearch && (
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-blue-600">

              <Loader
                size={13}
                className="animate-spin"
              />

              Searching...

            </div>
          )}

          {/* Active Search */}

          {debouncedSearch && (
            <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">

              Showing results for{" "}

              <span className="font-bold">
                "{debouncedSearch}"
              </span>

            </div>
          )}

        </div>

        {/* ==========================================
            SUPPLIER TABLE
        ========================================== */}

        <SupplierTable
          suppliers={suppliers}
          onEdit={handleEditSupplier}
          onDelete={
            handleDeleteSupplier
          }
          onHistory={
            handleSupplierHistory
          }
        />

        {/* ==========================================
            TABLE UPDATE LOADING
        ========================================== */}

        {loading &&
          suppliers.length > 0 && (
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600">

              <Loader
                size={16}
                className="animate-spin"
              />

              Updating suppliers...

            </div>
          )}

        {/* ==========================================
            PAGINATION
        ========================================== */}

        {totalSuppliers > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* Showing */}

              <p className="text-sm text-slate-500">

                Showing{" "}

                <span className="font-semibold text-slate-800">
                  {firstSupplier}
                </span>

                {" "}to{" "}

                <span className="font-semibold text-slate-800">
                  {lastSupplier}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-slate-800">
                  {totalSuppliers}
                </span>

                {" "}suppliers

              </p>

              {/* Controls */}

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
                  "
                >

                  <ChevronLeft
                    size={16}
                  />

                  Previous

                </button>

                {/* Current Page */}

                <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-bold text-white">
                  {page}
                </div>

                {/* Total Pages */}

                <span className="px-1 text-sm text-slate-400">
                  of {totalPages}
                </span>

                {/* Next */}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    page >=
                      totalPages ||
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
            NO SUPPLIERS
        ========================================== */}

        {suppliers.length === 0 &&
          !loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Building2 size={25} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-800">
                No Suppliers Found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {debouncedSearch
                  ? `No suppliers match "${debouncedSearch}".`
                  : "Add your first supplier to get started."}
              </p>

            </div>
          )}

        {/* ==========================================
            SUPPLIER MODAL
        ========================================== */}

        <SupplierModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >

          <SupplierForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSaveSupplier}
            isEditing={
              editingSupplier
            }
          />

        </SupplierModal>

        {/* ==========================================
            PURCHASE HISTORY MODAL
        ========================================== */}

        <SupplierHistoryModal
          isOpen={isHistoryOpen}
          history={history}
          onClose={() => {
            setIsHistoryOpen(false);
            setHistory(null);
          }}
        />

      </div>

    </div>
  );
};

export default Suppliers;