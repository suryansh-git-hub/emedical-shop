import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import SalesForm from "../../components/sales/SalesForm";
import SalesModal from "../../components/sales/SalesModal";
import SalesTable from "../../components/sales/SalesTable";
import AddBillButton from "../../components/sales/AddBillButton";
import {
  getSales,
  getCustomers,
  getMedicines,
  addSale,
} from "../../services/saleService";

const initialFormData = {
  customer: "",
  invoiceNumber: "",
  saleDate: new Date().toISOString().split("T")[0],

  medicines: [
    {
      medicine: "",
      quantity: 1,
      sellingPrice: "",
    },
  ],
};

const Sales = () => {
  const [loading, setLoading] = useState(true);

  const [sales, setSales] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [medicines, setMedicines] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  // ==========================
  // Fetch Sales
  // ==========================

  const fetchSales = async () => {
    try {
      const response = await getSales();

      setSales(response.sales || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch sales."
      );
    }
  };

  // ==========================
  // Fetch Customers
  // ==========================

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();

      setCustomers(response.customers || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch customers."
      );
    }
  };

  // ==========================
  // Fetch Medicines
  // ==========================

  const fetchMedicines = async () => {
    try {
      const response = await getMedicines();

      setMedicines(response.medicines || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch medicines."
      );
    }
  };

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await Promise.all([
          fetchSales(),
          fetchCustomers(),
          fetchMedicines(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ==========================
  // Open Modal
  // ==========================

  const handleAddBill = () => {
    setFormData(initialFormData);

    setIsModalOpen(true);
  };

  // ==========================
  // Save Bill
  // ==========================

  const handleSaveBill = async (e) => {
    e.preventDefault();

    try {
      const response = await addSale(formData);

      toast.success(response.message);

      setIsModalOpen(false);

      setFormData(initialFormData);

      fetchSales();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create bill."
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
            Billing Management
          </h1>

          <p className="text-gray-500">
            Create and manage customer bills
          </p>
        </div>

        <AddBillButton onClick={handleAddBill} />
      </div>

      {/* Billing Table */}

      <SalesTable sales={sales} />

      {/* Billing Modal */}

      <SalesModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData(initialFormData);
        }}
      >
        <SalesForm
          formData={formData}
          setFormData={setFormData}
          customers={customers}
          medicines={medicines}
          onSubmit={handleSaveBill}
        />
      </SalesModal>
    </div>
  );
};

export default Sales;