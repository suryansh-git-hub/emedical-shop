const ReportCard = ({ title, value }) => {
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
          {title}
        </h3>

        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {value}
        </p>

      </div>
    </div>
  );
};

export default ReportCard;