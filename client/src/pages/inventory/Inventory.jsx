import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import InventoryTable from "../../components/inventory/InventoryTable";
import InventoryFilter from "../../components/inventory/InventoryFilter";
import InventoryModal from "../../components/inventory/InventoryModal";
import StockHistoryTable from "../../components/inventory/StockHistoryTable";


import {
  getInventory,
  getLowStockMedicines,
  getOutOfStockMedicines,
  getNearExpiryMedicines,
  getStockHistory,getExpiredMedicines
} from "../../services/inventoryService";

const Inventory = () => {
  const [loading, setLoading] = useState(true);

  const [inventory, setInventory] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stockHistory, setStockHistory] = useState([]);
  const navigate = useNavigate();

  // ==========================
  // Load Inventory
  // ==========================

  const loadInventory = async () => {
    try {
      setLoading(true);

      let response;

      switch (selectedFilter) {
        case "low-stock":
          response = await getLowStockMedicines();
          break;

        case "out-of-stock":
          response = await getOutOfStockMedicines();
          break;

        case "near-expiry":
          response = await getNearExpiryMedicines();
          break;

        case "expired":
  response =
    await getExpiredMedicines();
  break;

        default:
          response = await getInventory();
      }

      setInventory(response.inventory || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load inventory."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseStock = (medicine) => {
  navigate("/purchases", {
    state: {
      medicine,
    },
  });
};

const handleReduceStock = (medicine) => {
  navigate("/sales", {
    state: {
      medicine,
    },
  });
};



  // ==========================
  // View Stock History
  // ==========================

  const handleViewHistory = async (medicineId) => {
    try {
      const response = await getStockHistory(medicineId);

      setStockHistory(response.history || []);

      setIsModalOpen(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch stock history."
      );
    }
  };

  useEffect(() => {
    loadInventory();
  }, [selectedFilter]);

  if (loading) {
    return <Loader />;
  }

  console.log({
  handleIncreaseStock,
  handleReduceStock,
  handleViewHistory,
});

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold">
          Inventory Management
        </h1>

        <p className="text-gray-500">
          Monitor stock levels and inventory movement.
        </p>
      </div>

      {/* Filter */}

      <InventoryFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      {/* Inventory Table */}

      <InventoryTable
        inventory={inventory}   onIncreaseStock={handleIncreaseStock}
    onReduceStock={handleReduceStock}
        onViewHistory={handleViewHistory}
      />

      {/* Stock History Modal */}

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <StockHistoryTable
          history={stockHistory}
        />
      </InventoryModal>
    </div>
  );
};

export default Inventory;