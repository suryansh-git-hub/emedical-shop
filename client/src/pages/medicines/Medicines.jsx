import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  RefreshCw,
  PackageSearch,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import AddMedicineButton from "../../components/medicines/AddMedicineButton";
import MedicineSearch from "../../components/medicines/MedicineSearch";
import MedicineFilters from "../../components/medicines/MedicineFilters";
import MedicineTable from "../../components/medicines/MedicineTable";
import MedicinePagination from "../../components/medicines/MedicinePagination";
import MedicineModal from "../../components/medicines/MedicineModal";
import MedicineForm from "../../components/medicines/MedicineForm";

import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} from "../../services/medicineService";

function Medicines() {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  // ==========================================
  // Modal
  // ==========================================

  const [open, setOpen] = useState(false);

  const [editingMedicine, setEditingMedicine] =
    useState(null);

  // ==========================================
  // Medicines
  // ==========================================

  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Search
  // ==========================================

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  // ==========================================
  // Filters
  // ==========================================

  const [category, setCategory] = useState("");

  const [company, setCompany] = useState("");

  // Debounced company search
  const [debouncedCompany, setDebouncedCompany] =
    useState("");

  const [expiry, setExpiry] = useState("");

  // ==========================================
  // Sorting
  // ==========================================

  const [sortBy, setSortBy] =
    useState("createdAt");

  const [order, setOrder] =
    useState("desc");

  // ==========================================
  // Pagination
  // ==========================================

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // ==========================================
  // Debouncing - Medicine Search
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // ==========================================
  // Debouncing - Company Search
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCompany(company);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [company]);

  // ==========================================
  // Fetch Medicines
  // ==========================================

  const fetchMedicines = async () => {
    try {
      setLoading(true);

      const response = await getMedicines({
        search: debouncedSearch,
        category,
        company: debouncedCompany,
        expiry,
        sortBy,
        order,
        page,
        limit: 10,
      });

      setMedicines(response.medicines || []);

      setTotalPages(
        response.totalPages || 1
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch medicines"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Fetch when filters/search/page changes
  // ==========================================

  useEffect(() => {
    fetchMedicines();
  }, [
    debouncedSearch,
    category,
    debouncedCompany,
    expiry,
    sortBy,
    order,
    page,
  ]);

  // ==========================================
  // Add / Edit Medicine
  // ==========================================

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "medicineImage") {
          if (
            data.medicineImage &&
            data.medicineImage.length > 0
          ) {
            formData.append(
              "medicineImage",
              data.medicineImage[0]
            );
          }
        } else if (
          data[key] !== undefined &&
          data[key] !== null &&
          data[key] !== ""
        ) {
          formData.append(key, data[key]);
        }
      });

      if (editingMedicine) {
        await updateMedicine(
          editingMedicine._id,
          formData
        );

        toast.success(
          "Medicine updated successfully"
        );
      } else {
        await addMedicine(formData);

        toast.success(
          "Medicine added successfully"
        );
      }

      await fetchMedicines();

      setEditingMedicine(null);
      setOpen(false);

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation failed"
      );

      return false;
    }
  };

  // ==========================================
  // Edit Medicine
  // ==========================================

  const handleEdit = (medicine) => {
    if (!isAdmin) return;

    setEditingMedicine(medicine);
    setOpen(true);
  };

  // ==========================================
  // Delete Medicine
  // ==========================================

  const handleDelete = async (id) => {
    if (!isAdmin) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMedicine(id);

      toast.success(
        "Medicine deleted successfully"
      );

      await fetchMedicines();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // ==========================================
  // Reset Filters
  // ==========================================

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");

    setCategory("");

    setCompany("");
    setDebouncedCompany("");

    setExpiry("");

    setSortBy("createdAt");
    setOrder("desc");

    setPage(1);
  };

  // ==========================================
  // Open Add Medicine
  // ==========================================

  const handleAddMedicine = () => {
    setEditingMedicine(null);
    setOpen(true);
  };

  return (
    <div className="space-y-6 pb-8">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
          </div>

          <h1
            className="
              text-2xl font-bold
              tracking-tight
              text-slate-900
              sm:text-3xl
              dark:text-white
            "
          >
            Medicines
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
              sm:text-base
              dark:text-slate-400
            "
          >
            Manage medicines, stock, pricing and
            expiry details.
          </p>
        </div>

        {isAdmin && (
          <AddMedicineButton
            onClick={handleAddMedicine}
          />
        )}

      </div>

      {/* ==========================================
          SEARCH & FILTERS
      ========================================== */}

      <div
        className="
          rounded-2xl
          border border-slate-200
          bg-white
          p-5
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-none
        "
      >

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2
              className="
                text-base font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Find Medicines
            </h2>

            <p
              className="
                mt-1 text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Search and filter your medicine inventory.
            </p>
          </div>

          {/* Desktop Reset */}

          <button
            type="button"
            onClick={handleResetFilters}
            className="
              hidden
              items-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2
              text-sm
              font-medium
              text-slate-600
              transition
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              sm:flex
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:border-slate-600
              dark:hover:bg-slate-700
              dark:hover:text-blue-400
            "
          >
            <RefreshCw size={15} />
            Reset
          </button>

        </div>

        <div className="space-y-4">

          {/* Search */}

          <MedicineSearch
            search={search}
            setSearch={setSearch}
            setPage={setPage}
          />

          {/* Filters */}

          <MedicineFilters
            category={category}
            setCategory={setCategory}
            company={company}
            setCompany={setCompany}
            expiry={expiry}
            setExpiry={setExpiry}
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
            setPage={setPage}
          />

          {/* Mobile Reset */}

          <button
            type="button"
            onClick={handleResetFilters}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2
              text-sm
              font-medium
              text-slate-600
              transition
              hover:bg-slate-50
              sm:hidden
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:bg-slate-700
            "
          >
            <RefreshCw size={15} />
            Reset Filters
          </button>

        </div>

        {/* Debounce indicator */}

        {search !== debouncedSearch && (
          <div
            className="
              mt-3
              flex
              items-center
              gap-2
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            <RefreshCw
              size={13}
              className="animate-spin"
            />

            Searching...
          </div>
        )}

        {/* Company Debounce Indicator */}

        {company !== debouncedCompany && (
          <div
            className="
              mt-2
              flex
              items-center
              gap-2
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            <RefreshCw
              size={13}
              className="animate-spin"
            />

            Searching company...
          </div>
        )}

      </div>

      {/* ==========================================
          MEDICINE INVENTORY
      ========================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-none
        "
      >

        {/* Table Header */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-slate-200
            px-5
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-slate-700
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-slate-100
                dark:bg-slate-800
              "
            >
              <PackageSearch
                size={20}
                className="
                  text-slate-600
                  dark:text-slate-300
                "
              />
            </div>

            <div>
              <h2
                className="
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                Medicine Inventory
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {loading
                  ? "Loading medicines..."
                  : `${medicines.length} medicines displayed`}
              </p>
            </div>

          </div>

          {!loading && (
            <div
              className="
                w-fit
                rounded-full
                bg-blue-50
                px-3
                py-1.5
                text-xs
                font-semibold
                text-blue-600
                dark:bg-blue-950/60
                dark:text-blue-400
              "
            >
              Page {page} of {totalPages}
            </div>
          )}

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <MedicineTable
            medicines={medicines}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={isAdmin}
          />

        </div>

        {/* Pagination */}

        {!loading && medicines.length > 0 && (
          <div
            className="
              border-t
              border-slate-200
              px-5
              py-4
              dark:border-slate-700
            "
          >
            <MedicinePagination
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        )}

      </div>

      {/* ==========================================
          ADD / EDIT MEDICINE MODAL
      ========================================== */}

      {isAdmin && (
        <MedicineModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setEditingMedicine(null);
          }}
          title={
            editingMedicine
              ? "Edit Medicine"
              : "Add Medicine"
          }
        >
          <MedicineForm
            onSubmit={handleSubmit}
            defaultValues={editingMedicine}
          />
        </MedicineModal>
      )}

    </div>
  );
}

export default Medicines;