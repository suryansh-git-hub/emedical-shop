import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  Menu,
  Package,
  Pill,
  ShoppingCart,
  ShieldCheck,
  Store,
  Truck,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const goTo = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const features = [
    {
      icon: Pill,
      title: "Medicine Management",
      description:
        "Manage medicine details, batches, pricing, expiry dates and stock from one place.",
      iconClass:
        "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    },
    {
      icon: Package,
      title: "Inventory Management",
      description:
        "Keep track of stock levels and quickly identify medicines that need attention.",
      iconClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
    {
      icon: Users,
      title: "Customer Management",
      description:
        "Manage customer information, reward points and complete purchase history.",
      iconClass:
        "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
    },
    {
      icon: Truck,
      title: "Supplier Management",
      description:
        "Maintain supplier records and keep supplier-related information organized.",
      iconClass:
        "bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
    },
    {
      icon: ClipboardList,
      title: "Purchase Management",
      description:
        "Record pharmacy purchases and maintain organized purchase history.",
      iconClass:
        "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400",
    },
    {
      icon: ShoppingCart,
      title: "Sales & Billing",
      description:
        "Create bills, process sales and generate customer invoices quickly.",
      iconClass:
        "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
    },
    {
      icon: BarChart3,
      title: "Dashboard & Analytics",
      description:
        "Get a centralized view of important pharmacy business information.",
      iconClass:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
    },
    {
      icon: FileText,
      title: "Reports",
      description:
        "Access useful reports to understand pharmacy operations and business activity.",
      iconClass:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
    },
  ];

  const benefits = [
    "Centralized pharmacy management",
    "Faster billing",
    "Better inventory visibility",
    "Easy customer management",
    "Organized purchase and sales records",
    "Useful reports",
    "Simple and intuitive interface",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}

          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
              <Pill
                size={21}
                className="text-white"
              />
            </div>

            <div className="text-left">
              <div className="text-base font-bold tracking-tight">
                eMedi
                <span className="text-blue-600 dark:text-blue-400">
                  {" "}Pharmacy
                </span>
              </div>

              <div className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
                Pharmacy Management
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              How It Works
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              About
            </button>
          </nav>

          {/* Desktop Actions */}

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => goTo("/login")}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Login
            </button>

            <button
              onClick={() => goTo("/signup")}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden dark:border-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-1">

              <button
                onClick={() =>
                  scrollToSection("home")
                }
                className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Home
              </button>

              <button
                onClick={() =>
                  scrollToSection("features")
                }
                className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Features
              </button>

              <button
                onClick={() =>
                  scrollToSection("how-it-works")
                }
                className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                How It Works
              </button>

              <button
                onClick={() =>
                  scrollToSection("about")
                }
                className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                About
              </button>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <button
                  onClick={() => goTo("/login")}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold dark:border-slate-700"
                >
                  Login
                </button>

                <button
                  onClick={() => goTo("/signup")}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Get Started
                </button>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <main id="home">

        <section className="relative overflow-hidden border-b border-slate-100 dark:border-slate-900">

          {/* Background decoration */}

          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-950/30" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-950/20" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">

            {/* Hero Content */}

            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400">
                <Zap size={14} />
                Built for modern pharmacy management
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                Everything Your Pharmacy Needs,
                <span className="block text-blue-600 dark:text-blue-400">
                  In One Place.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
                eMedi Pharmacy helps you manage medicines,
                inventory, suppliers, customers, purchases
                and sales with a simple and powerful
                management dashboard.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <button
                  onClick={() => goTo("/signup")}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Get Started

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={() => goTo("/login")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Login
                </button>

              </div>

              <div className="mt-7 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <ShieldCheck
                  size={17}
                  className="text-emerald-500"
                />
                Designed for organized pharmacy operations
              </div>

            </div>

            {/* Dashboard Mockup */}

            <div className="relative">

              <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/50 blur-2xl dark:bg-blue-950/20" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">

                {/* Browser Header */}

                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">

                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  </div>

                  <div className="text-[10px] font-medium text-slate-400">
                    eMedi Pharmacy Dashboard
                  </div>

                  <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-950" />

                </div>

                {/* Dashboard */}

                <div className="grid grid-cols-[70px_1fr] sm:grid-cols-[90px_1fr]">

                  {/* Sidebar */}

                  <div className="border-r border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">

                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                      <Pill
                        size={17}
                        className="text-white"
                      />
                    </div>

                    <div className="mt-6 space-y-3">

                      {[BarChart3, Pill, Package, Users, ShoppingCart].map(
                        (Icon, index) => (
                          <div
                            key={index}
                            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg ${
                              index === 0
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                                : "text-slate-400"
                            }`}
                          >
                            <Icon size={15} />
                          </div>
                        )
                      )}

                    </div>

                  </div>

                  {/* Main Dashboard */}

                  <div className="min-w-0 p-4 sm:p-5">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-[10px] font-medium text-slate-400">
                          Dashboard
                        </p>
                        <p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-slate-100">
                          Pharmacy Overview
                        </p>
                      </div>

                      <div className="hidden rounded-lg border border-slate-200 px-3 py-1.5 text-[10px] text-slate-500 sm:block dark:border-slate-700">
                        Today
                      </div>

                    </div>

                    {/* Stats */}

                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">

                      <MockStat
                        title="Sales"
                        value="₹24.8K"
                        icon={ShoppingCart}
                      />

                      <MockStat
                        title="Medicines"
                        value="1,248"
                        icon={Pill}
                      />

                      <MockStat
                        title="Customers"
                        value="486"
                        icon={Users}
                      />

                      <MockStat
                        title="Low Stock"
                        value="18"
                        icon={Package}
                      />

                    </div>

                    {/* Chart */}

                    <div className="mt-3 grid gap-3 sm:grid-cols-[1.5fr_1fr]">

                      <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800">

                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                            Sales Overview
                          </p>

                          <BarChart3
                            size={14}
                            className="text-blue-500"
                          />
                        </div>

                        <div className="mt-5 flex h-24 items-end gap-1.5">

                          {[35, 52, 42, 68, 56, 76, 62, 88, 70, 95, 80, 100].map(
                            (height, index) => (
                              <div
                                key={index}
                                className="flex-1 rounded-t bg-blue-500/80"
                                style={{
                                  height: `${height}%`,
                                }}
                              />
                            )
                          )}

                        </div>

                      </div>

                      {/* Low Stock */}

                      <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800">

                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                            Low Stock
                          </p>

                          <Package
                            size={14}
                            className="text-amber-500"
                          />
                        </div>

                        <div className="mt-3 space-y-2">

                          <MockStock
                            name="Paracetamol"
                            stock="12"
                          />

                          <MockStock
                            name="Amoxicillin"
                            stock="8"
                          />

                          <MockStock
                            name="Pantoprazole"
                            stock="5"
                          />

                        </div>

                      </div>

                    </div>

                    {/* Recent Sales */}

                    <div className="mt-3 rounded-xl border border-slate-100 p-3 dark:border-slate-800">

                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                          Recent Sales
                        </p>

                        <span className="text-[9px] font-medium text-blue-500">
                          View all
                        </span>
                      </div>

                      <div className="mt-3 space-y-2">

                        <MockSale
                          name="Customer #1042"
                          item="3 medicines"
                          amount="₹740"
                        />

                        <MockSale
                          name="Customer #1041"
                          item="2 medicines"
                          amount="₹420"
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* =================================================
            FEATURES
        ================================================== */}

        <section
          id="features"
          className="scroll-mt-20 bg-slate-50 py-20 dark:bg-slate-900/40"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="FEATURES"
              title="Everything You Need to Run Your Pharmacy"
              description="Manage the essential parts of your pharmacy operation from a single, organized system."
            />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900 dark:hover:shadow-black/20"
                  >

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconClass}`}
                    >
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-slate-100">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </p>

                    <div className="mt-5 flex items-center text-xs font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100 dark:text-blue-400">
                      Explore feature
                      <ChevronRight size={14} />
                    </div>

                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* =================================================
            HOW IT WORKS
        ================================================== */}

        <section
          id="how-it-works"
          className="scroll-mt-20 border-b border-slate-100 py-20 dark:border-slate-900"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="HOW IT WORKS"
              title="Manage Your Pharmacy in 3 Simple Steps"
              description="Keep your daily pharmacy operations organized without making the workflow complicated."
            />

            <div className="relative mt-14 grid gap-10 md:grid-cols-3">

              {/* Connecting line */}

              <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-slate-200 md:block dark:bg-slate-800" />

              <Step
                number="01"
                icon={ClipboardList}
                title="Add Your Data"
                description="Add medicines, suppliers and customers to your system."
              />

              <Step
                number="02"
                icon={Zap}
                title="Manage Daily Operations"
                description="Handle purchases, inventory and sales from the dashboard."
              />

              <Step
                number="03"
                icon={BarChart3}
                title="Track Your Business"
                description="Use dashboard insights, billing history and reports to understand your pharmacy operations."
              />

            </div>
          </div>
        </section>

        {/* =================================================
            DASHBOARD PREVIEW
        ================================================== */}

          {/* <section className="overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/40">

          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="DASHBOARD"
              title="A Clear View of Your Pharmacy"
              description="Keep important information visible so you can understand your pharmacy operations at a glance."
            />

            <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/50 sm:p-5 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30">

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">

                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Overview
                    </p>
                    <h3 className="mt-1 text-lg font-bold">
                      Pharmacy Dashboard
                    </h3>
                  </div>

                  <div className="hidden items-center gap-2 sm:flex">
                    <div className="h-8 w-20 rounded-lg bg-white dark:bg-slate-900" />
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950" />
                  </div>

                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <LargeDashboardStat
                    title="Total Medicines"
                    value="1,248"
                    icon={Pill}
                  />

                  <LargeDashboardStat
                    title="Total Customers"
                    value="486"
                    icon={Users}
                  />

                  <LargeDashboardStat
                    title="Total Sales"
                    value="₹24,800"
                    icon={ShoppingCart}
                  />

                  <LargeDashboardStat
                    title="Total Purchases"
                    value="₹18,450"
                    icon={Truck}
                  />

                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">


                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">
                          Sales Overview
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Recent sales activity
                        </p>
                      </div>

                      <BarChart3
                        size={18}
                        className="text-blue-500"
                      />
                    </div>

                    <div className="mt-8 flex h-44 items-end gap-2">

                      {[42, 58, 49, 72, 63, 84, 68, 92, 75, 96, 81, 100].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="group relative flex h-full flex-1 items-end"
                          >
                            <div
                              className="w-full rounded-t-md bg-blue-500 transition group-hover:bg-blue-600"
                              style={{
                                height: `${height}%`,
                              }}
                            />
                          </div>
                        )
                      )}

                    </div>

                    <div className="mt-3 flex justify-between text-[10px] text-slate-400">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>

                  </div>

              

                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">
                          Low Stock Alerts
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Medicines requiring attention
                        </p>
                      </div>

                      <Package
                        size={18}
                        className="text-amber-500"
                      />
                    </div>

                    <div className="mt-5 space-y-3">

                      <AlertRow
                        name="Paracetamol"
                        stock="12 units"
                      />

                      <AlertRow
                        name="Amoxicillin"
                        stock="8 units"
                      />

                      <AlertRow
                        name="Pantoprazole"
                        stock="5 units"
                      />

                      <AlertRow
                        name="Cetirizine"
                        stock="4 units"
                      />

                    </div>

                  </div>

                </div>

  

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">
                      Recent Transactions
                    </p>

                    <Clock3
                      size={16}
                      className="text-slate-400"
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">

                    <Transaction
                      customer="Aman"
                      medicine="3 medicines"
                      amount="₹740"
                    />

                    <Transaction
                      customer="Vinay"
                      medicine="2 medicines"
                      amount="₹420"
                    />

                    <Transaction
                      customer="Vivek"
                      medicine="4 medicines"
                      amount="₹1,120"
                    />

                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>   */}

      

         <section
          id="about"
          className="scroll-mt-20 py-20"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Store size={13} />
                Why eMedi Pharmacy
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Keep Your Pharmacy Operations Organized
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400">
                eMedi Pharmacy brings essential pharmacy
                operations together into one simple
                management system, helping you keep
                information organized and accessible.
              </p>

              <div className="mt-8 space-y-4">

                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <Check size={14} />
                    </div>

                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {benefit}
                    </span>
                  </div>
                ))}

              </div>

            </div>

           

            <div className="relative">

              <div className="absolute -inset-5 rounded-[2rem] bg-emerald-100/50 blur-3xl dark:bg-emerald-950/20" />

              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50">
                    <Store
                      size={22}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      eMedi Pharmacy
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Pharmacy Management System
                    </p>
                  </div>

                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">

                  <MiniCard
                    icon={Pill}
                    label="Medicines"
                    value="1,248"
                  />

                  <MiniCard
                    icon={Users}
                    label="Customers"
                    value="486"
                  />

                  <MiniCard
                    icon={ShoppingCart}
                    label="Sales"
                    value="₹24.8K"
                  />

                  <MiniCard
                    icon={FileText}
                    label="Reports"
                    value="Ready"
                  />

                </div>

                <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-950">

                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">
                      Today's Activity
                    </p>

                    <span className="text-[10px] text-emerald-500">
                      Organized
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">

                    <ProgressRow
                      label="Sales"
                      value="78%"
                    />

                    <ProgressRow
                      label="Inventory"
                      value="64%"
                    />

                    <ProgressRow
                      label="Purchases"
                      value="48%"
                    />

                  </div>

                </div>

              </div>
            </div>

          </div>
        </section> 

        {/* =================================================
            CTA
        ================================================== */}

        <section className="px-5 pb-20 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center shadow-xl shadow-blue-600/20 sm:px-12 lg:py-16">

            <div className="mx-auto max-w-2xl">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Pill
                  size={23}
                  className="text-white"
                />
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Simplify Your Pharmacy Management?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Bring your pharmacy operations together
                with eMedi Pharmacy.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                <button
                  onClick={() => goTo("/signup")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
                >
                  Get Started
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => goTo("/login")}
                  className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Login
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">

        {/* <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <Pill
                  size={19}
                  className="text-white"
                />
              </div>

              <div>
                <p className="font-bold">
                  eMedi Pharmacy
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Modern pharmacy management made simple.
                </p>
              </div>

            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">

              <button
                onClick={() => scrollToSection("home")}
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                Home
              </button>

              <button
                onClick={() => scrollToSection("features")}
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                Features
              </button>

              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                How It Works
              </button>

              <button
                onClick={() => goTo("/login")}
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                Login
              </button>

              <button
                onClick={() => goTo("/signup")}
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                Get Started
              </button>

            </div>

          </div> */}

          <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400 dark:border-slate-800">
            © 2026 eMedi Pharmacy. All rights reserved.
          </div>
{/* 
        </div> */}

      </footer>

    </div>
  );
};

/* ==========================================================
   REUSABLE COMPONENTS
========================================================== */

const SectionHeading = ({
  eyebrow,
  title,
  description,
}) => {
  return (
    <div className="mx-auto max-w-2xl text-center">

      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base dark:text-slate-400">
        {description}
      </p>

    </div>
  );
};

const Step = ({
  number,
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="relative z-10 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-blue-600 text-white shadow-lg shadow-blue-600/20 dark:border-slate-950">
        <Icon size={23} />
      </div>

      <div className="mt-5 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400">
        STEP {number}
      </div>

      <h3 className="mt-2 text-lg font-bold">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>

    </div>
  );
};

const MockStat = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-950">

      <div className="flex items-center justify-between">
        <span className="text-[9px] text-slate-400">
          {title}
        </span>

        <Icon
          size={12}
          className="text-blue-500"
        />
      </div>

      <p className="mt-1 text-sm font-bold">
        {value}
      </p>

    </div>
  );
};

const MockStock = ({
  name,
  stock,
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-2 dark:bg-slate-950">

      <span className="truncate text-[9px] text-slate-600 dark:text-slate-300">
        {name}
      </span>

      <span className="ml-2 text-[9px] font-bold text-amber-500">
        {stock}
      </span>

    </div>
  );
};

const MockSale = ({
  name,
  item,
  amount,
}) => {
  return (
    <div className="flex items-center justify-between">

      <div className="min-w-0">
        <p className="truncate text-[9px] font-semibold">
          {name}
        </p>

        <p className="text-[8px] text-slate-400">
          {item}
        </p>
      </div>

      <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
        {amount}
      </span>

    </div>
  );
};

const LargeDashboardStat = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center justify-between">

        <p className="text-xs font-medium text-slate-400">
          {title}
        </p>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <Icon size={15} />
        </div>

      </div>

      <p className="mt-3 text-xl font-bold">
        {value}
      </p>

    </div>
  );
};

const AlertRow = ({
  name,
  stock,
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 dark:border-slate-800">

      <div className="flex min-w-0 items-center gap-2">

        <div className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />

        <span className="truncate text-xs font-medium">
          {name}
        </span>

      </div>

      <span className="ml-2 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
        {stock}
      </span>

    </div>
  );
};

const Transaction = ({
  customer,
  medicine,
  amount,
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 dark:border-slate-800">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <UserRound size={14} />
        </div>

        <div className="min-w-0">

          <p className="truncate text-xs font-semibold">
            {customer}
          </p>

          <p className="mt-0.5 text-[10px] text-slate-400">
            {medicine}
          </p>

        </div>

      </div>

      <span className="ml-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
        {amount}
      </span>

    </div>
  );
};

const MiniCard = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <Icon size={16} />
        </div>

        <div>
          <p className="text-[10px] text-slate-400">
            {label}
          </p>

          <p className="mt-0.5 text-sm font-bold">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
};

const ProgressRow = ({
  label,
  value,
}) => {
  return (
    <div>

      <div className="flex items-center justify-between text-[10px]">
        <span className="text-slate-500 dark:text-slate-400">
          {label}
        </span>

        <span className="font-semibold">
          {value}
        </span>
      </div>

      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{
            width: value,
          }}
        />
      </div>

    </div>
  );
};

export default Landing;