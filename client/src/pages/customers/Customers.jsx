import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import AddCustomerButton from "../../components/customers/AddCustomerButton";
import CustomerForm from "../../components/customers/CustomerForm";
import CustomerModal from "../../components/customers/CustomerModal";
import CustomerTable from "../../components/customers/CustomerTable";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerService";

const initialFormData = {
  customerName: "",
  contactNumber: "",
  email: "",
  address: "",
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  // =============================
  // Fetch Customers
  // =============================

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response = await getCustomers();

      setCustomers(response.customers || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch customers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // =============================
  // Add Customer
  // =============================

  const handleAddCustomer = () => {
    setEditingCustomer(null);

    setFormData(initialFormData);

    setIsModalOpen(true);
  };

  // =============================
  // Edit Customer
  // =============================

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);

    setFormData({
      customerName: customer.customerName,
      contactNumber: customer.contactNumber,
      email: customer.email,
      address: customer.address,
    });

    setIsModalOpen(true);
  };

  // =============================
  // Delete Customer
  // =============================

  const handleDeleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteCustomer(id);

      toast.success(response.message);

      fetchCustomers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete customer"
      );
    }
  };

  // =============================
  // Save Customer
  // =============================

  const handleSaveCustomer = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingCustomer) {
        response = await updateCustomer(
          editingCustomer._id,
          formData
        );
      } else {
        response = await addCustomer(formData);
      }

      toast.success(response.message);

      setIsModalOpen(false);

      setEditingCustomer(null);

      setFormData(initialFormData);

      fetchCustomers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Customer Management
          </h1>

          <p className="text-gray-500">
            Manage all customers
          </p>

        </div>

        <AddCustomerButton
          onClick={handleAddCustomer}
        />

      </div>

      {/* Table */}

      <CustomerTable
        customers={customers}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />

      {/* Modal */}

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);

          setEditingCustomer(null);

          setFormData(initialFormData);
        }}
      >
        <CustomerForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSaveCustomer}
          isEditing={editingCustomer}
        />
      </CustomerModal>

    </div>
  );
};

export default Customers;