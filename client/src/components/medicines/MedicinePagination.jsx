function MedicinePagination({
  page,
  setPage,
  totalPages,
}) {
  if (totalPages <= 1) return null;

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      className="
        mt-6
        flex
        flex-col
        items-center
        justify-between
        gap-4

        sm:flex-row
      "
    >
      {/* Previous */}

      <button
        type="button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-slate-600
          transition

          hover:border-blue-200
          hover:bg-blue-50
          hover:text-blue-600

          disabled:cursor-not-allowed
          disabled:opacity-40

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-slate-300

          dark:hover:border-slate-600
          dark:hover:bg-slate-700
          dark:hover:text-blue-400
        "
      >
        Previous
      </button>

      {/* Page Numbers */}

      <div className="flex flex-wrap justify-center gap-2">

        {pageNumbers.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            onClick={() =>
              setPage(pageNumber)
            }
            className={`
              flex
              h-9
              min-w-9
              items-center
              justify-center
              rounded-xl
              px-3
              text-sm
              font-semibold
              transition

              ${
                page === pageNumber
                  ? `
                    bg-blue-600
                    text-white
                    shadow-sm
                    shadow-blue-200

                    dark:bg-blue-500
                    dark:shadow-none
                  `
                  : `
                    border
                    border-slate-200
                    bg-white
                    text-slate-600

                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-300

                    dark:hover:bg-slate-700
                    dark:hover:text-blue-400
                  `
              }
            `}
          >
            {pageNumber}
          </button>
        ))}

      </div>

      {/* Next */}

      <button
        type="button"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-slate-600
          transition

          hover:border-blue-200
          hover:bg-blue-50
          hover:text-blue-600

          disabled:cursor-not-allowed
          disabled:opacity-40

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-slate-300

          dark:hover:border-slate-600
          dark:hover:bg-slate-700
          dark:hover:text-blue-400
        "
      >
        Next
      </button>
    </div>
  );
}

export default MedicinePagination;