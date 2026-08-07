import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

const BillItemsTable = ({
  items,
  setItems,
}) => {
  // ==========================
  // Increase Quantity
  // ==========================

  const increaseQuantity = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  // ==========================
  // Decrease Quantity
  // ==========================

  const decreaseQuantity = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // ==========================
  // Manual Quantity
  // ==========================

  const changeQuantity = (
    id,
    value
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                Number(value) || 1,
            }
          : item
      )
    );
  };

  // ==========================
  // Remove Medicine
  // ==========================

  const removeMedicine = (
    id
  ) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          item._id !== id
      )
    );
  };

  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center">

        <h3 className="text-lg font-semibold text-gray-600">
          No Medicines Added
        </h3>

        <p className="mt-2 text-gray-500">
          Search and add medicines to
          start billing.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Medicine
            </th>

            <th className="px-6 py-4 text-center">
              Stock
            </th>

            <th className="px-6 py-4 text-right">
              Price
            </th>

            <th className="px-6 py-4 text-center">
              Qty
            </th>

            <th className="px-6 py-4 text-right">
              GST
            </th>

            <th className="px-6 py-4 text-right">
              Total
            </th>

            <th className="px-6 py-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {items.map((item) => {

            const total =
              item.quantity *
              item.sellingPrice;

            return (
              <tr
                key={item._id}
                className="border-t"
              >

                <td className="px-6 py-4">

                  <p className="font-semibold">
                    {
                      item.medicineName
                    }
                  </p>

                  <p className="text-sm text-gray-500">
                    {
                      item.batchNumber
                    }
                  </p>

                </td>

                <td className="px-6 py-4 text-center">

                  <span
                    className={`font-semibold ${
                      item.stock <= 10
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.stock}
                  </span>

                </td>

                <td className="px-6 py-4 text-right">
                  ₹
                  {item.sellingPrice.toLocaleString()}
                </td>

                <td className="px-6 py-4">

                  <div className="flex items-center justify-center gap-2">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item._id
                        )
                      }
                      className="rounded border p-1 hover:bg-gray-100"
                    >
                      <Minus
                        size={16}
                      />
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={
                        item.quantity
                      }
                      onChange={(e) =>
                        changeQuantity(
                          item._id,
                          e.target.value
                        )
                      }
                      className="w-16 rounded border py-1 text-center"
                    />

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item._id
                        )
                      }
                      className="rounded border p-1 hover:bg-gray-100"
                    >
                      <Plus
                        size={16}
                      />
                    </button>

                  </div>

                </td>

                <td className="px-6 py-4 text-right">
                  {item.gst}%
                </td>

                <td className="px-6 py-4 text-right font-semibold text-green-600">
                  ₹
                  {total.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-center">

                  <button
                    onClick={() =>
                      removeMedicine(
                        item._id
                      )
                    }
                    className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                  >
                    <Trash2
                      size={18}
                    />
                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
};

export default BillItemsTable;