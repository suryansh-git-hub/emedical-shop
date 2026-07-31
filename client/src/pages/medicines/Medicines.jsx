import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
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
  const [open, setOpen] = useState(false);

  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingMedicine, setEditingMedicine] =
    useState(null);

  // ==========================
  // Search
  // ==========================

  const [search, setSearch] = useState("");

  // ==========================
  // Filters
  // ==========================

  const [category, setCategory] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  // ==========================
  // Sorting
  // ==========================

  const [sortBy, setSortBy] =
    useState("createdAt");

  const [order, setOrder] =
    useState("desc");

  // ==========================
  // Pagination
  // ==========================

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // ==========================
  // Fetch Medicines
  // ==========================

  const fetchMedicines = async () => {
    try {
      setLoading(true);

      const response = await getMedicines({
        search,
        category,
        company,
        expiry,
        sortBy,
        order,
        page,
        limit: 10,
      });

      setMedicines(response.medicines);

      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch medicines"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [
    search,category,company,expiry,sortBy,order, page,
  ]);

  // ==========================
  // Add / Edit Medicine
  // ==========================

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

  // ==========================
  // Edit
  // ==========================

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);

    setOpen(true);
  };

  // ==========================
  // Delete
  // ==========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMedicine(id);

      toast.success(
        "Medicine deleted successfully"
      );

      fetchMedicines();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Medicine Management"
        subtitle="Manage all medicines in your inventory"
      />

      {/* Add Medicine Button */}
      <div className="flex justify-end">
        <AddMedicineButton
          onClick={() => {
            setEditingMedicine(null);
            setOpen(true);
          }}
        />
      </div>

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

      {/* Medicine Table */}
      <MedicineTable
        medicines={medicines}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <MedicinePagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />

      {/* Add / Edit Medicine Modal */}
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
    </div>
  );
}

export default Medicines;