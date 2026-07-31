function MedicineFilters({
  category,
  setCategory,
  company,
  setCompany,
  expiry,
  setExpiry,
  sortBy,
  setSortBy,
  order,
  setOrder,
  setPage,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {/* Category */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
        className="rounded-lg border p-2"
      >
        <option value="">All Categories</option>
        <option value="Tablet">Tablet</option>
        <option value="Capsule">Capsule</option>
        <option value="Syrup">Syrup</option>
        <option value="Injection">Injection</option>
        <option value="Ointment">Ointment</option>
        <option value="Drops">Drops</option>
        <option value="Powder">Powder</option>
      </select>

      {/* Company */}
      <input
        type="text"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
          setPage(1);
        }}
        placeholder="Search Company..."
        className="rounded-lg border p-2"
      />

      {/* Expiry */}
      <select
        value={expiry}
        onChange={(e) => {
          setExpiry(e.target.value);
          setPage(1);
        }}
        className="rounded-lg border p-2"
      >
        <option value="">All Medicines</option>
        <option value="valid">Valid</option>
        <option value="near">Near Expiry</option>
        <option value="expired">Expired</option>
      </select>

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          setPage(1);
        }}
        className="rounded-lg border p-2"
      >
        <option value="createdAt">Newest</option>
        <option value="medicineName">Medicine Name</option>
        <option value="sellingPrice">Selling Price</option>
        <option value="purchasePrice">Purchase Price</option>
        <option value="stockQuantity">Stock</option>
        <option value="expiryDate">Expiry Date</option>
      </select>

      {/* Sort Order */}
      <select
        value={order}
        onChange={(e) => {
          setOrder(e.target.value);
          setPage(1);
        }}
        className="rounded-lg border p-2"
      >
        <option value="desc">Descending ↓</option>
        <option value="asc">Ascending ↑</option>
      </select>
    </div>
  );
}

export default MedicineFilters;