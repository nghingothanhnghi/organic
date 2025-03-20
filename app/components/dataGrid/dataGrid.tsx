import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useTranslation } from 'react-i18next';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

import type { DataGridProps } from '~/types/dataGrid';

const DataGrid: React.FC<DataGridProps> = ({
  rowData = [],
  columnDefs = [],
  defaultColDefOptions = {},
  pagination = true,
  paginationPageSize = 10,
  onRowClicked,
  height = '500px',
  theme = 'ag-theme-alpine',
  lottieSrc, // Lottie animation URL
  image, // Fallback image URL
}) => {
  const {t} = useTranslation();
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    ...defaultColDefOptions,
  }), [defaultColDefOptions]);


const noRowsOverlay = `
<div className="text-center py-10">
  ${
    lottieSrc
      ? `<iframe src="${lottieSrc}" class="mx-auto mb-4 w-24 h-24" title="Lottie Animation" frameborder="0" allowfullscreen></iframe>`
      : image
      ? `<img src="${image}" alt="Empty State" class="mx-auto mb-4 w-40 h-40 object-contain" />`
      : ""
  }
  <p className="text-gray-600 mb-8">${t("dataGrid.bodyName.no_matching_results")}</p>
</div>
`;

  // Custom pagination text
  const localeText = useMemo(() => ({
    page: t("dataGrid.pagination.page"),
    to: t("dataGrid.pagination.to"),
    of: t("dataGrid.pagination.of"),
    next: t("dataGrid.pagination.next"),
    previous: t("dataGrid.pagination.previous"),
    last: t("dataGrid.pagination.last"),
    first: t("dataGrid.pagination.first"),
    loadingOoo: t("dataGrid.pagination.loading"),
    pageSize: t("dataGrid.pagination.pageSize"),
    rowPerPage: t("dataGrid.pagination.rowPerPage")
  }), [t]);

  return (
    <div className={`${theme} w-full`} style={{ height }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        onRowClicked={onRowClicked}
        overlayNoRowsTemplate={noRowsOverlay}
        localeText={localeText} 
      />
    </div>
  );
};

export default DataGrid;
