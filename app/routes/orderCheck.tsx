// routes/orderCheck.tsx
import type { Route } from "./+types/orderCheck";
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchOrders, setFilters } from "~/features/orderSlice";
import Hero from "~/components/hero";
import Breadcrumb from "~/components/breadcrumb";
import { useTranslation } from "react-i18next";
import { formatPrice } from "~/utils/formatPrice";
import DataGrid from "~/components/dataGrid/dataGrid";
import ActionButtons from "~/components/dataGrid/actionButton";
import LoadingComp from "~/components/loadingComp";

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
    { label: t("page_title.store"), path: '/products' },
  ];

  const dispatch = useAppDispatch();
  const { orders, loading, error, filters, pagination, } = useAppSelector(state => state.orders);

  const currentPage = pagination?.page || 1;
  const pageSize = pagination?.pageSize || 10;
  const totalPages = pagination?.pageCount || 1;

  // Local state for the search input
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchClick = () => {
    const trimmedQuery = searchQuery.trim();

    // Prevent submission when the search input is empty
    if (!trimmedQuery) {
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
  
  // Define actions for buttons
  const handleView = (row: any) => {
    console.log("View button clicked for:", row);
  };

  const handlePrint = (row: any) => {
    console.log("Print button clicked for:", row);
  };

  const handleShare = (row: any) => {
    console.log("Share button clicked for:", row);
  };

  // Columns definition
  const columnDefs = [
    {
      headerName: "Order ID",
      field: "id",
      sortable: true,
      filter: true
    },
    {
      headerName: "Purchase Order",
      field: "purchaseOrder",
      sortable: true,
      filter: true,
      flex: 2
    },
    {
      headerName: "Total Amount",
      field: "totalAmount",
      valueFormatter: (params: any) => formatPrice(params.value),
      sortable: true,
      filter: true
    },
    {
      headerName: "Shipping Details",
      field: "shippingDetails", sortable: true, filter: true
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true
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
      <Hero
        title="Welcome to the OrderCheck"
        description="Browse our products and make your purchase!"
      />
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        {/* Search Input */}
        <div className="flex space-x-2 justify-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Purchase Order..."
            className="w-96 h-10 rounded border-gray-300 text-sm"
          />
          <button
            onClick={handleSearchClick}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >Search</button>
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
        />
      </div>
    </div>
  );
};

export default OrderCheck;
