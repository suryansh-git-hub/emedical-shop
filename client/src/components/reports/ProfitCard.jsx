const ProfitCard = ({ profit }) => {
  const isProfit = profit >= 0;

  return (
    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-6
        shadow-sm
        transition
        hover:shadow-lg
        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-black/20
      "
    >
      <div className="space-y-2">

        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Total Profit
        </h3>

        <p
          className={`text-3xl font-bold ${
            isProfit
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          ₹{Number(profit).toLocaleString()}
        </p>

        <p
          className={`text-sm font-medium ${
            isProfit
              ? "text-green-500 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {isProfit
            ? "Overall Profit"
            : "Overall Loss"}
        </p>

      </div>
    </div>
  );
};

export default ProfitCard;