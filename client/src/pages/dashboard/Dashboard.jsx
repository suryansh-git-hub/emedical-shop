import { useEffect, useState } from "react";
import {
  Pill,
  Truck,
  Users,
  IndianRupee,
  TriangleAlert,
  RefreshCw,
} from "lucide-react";
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
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <RefreshCw
              size={24}
              className="animate-spin text-blue-600"
            />
          </div>

          <p className="text-sm font-medium text-slate-600">
            Loading dashboard...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Fetching the latest shop information
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">

      {/* =====================================================
          Page Heading
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Welcome back, {user?.name || "Admin"}. Here's what's
            happening in your medical shop.
          </p>
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
          "
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />

          {refreshing ? "Refreshing..." : "Refresh"}
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
          <h2 className="text-lg font-semibold text-slate-900">
            Business Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
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

          <StatCard
            title="Medicines"
            value={dashboard.totalMedicines}
            icon={
              <Pill
                size={24}
                className="text-white"
              />
            }
            color="bg-blue-500"
          />

          {isAdmin && (
            <StatCard
              title="Suppliers"
              value={dashboard.totalSuppliers}
              icon={
                <Truck
                  size={24}
                  className="text-white"
                />
              }
              color="bg-emerald-500"
            />
          )}

          <StatCard
            title="Customers"
            value={dashboard.totalCustomers}
            icon={
              <Users
                size={24}
                className="text-white"
              />
            }
            color="bg-orange-500"
          />

          <StatCard
            title="Today's Sales"
            value={`₹${Number(
              dashboard.todaySales || 0
            ).toLocaleString("en-IN")}`}
            icon={
              <IndianRupee
                size={24}
                className="text-white"
              />
            }
            color="bg-violet-500"
          />

          <StatCard
            title="Monthly Revenue"
            value={`₹${Number(
              dashboard.monthlyRevenue || 0
            ).toLocaleString("en-IN")}`}
            icon={
              <IndianRupee
                size={24}
                className="text-white"
              />
            }
            color="bg-cyan-500"
          />

          <StatCard
            title="Expired Medicines"
            value={dashboard.expiredMedicines?.length || 0}
            icon={
              <TriangleAlert
                size={24}
                className="text-white"
              />
            }
            color="bg-red-500"
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

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <LowStockTable
          medicines={dashboard.lowStockMedicines || []}
        />

        <RecentSales
          sales={dashboard.recentSales || []}
        />

      </section>

      {/* =====================================================
          Sales Overview
      ===================================================== */}

      <section>
        <SalesOverview
          data={dashboard.monthlySales || []}
        />
      </section>

      {/* =====================================================
          Sales Analysis
      ===================================================== */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <CategorySalesChart
          data={dashboard.categorySales || []}
        />

        {isAdmin && (
          <RecentPurchases
            purchases={dashboard.recentPurchases || []}
          />
        )}

      </section>

      {/* =====================================================
          Products Performance
      ===================================================== */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <TopSellingMedicines
          medicines={
            dashboard.topSellingMedicines || []
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