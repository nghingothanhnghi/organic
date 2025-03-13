import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

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
  <p className="text-gray-600 mb-8">No matching results</p>
</div>
`;

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
      />
    </div>
  );
};

export default DataGrid;
