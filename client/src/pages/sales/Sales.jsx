import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  // Filters
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const selectedMedicine =
    location.state?.medicine || null;

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
  // Open Billing from Inventory
  // ==========================

  useEffect(() => {
    if (selectedMedicine) {
      setFormData({
        ...initialFormData,
        medicines: [
          {
            medicine: selectedMedicine._id,
            quantity: 1,
            sellingPrice: "",
          },
        ],
      });

      setIsModalOpen(true);

      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [
    selectedMedicine,
    navigate,
    location.pathname,
  ]);

  // ==========================
  // Add Bill
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

  // ==========================
  // Filter Sales
  // ==========================

  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const searchMatch =
        sale.invoiceNumber
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        sale.customer?.customerName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const dateMatch = selectedDate
        ? new Date(sale.saleDate)
            .toISOString()
            .split("T")[0] === selectedDate
        : true;

      return searchMatch && dateMatch;
    });
  }, [sales, search, selectedDate]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
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

        <AddBillButton
          onClick={handleAddBill}
        />
      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search by Invoice or Customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      {/* Sales Table */}

      <SalesTable sales={filteredSales} />

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
          selectedMedicine={selectedMedicine}
        />
      </SalesModal>
    </div>
  );
};

export default Sales;