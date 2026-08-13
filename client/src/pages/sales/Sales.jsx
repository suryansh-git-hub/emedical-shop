import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Loader,
  Receipt,
  UserRound,
  ShoppingCart,
  RotateCcw,
} from "lucide-react";

import CustomerSearch from "../../components/sales/CustomerSearch";
import MedicineSearch from "../../components/sales/MedicineSearch";
import BillItemsTable from "../../components/sales/BillItemsTable";
import BillSummary from "../../components/sales/BillSummary";

import {
  getCustomers,
  getMedicines,
  addSale,
} from "../../services/saleService";

const Sales = () => {
  const navigate = useNavigate();

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // Master Data
  // ==========================================

  const [customers, setCustomers] = useState([]);
  const [medicines, setMedicines] = useState([]);

  // ==========================================
  // Search
  // ==========================================

  const [customerSearch, setCustomerSearch] =
    useState("");

  const [medicineSearch, setMedicineSearch] =
    useState("");

  const [
    debouncedCustomerSearch,
    setDebouncedCustomerSearch,
  ] = useState("");

  const [
    debouncedMedicineSearch,
    setDebouncedMedicineSearch,
  ] = useState("");

  // ==========================================
  // Billing Data
  // ==========================================

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [billItems, setBillItems] = useState([]);

  // ==========================================
  // Reward Points
  // ==========================================

  const [
    redeemRewardPoints,
    setRedeemRewardPoints,
  ] = useState(false);

  // ==========================================
  // Payment
  // ==========================================

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const [cashReceived, setCashReceived] =
    useState("");

  // ==========================================
  // Fetch Customers
  // ==========================================

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

  // ==========================================
  // Fetch Medicines
  // ==========================================

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

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await Promise.all([
          fetchCustomers(),
          fetchMedicines(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ==========================================
  // CUSTOMER SEARCH DEBOUNCING
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCustomerSearch(
        customerSearch.trim()
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [customerSearch]);

  // ==========================================
  // MEDICINE SEARCH DEBOUNCING
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMedicineSearch(
        medicineSearch.trim()
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [medicineSearch]);

  // ==========================================
  // Filter Customers
  // ==========================================

  const filteredCustomers = customers.filter(
    (customer) => {
      if (!debouncedCustomerSearch) {
        return true;
      }

      const search =
        debouncedCustomerSearch.toLowerCase();

      return (
        customer.customerName
          ?.toLowerCase()
          .includes(search) ||
        customer.email
          ?.toLowerCase()
          .includes(search) ||
        customer.phone
          ?.toLowerCase()
          .includes(search)
      );
    }
  );

  // ==========================================
  // Filter Medicines
  // ==========================================

  const filteredMedicines = medicines.filter(
    (medicine) => {
      if (!debouncedMedicineSearch) {
        return true;
      }

      const search =
        debouncedMedicineSearch.toLowerCase();

      return (
        medicine.medicineName
          ?.toLowerCase()
          .includes(search) ||
        medicine.genericName
          ?.toLowerCase()
          .includes(search) ||
        medicine.batchNumber
          ?.toLowerCase()
          .includes(search)
      );
    }
  );

  // ==========================================
  // Select Customer
  // ==========================================

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);

    setRedeemRewardPoints(false);
  };

  // ==========================================
  // Add Medicine
  // ==========================================

  const handleMedicineSelect = (medicine) => {
    const existing = billItems.find(
      (item) => item._id === medicine._id
    );

    // ========================================
    // Already Added
    // ========================================

    if (existing) {
      if (
        existing.quantity >=
        Number(existing.stock)
      ) {
        toast.error(
          "Cannot add more than available stock."
        );

        return;
      }

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

    // ========================================
    // Out Of Stock
    // ========================================

    if (Number(medicine.stock) <= 0) {
      toast.error(
        "This medicine is out of stock."
      );

      return;
    }

    // ========================================
    // Add New Medicine
    // ========================================

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

  // ==========================================
  // Clear Bill
  // ==========================================

  const clearBill = () => {
    setSelectedCustomer(null);

    setBillItems([]);

    setPaymentMethod("Cash");

    setCashReceived("");

    setRedeemRewardPoints(false);

    setCustomerSearch("");

    setMedicineSearch("");

    setDebouncedCustomerSearch("");

    setDebouncedMedicineSearch("");
  };

  // ==========================================
  // Bill Calculations
  // ==========================================

  const subtotal = billItems.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity) *
        Number(item.sellingPrice),
    0
  );

  const gstAmount = billItems.reduce(
    (sum, item) =>
      sum +
      (Number(item.quantity) *
        Number(item.sellingPrice) *
        Number(item.gst || 0)) /
        100,
    0
  );

  // ==========================================
  // Reward Points
  // ==========================================

  const availableRewardPoints = Number(
    selectedCustomer?.rewardPoints || 0
  );

  const maximumRewardDiscount = Math.min(
    availableRewardPoints,
    subtotal + gstAmount
  );

  const rewardDiscount = redeemRewardPoints
    ? maximumRewardDiscount
    : 0;

  // ==========================================
  // Grand Total
  // ==========================================

  const grandTotal = Math.max(
    0,
    subtotal +
      gstAmount -
      rewardDiscount
  );

  // ==========================================
  // Generate Bill
  // ==========================================

  const handleGenerateBill = async () => {
    // ========================================
    // Customer Validation
    // ========================================

    if (!selectedCustomer) {
      return toast.error(
        "Please select a customer."
      );
    }

    // ========================================
    // Medicine Validation
    // ========================================

    if (billItems.length === 0) {
      return toast.error(
        "Please add at least one medicine."
      );
    }

    // ========================================
    // Reward Validation
    // ========================================

    if (
      redeemRewardPoints &&
      availableRewardPoints <= 0
    ) {
      return toast.error(
        "This customer does not have reward points."
      );
    }

    // ========================================
    // Cash Validation
    // ========================================

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

      const payload = {
        customer:
          selectedCustomer._id,

        saleDate: new Date(),

        medicines: billItems.map(
          (item) => ({
            medicine: item.medicine,

            quantity:
              Number(item.quantity),

            sellingPrice:
              Number(item.sellingPrice),

            gst:
              Number(item.gst || 0),
          })
        ),

        discountType: "flat",

        discount: rewardDiscount,

        redeemPoints: rewardDiscount,

        paymentMethod,

        cashReceived:
          paymentMethod === "Cash"
            ? Number(
                cashReceived || 0
              )
            : 0,

        notes: "",
      };

      console.log(
        "========== BILL =========="
      );

      console.log(payload);

      const response =
        await addSale(payload);

      toast.success(
        response.message ||
          "Bill generated successfully."
      );

      clearBill();

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

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="
        flex
        min-h-[60vh]
        flex-col
        items-center
        justify-center
        bg-transparent
      ">

        <div className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-blue-50

          dark:bg-blue-950/50
        ">

          <Loader
            className="
              animate-spin
              text-blue-600
              dark:text-blue-400
            "
            size={26}
          />

        </div>

        <p className="
          mt-4
          font-semibold
          text-slate-700
          dark:text-slate-300
        ">
          Loading billing...
        </p>

        <p className="
          mt-1
          text-sm
          text-slate-400
          dark:text-slate-500
        ">
          Preparing customers and medicines.
        </p>

      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="
      mx-auto
      max-w-[1500px]
      space-y-6
      pb-10
    ">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-black/20
      ">

        <div className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          {/* Header Title */}

          <div className="flex items-center gap-4">

            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-blue-50

              dark:bg-blue-950/50
            ">

              <Receipt
                size={24}
                className="
                  text-blue-600
                  dark:text-blue-400
                "
              />

            </div>

            <div>

              <p className="
                text-sm
                font-semibold
                text-blue-600
                dark:text-blue-400
              ">
                Point of Sale
              </p>

              <h1 className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900

                dark:text-slate-100
              ">
                Billing
              </h1>

              <p className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              ">
                Create a customer invoice quickly
                and securely.
              </p>

            </div>

          </div>

          {/* Reset */}

          <button
            type="button"
            onClick={clearBill}
            disabled={saving}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition

              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:border-red-900
              dark:hover:bg-red-950/40
              dark:hover:text-red-400

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <RotateCcw size={16} />

            Reset Bill

          </button>

        </div>

      </div>

      {/* ======================================
          CUSTOMER + MEDICINE SEARCH
      ====================================== */}

      <div className="
        grid
        gap-6
        lg:grid-cols-2
      ">

        {/* Customer */}

        <div className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm

          dark:border-slate-800
          dark:bg-slate-900
          dark:shadow-black/20
        ">

          <div className="
            mb-4
            flex
            items-center
            gap-3
          ">

            <div className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-blue-50

              dark:bg-blue-950/50
            ">

              <UserRound
                size={19}
                className="
                  text-blue-600
                  dark:text-blue-400
                "
              />

            </div>

            <div>

              <h2 className="
                font-semibold
                text-slate-900
                dark:text-slate-100
              ">
                Customer
              </h2>

              <p className="
                text-xs
                text-slate-500
                dark:text-slate-400
              ">
                Select the customer for this invoice.
              </p>

            </div>

          </div>

          <CustomerSearch
            customers={filteredCustomers}
            selectedCustomer={selectedCustomer}
            onSelectCustomer={
              handleCustomerSelect
            }
            search={customerSearch}
            setSearch={setCustomerSearch}
          />

          {customerSearch !==
            debouncedCustomerSearch && (
            <p className="
              mt-2
              text-xs
              text-slate-400
              dark:text-slate-500
            ">
              Searching customers...
            </p>
          )}

        </div>

        {/* Medicine */}

        <div className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm

          dark:border-slate-800
          dark:bg-slate-900
          dark:shadow-black/20
        ">

          <div className="
            mb-4
            flex
            items-center
            gap-3
          ">

            <div className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-emerald-50

              dark:bg-emerald-950/50
            ">

              <ShoppingCart
                size={19}
                className="
                  text-emerald-600
                  dark:text-emerald-400
                "
              />

            </div>

            <div>

              <h2 className="
                font-semibold
                text-slate-900
                dark:text-slate-100
              ">
                Add Medicines
              </h2>

              <p className="
                text-xs
                text-slate-500
                dark:text-slate-400
              ">
                Search by name, generic or batch number.
              </p>

            </div>

          </div>

          <MedicineSearch
            medicines={filteredMedicines}
            onSelectMedicine={
              handleMedicineSelect
            }
            search={medicineSearch}
            setSearch={setMedicineSearch}
          />

          {medicineSearch !==
            debouncedMedicineSearch && (
            <p className="
              mt-2
              text-xs
              text-slate-400
              dark:text-slate-500
            ">
              Searching medicines...
            </p>
          )}

        </div>

      </div>

      {/* ======================================
          SELECTED MEDICINES
      ====================================== */}

      <div className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-black/20
      ">

        <div className="
          border-b
          border-slate-200
          px-5
          py-4

          dark:border-slate-800
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <h2 className="
                font-semibold
                text-slate-900
                dark:text-slate-100
              ">
                Current Bill
              </h2>

              <p className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              ">
                {billItems.length}{" "}
                {billItems.length === 1
                  ? "medicine"
                  : "medicines"}{" "}
                added
              </p>

            </div>

            {billItems.length > 0 && (
              <span className="
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-600

                dark:bg-blue-950/50
                dark:text-blue-400
              ">
                {billItems.reduce(
                  (sum, item) =>
                    sum +
                    Number(
                      item.quantity
                    ),
                  0
                )}{" "}
                units
              </span>
            )}

          </div>

        </div>

        <div className="overflow-x-auto">

          <BillItemsTable
            items={billItems}
            setItems={setBillItems}
          />

        </div>

      </div>

      {/* ======================================
          BILL SUMMARY
      ====================================== */}

      <BillSummary
        items={billItems}
        customer={selectedCustomer}
        redeemRewardPoints={
          redeemRewardPoints
        }
        setRedeemRewardPoints={
          setRedeemRewardPoints
        }
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cashReceived={cashReceived}
        setCashReceived={setCashReceived}
        onGenerateBill={
          handleGenerateBill
        }
        onClearBill={clearBill}
        saving={saving}
      />

    </div>
  );
};

export default Sales;