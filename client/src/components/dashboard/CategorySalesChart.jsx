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
    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:shadow-md

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-none
      "
    >
      {/* Header */}
      <div className="mb-4">
        <h2
          className="
            text-lg font-bold
            text-slate-900
            dark:text-white
          "
        >
          Category-wise Sales
        </h2>

        <p
          className="
            mt-1 text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Sales distribution across medicine categories
        </p>
      </div>

      {chartData.length === 0 ? (
        <div
          className="
            flex h-[300px]
            items-center justify-center
            rounded-xl
            bg-slate-50
            text-sm
            text-slate-500

            dark:bg-slate-800/60
            dark:text-slate-400
          "
        >
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
        {/* Center text */}
<text
  x="50%"
  y="42%"
  textAnchor="middle"
  dominantBaseline="middle"
>
  <tspan
    x="50%"
    dy="-4"
    fontSize="20"
    fontWeight="700"
    className="fill-slate-900 dark:fill-white"
  >
    ₹{totalSales.toLocaleString("en-IN")}
  </tspan>

  <tspan
    x="50%"
    dy="24"
    fontSize="11"
    className="fill-slate-400 dark:fill-slate-400"
  >
    Total Sales
  </tspan>
</text>

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #475569",
                backgroundColor: "#0f172a",
                color: "#f8fafc",
                boxShadow:
                  "0 10px 25px rgba(0, 0, 0, 0.25)",
              }}
              labelStyle={{
                color: "#cbd5e1",
              }}
              itemStyle={{
                color: "#93c5fd",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString(
                  "en-IN"
                )}`,
                "Sales",
              ]}
            />

            {/* Legend */}
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                paddingTop: "15px",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategorySalesChart;