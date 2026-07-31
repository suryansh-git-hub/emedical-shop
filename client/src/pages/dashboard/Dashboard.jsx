import { Pill, Truck, Users, IndianRupee ,TriangleAlert } from "lucide-react";
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
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to Medical Shop Management System"
      />


<WelcomeBanner />


      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Medicines"
          value="150"
          icon={<Pill size={28} className="text-white" />}
          color="bg-blue-500"
        />

        <StatCard
          title="Suppliers"
          value="25"
          icon={<Truck size={28} className="text-white" />}
          color="bg-green-500"
        />

        <StatCard
          title="Customers"
          value="420"
          icon={<Users size={28} className="text-white" />}
          color="bg-orange-500"
        />

        <StatCard
          title="Today's Sales"
          value="₹12,500"
          icon={<IndianRupee size={28} className="text-white" />}
          color="bg-purple-500"
        />
        <StatCard
    title="Monthly Revenue"
    value="₹2,45,000"
    icon={<IndianRupee size={28} className="text-white" />}
    color="bg-emerald-500"
/>

<StatCard
    title="Expired Medicines"
    value="18"
    icon={<TriangleAlert size={28} className="text-white" />}
    color="bg-red-500"
/>
</div>

        <QuickActions />
        <div className="mt-8">
    <LowStockTable />
</div>

<div className="mt-8">
    <RecentSales />
</div>

<div className="mt-8">
  <SalesOverview />
</div>

<div className="mt-8 grid gap-6 lg:grid-cols-2">
    <CategorySalesChart />
</div>

<div className="mt-8 grid gap-6 lg:grid-cols-2">
  <RecentPurchases />
  <TopSellingMedicines />
</div>

<div className="mt-8">
  <ExpiringMedicines />
</div>

      
      
    </>
  );
}

export default Dashboard;