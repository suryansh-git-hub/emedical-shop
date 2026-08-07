import {
  LayoutDashboard,
  Pill,
  Truck,
  Users,
  ShoppingCart,
  Receipt,
  Boxes,
  BarChart3,
  UserCog,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "pharmacist"],
  },
  {
    name: "Medicines",
    path: "/medicines",
    icon: Pill,
    roles: ["admin", "pharmacist"],
  },
  {
    name: "Suppliers",
    path: "/suppliers",
    icon: Truck,
    roles: ["admin"],
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
    roles: ["admin", "pharmacist"],
  },
  {
    name: "Purchases",
    path: "/purchases",
    icon: ShoppingCart,
    roles: ["admin"],
  },
  {
    name: "Billing",
    path: "/sales",
    icon: Receipt,
    roles: ["admin", "pharmacist"],
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: Boxes,
    roles: ["admin", "pharmacist"],
  },
  {
    name: "Reports",
    path: "/reports",
    icon: BarChart3,
    roles: ["admin"],
  },
  {
    name: "Users",
    path: "/users",
    icon: UserCog,
    roles: ["admin"],
  },
];