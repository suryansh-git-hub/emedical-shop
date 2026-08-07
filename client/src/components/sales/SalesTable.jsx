// import { useState } from "react";
// import {
//   Eye,
//   Download,
//   Printer,
// } from "lucide-react";

// import InvoiceModal from "./InvoiceModal";
// import { generateInvoicePDF } from "../../utils/generateInvoicePDF";

// const SalesTable = ({ sales }) => {
//   const [selectedSale, setSelectedSale] =
//     useState(null);

//   const [isModalOpen, setIsModalOpen] =
//     useState(false);

//   const openInvoice = (sale) => {
//     setSelectedSale(sale);
//     setIsModalOpen(true);
//   };

//   const closeInvoice = () => {
//     setSelectedSale(null);
//     setIsModalOpen(false);
//   };

//   if (sales.length === 0) {
//     return (
//       <div className="rounded-xl bg-white p-10 text-center shadow">
//         <h2 className="text-xl font-semibold text-gray-700">
//           No Sales Found
//         </h2>

//         <p className="mt-2 text-gray-500">
//           Create your first bill to get started.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="overflow-hidden rounded-xl bg-white shadow">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Invoice Number
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Customer
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Sale Date
//                 </th>

//                 <th className="px-6 py-4 text-center text-sm font-semibold">
//                   Medicines
//                 </th>

//                 <th className="px-6 py-4 text-right text-sm font-semibold">
//                   Total Amount
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Created By
//                 </th>

//                 <th className="px-6 py-4 text-center text-sm font-semibold">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {sales.map((sale) => (
//                 <tr
//                   key={sale._id}
//                   className="border-t hover:bg-gray-50"
//                 >
//                   <td className="px-6 py-4 font-medium">
//                     {sale.invoiceNumber}
//                   </td>

//                   <td className="px-6 py-4">
//                     {sale.customer?.customerName}
//                   </td>

//                   <td className="px-6 py-4">
//                     {new Date(
//                       sale.saleDate
//                     ).toLocaleDateString()}
//                   </td>

//                   <td className="px-6 py-4 text-center">
//                     {sale.medicines.length}
//                   </td>

//                   <td className="px-6 py-4 text-right font-semibold">
//                     ₹
//                     {sale.totalAmount.toLocaleString()}
//                   </td>

//                   <td className="px-6 py-4">
//                     {sale.createdBy?.name}
//                   </td>

//                   <td className="px-6 py-4">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() =>
//                           openInvoice(sale)
//                         }
//                         className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
//                         title="View Invoice"
//                       >
//                         <Eye size={18} />
//                       </button>

//                       <button
//                         onClick={() =>
//                           generateInvoicePDF(sale)
//                         }
//                         className="rounded-lg bg-green-100 p-2 text-green-600 transition hover:bg-green-200"
//                         title="Download PDF"
//                       >
//                         <Download size={18} />
//                       </button>

//                       <button
//                         onClick={() =>
//                           window.print()
//                         }
//                         className="rounded-lg bg-purple-100 p-2 text-purple-600 transition hover:bg-purple-200"
//                         title="Print Invoice"
//                       >
//                         <Printer size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <InvoiceModal
//         sale={selectedSale}
//         isOpen={isModalOpen}
//         onClose={closeInvoice}
//       />
//     </>
//   );
// };

// export default SalesTable;