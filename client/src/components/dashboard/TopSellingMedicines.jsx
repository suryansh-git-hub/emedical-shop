import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Link } from "react-router-dom";

function TopSellingMedicines({ medicines = [] }) {
  const chartData = medicines.map((medicine) => ({
    name: medicine.medicineName,
    quantity: Number(medicine.quantitySold || 0),
  }));

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
        dark:hover:border-slate-600
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2
            className="
              text-lg font-bold
              text-slate-900
              dark:text-white
            "
          >
            Top Selling Medicines
          </h2>

          <p
            className="
              mt-1 text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Best performing medicines by quantity sold
          </p>
        </div>

        <Link
          to="/reports"
          className="
            rounded-lg
            px-3 py-2
            text-sm font-semibold
            text-blue-600
            transition
            hover:bg-blue-50

            dark:text-blue-400
            dark:hover:bg-blue-950/50
          "
        >
          View Report →
        </Link>
      </div>

      {/* Empty State */}
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
          No sales data available.
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="#475569"
              strokeDasharray="4 4"
              horizontal={false}
              opacity={0.35}
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={90}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "#334155",
                opacity: 0.25,
              }}
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
                `${value} units`,
                "Sold",
              ]}
            />

            <Bar
              dataKey="quantity"
              fill="#2563eb"
              radius={[0, 8, 8, 0]}
              barSize={22}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TopSellingMedicines;