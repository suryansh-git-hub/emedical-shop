import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import AddSupplierButton from "../../components/suppliers/AddSupplierButton";
import SupplierModal from "../../components/suppliers/SupplierModal";
import SupplierForm from "../../components/suppliers/SupplierForm";
import SupplierTable from "../../components/suppliers/SupplierTable";
import {
  getSuppliers, addSupplier, updateSupplier,
  deleteSupplier,
} from "../../services/supplierService";

const initialFormData = {
  supplierName: "",
  contactNumber: "",
  email: "",
  address: "",
  gstNumber: "",
};

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingSupplier, setEditingSupplier] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  // =============================
  // Fetch Suppliers
  // =============================

  const fetchSuppliers = async () => {
    try {
      setLoading(true);

      const response = await getSuppliers();

      setSuppliers(response.suppliers || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch suppliers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // =============================
  // Open Add Modal
  // =============================

  const handleAddSupplier = () => {
    setEditingSupplier(null);

    setFormData(initialFormData);

    setIsModalOpen(true);
  };

  // =============================
  // Open Edit Modal
  // =============================

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);

    setFormData({
      supplierName: supplier.supplierName,
      contactNumber: supplier.contactNumber,
      email: supplier.email,
      address: supplier.address,
      gstNumber: supplier.gstNumber,
    });

    setIsModalOpen(true);
  };

  // =============================
  // Delete Supplier
  // =============================

  const handleDeleteSupplier = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteSupplier(id);

      toast.success(response.message);

      fetchSuppliers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete supplier"
      );
    }
  };

  // =============================
  // Save Supplier
  // =============================

  const handleSaveSupplier = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingSupplier) {
        response = await updateSupplier(
          editingSupplier._id,
          formData
        );
      } else {
        response = await addSupplier(formData);
      }

      toast.success(response.message);

      setIsModalOpen(false);

      setEditingSupplier(null);

      setFormData(initialFormData);

      fetchSuppliers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // =============================
  // Loading
  // =============================

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Supplier Management
          </h1>

          <p className="text-gray-500">
            Manage all suppliers
          </p>

        </div>

        <AddSupplierButton
          onClick={handleAddSupplier}
        />

      </div>

      {/* Table */}

      <SupplierTable
        suppliers={suppliers}
        onEdit={handleEditSupplier}
        onDelete={handleDeleteSupplier}
      />

      {/* Modal */}

      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);

          setEditingSupplier(null);

          setFormData(initialFormData);
        }}
      >
        <SupplierForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSaveSupplier}
          isEditing={editingSupplier}
        />
      </SupplierModal>

    </div>
  );
};

export default Suppliers;