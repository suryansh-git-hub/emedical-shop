

function StatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className={`rounded-full p-3 ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;