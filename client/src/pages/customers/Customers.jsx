import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Loader,
  Search,
  X,
  RotateCcw,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import AddCustomerButton from "../../components/customers/AddCustomerButton";
import CustomerForm from "../../components/customers/CustomerForm";
import CustomerModal from "../../components/customers/CustomerModal";
import CustomerTable from "../../components/customers/CustomerTable";
import CustomerHistoryModal from "../../components/customers/CustomerHistoryModal";

import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerPurchaseHistory,
} from "../../services/customerService";

// ==========================================
// Initial Form Data
// ==========================================

const initialFormData = {
  customerName: "",
  contactNumber: "",
  email: "",
  address: "",
};

const Customers = () => {
  // ==========================================
  // Customers
  // ==========================================

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Search
  // ==========================================

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [searching, setSearching] = useState(false);

  // ==========================================
  // Pagination
  // ==========================================

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalCustomers, setTotalCustomers] =
    useState(0);

  // 10 customers per page
  const limit = 10;

  // ==========================================
  // Customer Modal
  // ==========================================

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingCustomer, setEditingCustomer] =
    useState(null);

  const [formData, setFormData] =
    useState(initialFormData);

  // ==========================================
  // Customer History
  // ==========================================

  const [history, setHistory] = useState(null);

  const [isHistoryOpen, setIsHistoryOpen] =
    useState(false);

  // ==========================================
  // Search Debouncing
  // ==========================================

  useEffect(() => {
    // Don't show searching indicator
    // when search hasn't changed.
    setSearching(true);

    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());

      // Whenever search changes,
      // start from page 1.
      setPage(1);

      setSearching(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // ==========================================
  // Fetch Customers
  // ==========================================

  const fetchCustomers = async (
    searchValue = debouncedSearch,
    pageValue = page
  ) => {
    try {
      setLoading(true);

      const response = await getCustomers(
        searchValue,
        pageValue,
        limit
      );

      setCustomers(
        response.customers || []
      );

      /*
       * Backend currently returns:
       *
       * customers
       *
       * If pagination has not yet been added
       * to the backend, totalCustomers will
       * fallback to the returned array length.
       */

      setTotalCustomers(
        Number(
          response.totalCustomers
        ) ||
          Number(response.totalItems) ||
          response.customers?.length ||
          0
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
          "Failed to fetch customers."
      );

      setCustomers([]);
      setTotalCustomers(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Fetch when search/page changes
  // ==========================================

  useEffect(() => {
    fetchCustomers(
      debouncedSearch,
      page
    );
  }, [
    debouncedSearch,
    page,
  ]);

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
  // Add Customer
  // ==========================================

  const handleAddCustomer = () => {
    setEditingCustomer(null);

    setFormData({
      ...initialFormData,
    });

    setIsModalOpen(true);
  };

  // ==========================================
  // Edit Customer
  // ==========================================

  const handleEditCustomer = (
    customer
  ) => {
    setEditingCustomer(customer);

    setFormData({
      customerName:
        customer.customerName || "",

      contactNumber:
        customer.contactNumber || "",

      email:
        customer.email || "",

      address:
        customer.address || "",
    });

    setIsModalOpen(true);
  };

  // ==========================================
  // Close Customer Modal
  // ==========================================

  const handleCloseCustomerModal = () => {
    setIsModalOpen(false);

    setEditingCustomer(null);

    setFormData({
      ...initialFormData,
    });
  };

  // ==========================================
  // Delete Customer
  // ==========================================

  const handleDeleteCustomer = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this customer?"
      );

    if (!confirmDelete) return;

    try {
      const response =
        await deleteCustomer(id);

      toast.success(
        response.message ||
          "Customer deleted successfully."
      );

      /*
       * If the last customer on the current
       * page gets deleted, move back one page.
       */

      if (
        customers.length === 1 &&
        page > 1
      ) {
        setPage(
          (previousPage) =>
            previousPage - 1
        );
      } else {
        await fetchCustomers(
          debouncedSearch,
          page
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete customer."
      );
    }
  };

  // ==========================================
  // Customer History
  // ==========================================

  const handleCustomerHistory = async (
    customer
  ) => {
    try {
      const response =
        await getCustomerPurchaseHistory(
          customer._id
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
  // Save Customer
  // ==========================================

  const handleSaveCustomer = async (
    e
  ) => {
    e.preventDefault();

    try {
      let response;

      if (editingCustomer) {
        response = await updateCustomer(
          editingCustomer._id,
          formData
        );
      } else {
        response = await addCustomer(
          formData
        );
      }

      toast.success(
        response.message ||
          "Customer saved successfully."
      );

      handleCloseCustomerModal();

      await fetchCustomers(
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
    if (page > 1) {
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
    if (page < totalPages) {
      setPage(
        (previousPage) =>
          previousPage + 1
      );
    }
  };

  // ==========================================
  // Showing Range
  // ==========================================

  const firstCustomer =
    totalCustomers === 0
      ? 0
      : (page - 1) * limit + 1;

  const lastCustomer =
    Math.min(
      page * limit,
      totalCustomers
    );

  // ==========================================
  // Initial Loading
  // ==========================================

  if (
    loading &&
    customers.length === 0 &&
    !debouncedSearch
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
          Loading customers...
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Fetching customer information.
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

                <Users
                  size={27}
                  className="text-white"
                />

              </div>

              <div>

                <span className="text-sm font-semibold text-blue-600">
                  Customer Management
                </span>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Customers
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage customer information,
                  contacts and purchase history.
                </p>

              </div>

            </div>

            <AddCustomerButton
              onClick={
                handleAddCustomer
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
                Find Customers
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search customers by name or
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
              placeholder="Search by customer name or phone number..."
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
            CUSTOMER TABLE
        ========================================== */}

        <CustomerTable
          customers={customers}
          onEdit={handleEditCustomer}
          onDelete={
            handleDeleteCustomer
          }
          onHistory={
            handleCustomerHistory
          }
        />

        {/* ==========================================
            TABLE LOADING OVERLAY
        ========================================== */}

        {loading &&
          customers.length > 0 && (
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600">

              <Loader
                size={16}
                className="animate-spin"
              />

              Updating customers...

            </div>
          )}

        {/* ==========================================
            PAGINATION
        ========================================== */}

        {totalCustomers > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* Showing */}

              <p className="text-sm text-slate-500">

                Showing{" "}

                <span className="font-semibold text-slate-800">
                  {firstCustomer}
                </span>

                {" "}to{" "}

                <span className="font-semibold text-slate-800">
                  {lastCustomer}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-slate-800">
                  {totalCustomers}
                </span>

                {" "}customers

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
            NO CUSTOMERS
        ========================================== */}

        {totalCustomers === 0 &&
          !loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Users size={25} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-800">
                No Customers Found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Try a different name or phone
                number.
              </p>

            </div>
          )}

        {/* ==========================================
            ADD / EDIT MODAL
        ========================================== */}

        <CustomerModal
          isOpen={isModalOpen}
          onClose={
            handleCloseCustomerModal
          }
        >
          <CustomerForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={
              handleSaveCustomer
            }
            isEditing={
              editingCustomer
            }
          />
        </CustomerModal>

        {/* ==========================================
            PURCHASE HISTORY MODAL
        ========================================== */}

        <CustomerHistoryModal
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

export default Customers;