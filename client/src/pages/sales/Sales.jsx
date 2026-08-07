import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

import CustomerSearch from "../../components/sales/CustomerSearch";
// import CustomerCard from "../../components/sales/CustomerCard";
import MedicineSearch from "../../components/sales/MedicineSearch";
import BillItemsTable from "../../components/sales/BillItemsTable";
import BillSummary from "../../components/sales/BillSummary";
// import SalesTable from "../../components/sales/SalesTable";

import {
 getCustomers,  getMedicines, addSale,
} from "../../services/saleService";

const Sales = () => {
  const navigate = useNavigate();

  // ==========================
  // Loading
  // ==========================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================
  // Master Data
  // ==========================


  const [customers, setCustomers] = useState([]);
  const [medicines, setMedicines] = useState([]);

  // ==========================
  // Billing Data
  // ==========================

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [billItems, setBillItems] =
    useState([]);

    const [paymentMethod, setPaymentMethod] = useState("Cash");
const [cashReceived, setCashReceived] = useState("");

  // ==========================
  // Fetch Sales
  // ==========================

  // const fetchSales = async () => {
  //   try {
  //     const response = await getSales();

  //     setSales(response.sales || []);
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.message ||
  //         "Failed to fetch sales."
  //     );
  //   }
  // };

  // ==========================
  // Fetch Customers
  // ==========================

  const fetchCustomers = async () => {
    try {
      const response =
        await getCustomers();

      setCustomers(
        response.customers || []
      );
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

  const fetchMedicines =
    async () => {
      try {
        const response =
          await getMedicines();

        setMedicines(
          response.medicines || []
        );
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
    const loadData =
      async () => {
        try {
          setLoading(true);

          await Promise.all([
            // fetchSales(),
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
  // Select Customer
  // ==========================

  const handleCustomerSelect = (
    customer
  ) => {
    setSelectedCustomer(customer);
  };

  // ==========================
  // Add Medicine
  // ==========================

  const handleMedicineSelect = (
    medicine
  ) => {
    const existing =
      billItems.find(
        (item) =>
          item._id === medicine._id
      );

    // Already Added

    if (existing) {
      setBillItems((prev) =>
        prev.map((item) =>
          item._id === medicine._id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );

      return;
    }

    // New Medicine

    setBillItems((prev) => [
      ...prev,
      {
        _id: medicine._id,

        medicine: medicine._id,

        medicineName:
          medicine.medicineName,

        genericName:
          medicine.genericName,

        batchNumber:
          medicine.batchNumber,

        stock:
          medicine.stock,

        quantity: 1,

        gst:
          medicine.gst || 0,

        sellingPrice:
          medicine.sellingPrice,

        purchasePrice:
          medicine.purchasePrice,
      },
    ]);
  };

  // ==========================
  // Remove Medicine
  // ==========================

  // const removeMedicine = (
  //   id
  // ) => {
  //   setBillItems((prev) =>
  //     prev.filter(
  //       (item) =>
  //         item._id !== id
  //     )
  //   );
  // };

  // ==========================
  // Clear Bill
  // ==========================

  const clearBill = () => {
    setSelectedCustomer(null);

    setBillItems([]);
     setPaymentMethod("Cash");
  setCashReceived("");
  };

    // ==========================
  // Bill Calculations
  // ==========================

  const subtotal = billItems.reduce(
    (sum, item) =>
      sum +
      item.quantity * item.sellingPrice,
    0
  );

  const gstAmount = billItems.reduce(
    (sum, item) =>
      sum +
      (item.quantity *
        item.sellingPrice *
        item.gst) /
        100,
    0
  );

const rewardDiscount = Math.min(
  selectedCustomer?.rewardPoints || 0,
  subtotal + gstAmount
);

  const grandTotal =
    subtotal +
    gstAmount -
    rewardDiscount;

  // ==========================
  // Generate Bill
  // ==========================

const handleGenerateBill = async () => {
  // ==========================
  // Customer Validation
  // ==========================

  if (!selectedCustomer) {
    return toast.error(
      "Please select a customer."
    );
  }

  // ==========================
  // Medicine Validation
  // ==========================

  if (billItems.length === 0) {
    return toast.error(
      "Please add at least one medicine."
    );
  }

  // ==========================
  // Cash Validation
  // ==========================

  if (
    paymentMethod === "Cash" &&
    Number(cashReceived) < grandTotal
  ) {
    return toast.error(
      "Cash received is less than bill amount."
    );
  }

  try {
    setSaving(true);

    // ==========================
    // Payload
    // ==========================

    const payload = {
      customer: selectedCustomer._id,

      saleDate: new Date(),

      medicines: billItems.map((item) => ({
        medicine: item.medicine,
        quantity: Number(item.quantity),
        sellingPrice: Number(item.sellingPrice),
        gst: Number(item.gst),
      })),

      // Billing

      discountType: "flat",

      discount: rewardDiscount,

      redeemPoints: rewardDiscount,

      // Payment

      paymentMethod,

    
       cashReceived:
  paymentMethod === "Cash"
    ? Number(cashReceived || 0)
    : 0,

      notes: "",
    };

    console.log(
      "========== BILL =========="
    );
    console.log(payload);

    const response = await addSale(
      payload
    );

    toast.success(response.message);

    // ==========================
    // Reset Billing Screen
    // ==========================

    clearBill();

    // ==========================
    // Go To Invoice
    // ==========================

    if (response.sale?._id) {
      navigate(
        `/sales/invoice/${response.sale._id}`
      );
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to generate bill."
    );
  } finally {
    setSaving(false);
  }
};

  // ==========================
  // Billing History
  // ==========================



  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

    return (
    <div className="space-y-8">

      {/* ==========================
          Header
      ========================== */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Billing
          </h1>

          <p className="mt-1 text-gray-500">
            Create customer invoices quickly and efficiently.
          </p>
        </div>

      </div>

      {/* ==========================
          Customer Search
      ========================== */}

      <CustomerSearch
        customers={customers}
        selectedCustomer={selectedCustomer}
        onSelectCustomer={handleCustomerSelect}
      />


      {/* ==========================
          Medicine Search
      ========================== */}

      <MedicineSearch
        medicines={medicines}
        onSelectMedicine={handleMedicineSelect}
      />

      {/* ==========================
          Selected Medicines
      ========================== */}

      <BillItemsTable
        items={billItems}
        setItems={setBillItems}
      />

      {/* ==========================
          Billing Summary + Generate
      ========================== */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Summary */}

        <div className="lg:col-span-2">

          <BillSummary
            items={billItems}
            customer={selectedCustomer}
             paymentMethod={paymentMethod}
  setPaymentMethod={setPaymentMethod}
  cashReceived={cashReceived}
  setCashReceived={setCashReceived}
          />

        </div>

        {/* Generate Bill */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-semibold">
            Actions
          </h2>

          <button
            onClick={handleGenerateBill}
            disabled={
              saving ||
              !selectedCustomer ||
              billItems.length === 0
            }
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Generating..."
              : "Generate Bill"}
          </button>

          <button
            onClick={clearBill}
            disabled={saving}
            className="mt-4 w-full rounded-lg border border-red-500 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
          >
            Clear Bill
          </button>

        </div>

      </div>

      {/* ==========================
          Billing History
      ========================== */}
{/* 
      <div className="rounded-xl bg-white shadow">

        <div className="border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            Recent Bills
          </h2>

          <p className="text-sm text-gray-500">
            Recently generated invoices.
          </p>

        </div>

        <SalesTable
          sales={latestSales}
        />

      </div> */}

            {/* ==========================
          End Page
      ========================== */}

    </div>
  );
};

export default Sales;