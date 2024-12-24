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
  }) => {
    const defaultColDef = useMemo(() => ({
      sortable: true,
      filter: true,
      resizable: true,
      ...defaultColDefOptions,
    }), [defaultColDefOptions]);
  
    return (
      <div className={`${theme} w-full`} style={{ height }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          onRowClicked={onRowClicked}
        />
      </div>
    );
  };
  
  export default DataGrid;
