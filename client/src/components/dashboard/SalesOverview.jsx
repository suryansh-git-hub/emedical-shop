import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function SalesOverview({ data = [] }) {
  const chartData = data.map((item) => ({
    month: monthNames[item._id.month],
    sales: Number(item.totalSales || 0),
  }));

  const totalSales = chartData.reduce(
    (sum, item) => sum + item.sales,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Monthly Sales Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sales performance over the selected period
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs font-medium text-slate-500">
            Total Sales
          </p>

          <p className="text-lg font-bold text-blue-600">
            ₹{totalSales.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Chart */}
      {chartData.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
          No sales data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <Tooltip
              cursor={{
                stroke: "#94a3b8",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 10px 25px rgba(15, 23, 42, 0.1)",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Sales",
              ]}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#salesGradient)"
              dot={{
                r: 4,
                fill: "#2563eb",
                strokeWidth: 2,
                stroke: "#ffffff",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SalesOverview;