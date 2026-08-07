import { useEffect, useState } from "react";
import {
  Pill,
  Truck,
  Users,
  IndianRupee,
  TriangleAlert,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/dashboardServices";
import PageHeader from "../../components/common/PageHeader";
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

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboardStats();

      setDashboard(response);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading || !dashboard) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to Medical Shop Management System"
      />

      <WelcomeBanner />

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Medicines"
          value={dashboard.totalMedicines}
          icon={
            <Pill
              size={28}
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
                size={28}
                className="text-white"
              />
            }
            color="bg-green-500"
          />
        )}

        <StatCard
          title="Customers"
          value={dashboard.totalCustomers}
          icon={
            <Users
              size={28}
              className="text-white"
            />
          }
          color="bg-orange-500"
        />

        <StatCard
          title="Today's Sales"
          value={`₹${dashboard.todaySales.toLocaleString()}`}
          icon={
            <IndianRupee
              size={28}
              className="text-white"
            />
          }
          color="bg-purple-500"
        />

        <StatCard
          title="Monthly Revenue"
          value={`₹${dashboard.monthlyRevenue.toLocaleString()}`}
          icon={
            <IndianRupee
              size={28}
              className="text-white"
            />
          }
          color="bg-emerald-500"
        />

        <StatCard
          title="Expired Medicines"
          value={dashboard.expiredMedicines.length}
          icon={
            <TriangleAlert
              size={28}
              className="text-white"
            />
          }
          color="bg-red-500"
        />
      </div>

      {/* Quick Actions */}

      <QuickActions isAdmin={isAdmin} />

      {/* Low Stock */}

      <div className="mt-8">
        <LowStockTable
          medicines={dashboard.lowStockMedicines}
        />
      </div>

      {/* Recent Sales */}

      <div className="mt-8">
        <RecentSales
          sales={dashboard.recentSales}
        />
      </div>

      {/* Monthly Sales */}

      <div className="mt-8">
        <SalesOverview
          data={dashboard.monthlySales}
        />
      </div>

      {/* Category-wise Sales */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <CategorySalesChart
          data={dashboard.categorySales}
        />

         {isAdmin && (
          <RecentPurchases
            purchases={dashboard.recentPurchases}
          />
        )}
      </div>

      {/* Purchases & Top Selling */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
       

        <TopSellingMedicines
          medicines={
            dashboard.topSellingMedicines
          }
        />

         <ExpiringMedicines
          medicines={
            dashboard.expiringMedicines
          }
        />
      </div>

      {/* Expiring Medicines */}

      <div className="mt-8">
       
      </div>
    </>
  );
}

export default Dashboard;