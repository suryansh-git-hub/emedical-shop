function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-none
        dark:hover:border-slate-600
        dark:hover:bg-slate-800

        ${onClick ? "cursor-pointer" : ""}
      `}
    >

      {/* Accent bar */}

      <div
        className={`
          absolute
          inset-x-0
          top-0
          h-1
          opacity-0
          transition-opacity
          duration-200
          group-hover:opacity-100
          ${color}
        `}
      />

      <div className="flex items-center justify-between">

        {/* ================= Content ================= */}

        <div className="min-w-0">

          <p
            className="
              text-sm
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {value}
          </h2>

          {subtitle && (
            <p
              className="
                mt-1
                text-xs
                font-medium
                text-slate-400
                dark:text-slate-500
              "
            >
              {subtitle}
            </p>
          )}

        </div>

        {/* ================= Icon ================= */}

        <div
          className={`
            shrink-0
            rounded-full
            p-3
            ${color}
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;