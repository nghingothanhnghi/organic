// routes/orderCheck.tsx
import type { Route } from "./+types/orderCheck";
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchOrders, setFilters } from "~/features/orderSlice";
import Breadcrumb from "~/components/breadcrumb";
import { useTranslation } from "react-i18next";
import { formatPrice } from "~/utils/formatPrice";
import DataGrid from "~/components/dataGrid/dataGrid";
import ActionButtons from "~/components/dataGrid/actionButton";
import LoadingComp from "~/components/loadingComp";
import Modal from "~/components/modal";
import OrderProcessStatus from "~/components/orderProcessStatus";
import ShareButton from "~/components/shareButton";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "OrderCheck" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const OrderCheck = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("page_title.home"), path: '/' },
    { label: t("page_title.order_check"), path: '/order-check' },
  ];

  const dispatch = useAppDispatch();
  const { orders, loading, error, filters, pagination, } = useAppSelector(state => state.orders);

  const currentPage = pagination?.page || 1;
  const pageSize = pagination?.pageSize || 10;
  const totalPages = pagination?.pageCount || 1;

  // Local state for the search input
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null); // Holds the data of the selected order
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleSearchClick = () => {
    const trimmedQuery = searchQuery.trim();

    // Prevent submission when the search input is empty
    if (!trimmedQuery) {
      toast.warn("Please enter a search term before searching.")
      console.log("Search query is empty. Please enter a value.");
      return;
    }

    // Check if the search query matches the current filter to prevent redundant requests
    if (filters.purchaseOrder === trimmedQuery) {
      console.log("Search query matches current data. Skipping request.");
      return;
    }

    const updatedFilters = { ...filters, purchaseOrder: trimmedQuery };

    dispatch(setFilters(updatedFilters));
    dispatch(fetchOrders({ page: currentPage, pageSize, filters: updatedFilters }));
  };

  // Modal open and close handlers
  const openModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsShareModalOpen(false); // Close both modals
    setSelectedOrder(null);
  };


  const openShareModal = (order: any) => {
    setSelectedOrder(order);
    setIsShareModalOpen(true); // Open the share modal
  };

  // Define actions for buttons
  const handleView = (row: any) => {
    openModal(row); // Open modal with selected order data
    console.log("View button clicked for:", row);
  };

  const handlePrint = (row: any) => {
    console.log("Print button clicked for:", row);
  };

  const handleShare = (row: any) => {
    openShareModal(row); // Open modal with share options
    console.log("Share button clicked for:", row);
  };

  // Columns definition
  const columnDefs = [
    {
      headerName: t("dataGrid.headerName.status"),
      field: "status",
      sortable: false,
      filter: false,
      width: 150, // Set a fixed width for the status column
      cellStyle: { textAlign: "center" }, // Center the text if needed
      resizable: false,
    },
    {
      headerName: t("dataGrid.headerName.purchaseOrder"),
      field: "purchaseOrder",
      sortable: false,
      filter: false,
      flex: 1
    },
    {
      headerName: t("dataGrid.headerName.items"),
      field: "items",
      cellRenderer: (params: any) => {
        if (!params.value || !Array.isArray(params.value)) return "-";
        return params.value.map((item: any) =>
          `${item.name} (x${item.lineQuantity}) - ${formatPrice(item.lineAmount)}`
        ).join('');
      },
      sortable: false,
      filter: false,
      flex: 1
    },
    {
      headerName: t("dataGrid.headerName.totalAmount"),
      field: "totalAmount",
      valueFormatter: (params: any) => formatPrice(params.value),
      sortable: false,
      filter: false,
      resizable: false,
    },
    {
      headerName: t("dataGrid.headerName.actions"),
      field: "actions",
      cellRenderer: (params: any) => (
        <ActionButtons
          row={params.data}
          onView={handleView}
          onPrint={handlePrint}
          onShare={handleShare}
        />
      ),
      pinned: "right",
      filter: false,
      sortable: false,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
  ];

  const handleRowClicked = (event: any) => {
    console.log('Row clicked', event.data);
  };


  return (
    <div className="store-container">
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold mb-4">{t("page_title.order_check")}</h1>
        {/* Search Input */}
        <div className="flex space-x-2 justify-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick(); // Trigger search on Enter key press
              }
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("input.search_purchase_order.placeholder")}
            className="w-96 h-10 rounded border-gray-300 text-sm"
          />
          <button
            onClick={handleSearchClick}
            className="px-4 py-2 text-white rounded shadow-md hover:shadow-lg bg-orange-900 hover:bg-orange-800"
          >
            Kiểm tra
          </button>
        </div>

        {loading &&
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
            <LoadingComp message="Loading, please wait..." />
          </div>
        }
        {error && <div>Error: {error}</div>}

        <DataGrid
          rowData={orders}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={pageSize}
          onRowClicked={handleRowClicked}
          height="300px"
          lottieSrc="https://lottie.host/embed/35e4c536-4034-4737-a2cc-2852b01d2b4b/lL86Lcve9X.lottie"
          image="/assets/empty-cart.png"
        />
        {/* Modal for viewing order details */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            <>
              <div className="flex">
                <div className="flex-auto w-64">
                  <strong className="block text-xs text-gray-500 dark:text-gray-400">Purchase Order:</strong>
                  {selectedOrder?.purchaseOrder}
                </div>
                <div className="flex-auto w-14 text-end">
                  <strong className="block text-xs text-gray-500 dark:text-gray-400">Total Amount:</strong>
                  {formatPrice(selectedOrder?.totalAmount)}
                </div>
              </div>
            </>
          }
          content={
            <div className="flex flex-col">
              <OrderProcessStatus />
            </div>
          }
          actions={
            <>
              <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded-md mr-2">Close</button>
              <button onClick={() => alert('Print action')} className="px-4 py-2 bg-blue-500 text-white rounded-md">Print</button>
            </>
          }
        />
        {/* Modal for sharing */}
        <Modal
          isOpen={isShareModalOpen}
          size="small"
          onClose={closeModal}
          title={
            <>
              <div className="flex">
                <div className="flex-auto w-64">
                  <strong className="block text-xs text-gray-500 dark:text-gray-400">Purchase Order:</strong>
                  {selectedOrder?.purchaseOrder}
                </div>
                <div className="flex-auto w-14 text-end">
                  <strong className="block text-xs text-gray-500 dark:text-gray-400">Total Amount:</strong>
                  {formatPrice(selectedOrder?.totalAmount)}
                </div>
              </div>
            </>
          }
          content={
            <div className="flex flex-col">
              <div className="flex items-center space-x-3">
                <label className="text-xs text-gray-500 dark:text-gray-400">Chia sẻ</label>
                <div className="share-options inline-flex gap-3 rounded-md shadow-xs">
                  <ShareButton
                    platform="messenger"
                    message={`Check out this order: ${selectedOrder?.purchaseOrder}`}
                    url={`http://example.com/order/${selectedOrder?.id}`}
                  />
                  <ShareButton
                    platform="whatsapp"
                    message={`Check out this order: ${selectedOrder?.purchaseOrder}`}
                    url={`http://example.com/order/${selectedOrder?.id}`}
                  />
                  <ShareButton
                    platform="zalo"
                    message={`Check out this order: ${selectedOrder?.purchaseOrder}`}
                    url={`http://example.com/order/${selectedOrder?.id}`}
                  />
                </div>
              </div>
            </div>
          }
          actions={
            <>
              <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded-md mr-2">Close</button>
            </>
          }
        />
      </div>
    </div>
  );
};

export default OrderCheck;
