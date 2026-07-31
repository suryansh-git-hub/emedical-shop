const ReportCard = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">
          {title}
        </h3>

        <p className="text-3xl font-bold text-blue-600">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ReportCard;