const ProfitCard = ({ profit }) => {
  const isProfit = profit >= 0;

  return (
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">
          Total Profit
        </h3>

        <p
          className={`text-3xl font-bold ${
            isProfit ? "text-green-600" : "text-red-600"
          }`}
        >
          ₹{Number(profit).toLocaleString()}
        </p>

        <p
          className={`text-sm font-medium ${
            isProfit ? "text-green-500" : "text-red-500"
          }`}
        >
          {isProfit ? "Overall Profit" : "Overall Loss"}
        </p>
      </div>
    </div>
  );
};

export default ProfitCard;