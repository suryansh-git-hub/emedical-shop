import { useEffect, useState } from "react";
import {
  Pill,
  Truck,
  Users,
  IndianRupee,
  TriangleAlert,
  RefreshCw,
  PackageSearch,
  Package,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/dashboardServices";

import StatCard from "../../components/common/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import LowStockTable from "../../components/dashboard/LowStockTable";
import RecentSales from "../../components/dashboard/RecentSales";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import SalesOverview from "../../components/dashboard/SalesOverview";
import RecentPurchases from "../../components/dashboard/RecentPurchases";
import TopSellingMedicines from "../../components/dashboard/TopSellingMedicines";
import ExpiringMedicines from "../../components/dashboard/ExpiringMedicines";
import CategorySalesChart from "../../components/dashboard/CategorySalesChart";

function Dashboard() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ==========================================
  // Fetch Dashboard
  // ==========================================

  const fetchDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await getDashboardStats();

      setDashboard(response);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ==========================================
  // Loading Screen
  // ==========================================

  if (loading || !dashboard) {
    return (
      <div
        className="
          flex min-h-[70vh]
          items-center justify-center
          bg-[#f5f7fb]
          dark:bg-slate-950
        "
      >
        <div className="flex flex-col items-center">

          <div
            className="
              mb-4 flex h-12 w-12
              items-center justify-center
              rounded-full
              bg-blue-50
              dark:bg-blue-950
            "
          >
            <RefreshCw
              size={24}
              className="
                animate-spin
                text-blue-600
                dark:text-blue-400
              "
            />
          </div>

          <p
            className="
              text-sm font-medium
              text-slate-600
              dark:text-slate-300
            "
          >
            Loading dashboard...
          </p>

          <p
            className="
              mt-1 text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            Fetching the latest shop information
          </p>

        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-full
        space-y-6
        pb-8
        transition-colors
        dark:text-slate-100
      "
    >

      {/* =====================================================
          Page Heading
      ===================================================== */}

      <div
        className="
          flex flex-col gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >

        <div>

          <h1
            className="
              text-2xl font-bold
              tracking-tight
              text-slate-900
              sm:text-3xl
              dark:text-white
            "
          >
            Dashboard
          </h1>

        </div>

        {/* Refresh */}

        <button
          type="button"
          onClick={() => fetchDashboard(true)}
          disabled={refreshing}
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-lg
            border
            border-slate-200
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            shadow-sm
            transition

            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600

            disabled:cursor-not-allowed
            disabled:opacity-60

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300

            dark:hover:border-blue-700
            dark:hover:bg-slate-800
            dark:hover:text-blue-400
          "
        >
          <RefreshCw
            size={16}
            className={
              refreshing ? "animate-spin" : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>

      </div>

      {/* =====================================================
          Welcome Banner
      ===================================================== */}

      <WelcomeBanner />

      {/* =====================================================
          Statistics
      ===================================================== */}

      <section>

        <div className="mb-4">

          <h2
            className="
              text-lg font-semibold
              text-slate-900
              dark:text-white
            "
          >
            Business Overview
          </h2>

          <p
            className="
              mt-1 text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            A quick look at your medical shop's current status.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {/* =====================================================
              Medicines
          ===================================================== */}

          <StatCard
            title="Medicines"
            value={dashboard.totalMedicines}
            subtitle="In your catalog"
            icon={
              <Pill
                size={24}
                className="text-white"
              />
            }
            color="bg-blue-500"
            onClick={() => navigate("/medicines")}
          />

          {/* =====================================================
              Suppliers
          ===================================================== */}

          {isAdmin && (
            <StatCard
              title="Suppliers"
              value={dashboard.totalSuppliers}
              subtitle="Active suppliers"
              icon={
                <Truck
                  size={24}
                  className="text-white"
                />
              }
              color="bg-emerald-500"
              onClick={() => navigate("/suppliers")}
            />
          )}

          {/* =====================================================
              Customers
          ===================================================== */}

          <StatCard
            title="Customers"
            value={dashboard.totalCustomers}
            subtitle="Registered customers"
            icon={
              <Users
                size={24}
                className="text-white"
              />
            }
            color="bg-orange-500"
            onClick={() => navigate("/customers")}
          />

          {/* =====================================================
              Today's Sales
          ===================================================== */}

          <StatCard
            title="Today's Sales"
            value={`₹${Number(
              dashboard.todaySales || 0
            ).toLocaleString("en-IN")}`}
            subtitle="Revenue today"
            icon={
              <IndianRupee
                size={24}
                className="text-white"
              />
            }
            color="bg-violet-500"
            onClick={() => navigate("/reports")}
          />

          {/* =====================================================
              Monthly Revenue
          ===================================================== */}

          <StatCard
            title="Monthly Revenue"
            value={`₹${Number(
              dashboard.monthlyRevenue || 0
            ).toLocaleString("en-IN")}`}
            subtitle="This calendar month"
            icon={
              <IndianRupee
                size={24}
                className="text-white"
              />
            }
            color="bg-cyan-500"
            onClick={() => navigate("/reports")}
          />

          
          {/* =====================================================
              Total Stock Units
          ===================================================== */}

          <StatCard
            title="Total Stock Units"
            value={dashboard.totalStock || 0}
            subtitle="Units currently in inventory"
            icon={
              <Package
                size={24}
                className="text-white"
              />
            }
            color="bg-purple-500"
            onClick={() => navigate("/inventory")}
          />

          {/* =====================================================
              Expired Medicines
          ===================================================== */}

          <StatCard
            title="Expired Medicines"
            value={
              dashboard.expiredMedicines?.length || 0
            }
            subtitle="Past expiry date"
            icon={
              <TriangleAlert
                size={24}
                className="text-white"
              />
            }
            color="bg-red-500"
            onClick={() => navigate("/inventory")}
          />

          {/* =====================================================
              Low Stock
          ===================================================== */}

          <StatCard
            title="Low Stock"
            value={
              dashboard.lowStockMedicines?.length || 0
            }
            subtitle="Medicines need restocking"
            icon={
              <PackageSearch
                size={24}
                className="text-white"
              />
            }
            color="bg-amber-500"
            onClick={() => navigate("/inventory")}
          />


        </div>

      </section>

      {/* =====================================================
          Quick Actions
      ===================================================== */}

      <QuickActions isAdmin={isAdmin} />

      {/* =====================================================
          Inventory Alerts + Recent Sales
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        "
      >

        <CategorySalesChart
          data={
            dashboard.categorySales || []
          }
        />

        <TopSellingMedicines
          medicines={
            dashboard.topSellingMedicines || []
          }
        />

      </section>

      {/* =====================================================
          Sales Overview
      ===================================================== */}

      <section>
        <SalesOverview
          data={
            dashboard.monthlySales || []
          }
        />
      </section>

      {/* =====================================================
          Sales Analysis
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        "
      >

        <LowStockTable
          medicines={
            dashboard.lowStockMedicines || []
          }
        />

        {isAdmin && (
          <RecentPurchases
            purchases={
              dashboard.recentPurchases || []
            }
          />
        )}

      </section>

      {/* =====================================================
          Products Performance
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        "
      >

        <RecentSales
          sales={
            dashboard.recentSales || []
          }
        />

        <ExpiringMedicines
          medicines={
            dashboard.expiringMedicines || []
          }
        />

      </section>

    </div>
  );
}

export default Dashboard;