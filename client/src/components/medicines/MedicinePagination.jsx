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
    <div className="mt-6 flex items-center justify-between">
      {/* Previous */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`rounded border px-4 py-2 transition ${
          page === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex flex-wrap gap-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`rounded px-4 py-2 transition ${
              page === pageNumber
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`rounded border px-4 py-2 transition ${
          page === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default MedicinePagination;