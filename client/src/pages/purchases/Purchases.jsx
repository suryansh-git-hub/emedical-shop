import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
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

const Purchases = () => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const location = useLocation();
  const navigate = useNavigate();

  const selectedMedicine = location.state?.medicine || null;

  // =============================
  // Fetch Purchases
  // =============================

  const fetchPurchases = async () => {
    try {
      const response = await getPurchases();
      setPurchases(response.purchases || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch purchases."
      );
    }
  };

  // =============================
  // Fetch Suppliers
  // =============================

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.suppliers || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch suppliers."
      );
    }
  };

  // =============================
  // Fetch Medicines
  // =============================

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

  // =============================
  // Initial Load
  // =============================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await Promise.all([
          fetchPurchases(),
          fetchSuppliers(),
          fetchMedicines(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // =============================
  // Open Purchase from Inventory
  // =============================

  useEffect(() => {
    if (selectedMedicine) {
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
    }
  }, [
    selectedMedicine,
    navigate,
    location.pathname,
  ]);

  // =============================
  // Open Modal
  // =============================

  const handleAddPurchase = () => {
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  // =============================
  // Save Purchase
  // =============================

  const handleSavePurchase = async (e) => {
    e.preventDefault();

    try {
      const response = await addPurchase(formData);

      toast.success(response.message);

      setIsModalOpen(false);

      setFormData(initialFormData);

      fetchPurchases();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create purchase."
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
            Purchase Management
          </h1>

          <p className="text-gray-500">
            Manage medicine purchases
          </p>
        </div>

        <AddPurchaseButton
          onClick={handleAddPurchase}
        />

      </div>

      {/* Purchase Table */}

      <PurchaseTable purchases={purchases} />

      {/* Purchase Modal */}

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData(initialFormData);
        }}
      >
        <PurchaseForm
          formData={formData}
          setFormData={setFormData}
          suppliers={suppliers}
          medicines={medicines}
          onSubmit={handleSavePurchase}
          selectedMedicine={selectedMedicine}
        />
      </PurchaseModal>

    </div>
  );
};

export default Purchases;