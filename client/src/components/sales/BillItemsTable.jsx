import {
  Minus,
  Plus,
  Trash2,
  Package,
} from "lucide-react";

const BillItemsTable = ({
  items = [],
  setItems,
}) => {
  // ==========================
  // Increase Quantity
  // ==========================

  const increaseQuantity = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== id) {
          return item;
        }

        if (
          Number(item.quantity) >=
          Number(item.stock)
        ) {
          return item;
        }

        return {
          ...item,
          quantity:
            Number(item.quantity) + 1,
        };
      })
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
              quantity: Math.max(
                Number(item.quantity) - 1,
                1
              ),
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
      prev.map((item) => {
        if (item._id !== id) {
          return item;
        }

        let quantity =
          Number(value) || 1;

        quantity = Math.max(
          quantity,
          1
        );

        quantity = Math.min(
          quantity,
          Number(item.stock)
        );

        return {
          ...item,
          quantity,
        };
      })
    );
  };

  // ==========================
  // Remove Medicine
  // ==========================

  const removeMedicine = (id) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          item._id !== id
      )
    );
  };

  // ==========================
  // Empty State
  // ==========================

  if (items.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[280px]
          flex-col
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          px-6
          py-12
          text-center

          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-50
            text-blue-600

            dark:bg-blue-950/50
            dark:text-blue-400
          "
        >
          <Package size={25} />
        </div>

        <h3
          className="
            mt-4
            text-lg
            font-semibold
            text-slate-700

            dark:text-slate-200
          "
        >
          No Medicines Added
        </h3>

        <p
          className="
            mt-2
            max-w-sm
            text-sm
            text-slate-500

            dark:text-slate-400
          "
        >
          Search and add medicines to
          start billing.
        </p>

      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white

        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      <div className="overflow-x-auto">

        <table className="min-w-[950px] w-full">

          {/* ==========================
              HEADER
          ========================== */}

          <thead
            className="
              bg-slate-50

              dark:bg-slate-800/70
            "
          >

            <tr>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Medicine
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-center
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Stock
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Price
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-center
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Qty
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                GST
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Total
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-center
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Action
              </th>

            </tr>

          </thead>

          {/* ==========================
              BODY
          ========================== */}

          <tbody
            className="
              divide-y
              divide-slate-100

              dark:divide-slate-800
            "
          >

            {items.map((item) => {

              const quantity =
                Number(
                  item.quantity || 0
                );

              const sellingPrice =
                Number(
                  item.sellingPrice || 0
                );

              const total =
                quantity *
                sellingPrice;

              const stock =
                Number(
                  item.stock || 0
                );

              const isLowStock =
                stock <= 10;

              const isMaxQuantity =
                quantity >= stock;

              return (
                <tr
                  key={item._id}
                  className="
                    transition
                    hover:bg-slate-50

                    dark:hover:bg-slate-800/40
                  "
                >

                  {/* Medicine */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-50
                          text-blue-600

                          dark:bg-blue-950/50
                          dark:text-blue-400
                        "
                      >
                        <Package size={17} />
                      </div>

                      <div className="min-w-0">

                        <p
                          className="
                            truncate
                            text-sm
                            font-bold
                            text-slate-800

                            dark:text-slate-100
                          "
                        >
                          {item.medicineName}
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Batch:{" "}
                          {item.batchNumber ||
                            "-"}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Stock */}

                  <td className="px-6 py-5 text-center">

                    <span
                      className={`text-sm font-bold ${
                        isLowStock
                          ? "text-red-600 dark:text-red-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {stock}
                    </span>

                  </td>

                  {/* Price */}

                  <td
                    className="
                      px-6
                      py-5
                      text-right
                      text-sm
                      font-medium
                      text-slate-700

                      dark:text-slate-300
                    "
                  >
                    ₹
                    {sellingPrice.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </td>

                  {/* Quantity */}

                  <td className="px-6 py-5">

                    <div className="flex items-center justify-center gap-2">

                      {/* Decrease */}

                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(
                            item._id
                          )
                        }
                        disabled={
                          quantity <= 1
                        }
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          text-slate-600
                          transition
                          hover:border-blue-200
                          hover:bg-blue-50
                          hover:text-blue-600

                          dark:border-slate-700
                          dark:bg-slate-800
                          dark:text-slate-300
                          dark:hover:border-blue-800
                          dark:hover:bg-blue-950/50
                          dark:hover:text-blue-400

                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <Minus size={15} />
                      </button>

                      {/* Input */}

                      <input
                        type="number"
                        min="1"
                        max={stock}
                        value={quantity}
                        onChange={(e) =>
                          changeQuantity(
                            item._id,
                            e.target.value
                          )
                        }
                        className="
                          w-16
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          px-2
                          py-1.5
                          text-center
                          text-sm
                          font-semibold
                          text-slate-700
                          outline-none
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100

                          dark:border-slate-700
                          dark:bg-slate-800
                          dark:text-slate-200
                          dark:focus:ring-blue-950
                        "
                      />

                      {/* Increase */}

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(
                            item._id
                          )
                        }
                        disabled={
                          isMaxQuantity
                        }
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          text-slate-600
                          transition
                          hover:border-blue-200
                          hover:bg-blue-50
                          hover:text-blue-600

                          dark:border-slate-700
                          dark:bg-slate-800
                          dark:text-slate-300
                          dark:hover:border-blue-800
                          dark:hover:bg-blue-950/50
                          dark:hover:text-blue-400

                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <Plus size={15} />
                      </button>

                    </div>

                  </td>

                  {/* GST */}

                  <td
                    className="
                      px-6
                      py-5
                      text-right
                      text-sm
                      font-medium
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    {Number(
                      item.gst || 0
                    )}
                    %
                  </td>

                  {/* Total */}

                  <td
                    className="
                      px-6
                      py-5
                      text-right
                      text-sm
                      font-bold
                      text-emerald-600

                      dark:text-emerald-400
                    "
                  >
                    ₹
                    {total.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </td>

                  {/* Action */}

                  <td className="px-6 py-5 text-center">

                    <button
                      type="button"
                      onClick={() =>
                        removeMedicine(
                          item._id
                        )
                      }
                      className="
                        inline-flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-red-50
                        text-red-600
                        transition
                        hover:bg-red-100

                        dark:bg-red-950/40
                        dark:text-red-400
                        dark:hover:bg-red-950/70
                      "
                      title="Remove medicine"
                    >
                      <Trash2 size={17} />
                    </button>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default BillItemsTable;