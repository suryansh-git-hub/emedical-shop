import {
  LayoutDashboard,
  Pill,
  Boxes,
  Truck,
  Users,
  ShoppingCart,
  ReceiptText,
  FileBarChart2,
  UserCog,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Medicines",
    path: "/medicines",
    icon: Pill,
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: Boxes,
  },
  {
    name: "Suppliers",
    path: "/suppliers",
    icon: Truck,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    name: "Purchases",
    path: "/purchases",
    icon: ShoppingCart,
  },
  {
    name: "Sales",
    path: "/sales",
    icon: ReceiptText,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileBarChart2,
  },
  {
    name: "Users",
    path: "/users",
    icon: UserCog,
  },
];