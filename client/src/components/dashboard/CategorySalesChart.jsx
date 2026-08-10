import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];

function CategorySalesChart({ data = [] }) {
  const chartData = data.map((item) => ({
    name: item._id || "Others",
    value: Number(item.totalSales || 0),
  }));

  const totalSales = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Category-wise Sales
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Sales distribution across medicine categories
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
          No category sales available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
              cornerRadius={6}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                  stroke="#ffffff"
                  strokeWidth={3}
                />
              ))}
            </Pie>

            {/* Center text */}
            <text
              x="50%"
              y="42%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-900"
            >
              <tspan
                x="50%"
                dy="-4"
                fontSize="20"
                fontWeight="700"
              >
                ₹{totalSales.toLocaleString("en-IN")}
              </tspan>

              <tspan
                x="50%"
                dy="24"
                fontSize="11"
                fill="#64748b"
              >
                Total Sales
              </tspan>
            </text>

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 10px 25px rgba(15, 23, 42, 0.1)",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString(
                  "en-IN"
                )}`,
                "Sales",
              ]}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                paddingTop: "15px",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategorySalesChart;