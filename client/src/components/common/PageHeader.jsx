function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {title}
        </h1>


        <p className="text-gray-500">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
}

export default PageHeader;