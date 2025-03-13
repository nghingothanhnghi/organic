// types/dataGrid.ts

export interface DataGridProps {
    rowData: any[];
    columnDefs: any[];
    defaultColDefOptions?: object;
    pagination?: boolean;
    paginationPageSize?: number;
    onRowClicked?: (event: any) => void;
    height?: string;
    theme?: string;
    lottieSrc?: string; // ✅ New: Lottie animation URL (optional)
    image?: string; // ✅ New: Image URL (optional)
}

export interface ActionButtonsProps {
    row: any;
    onView: (row: any) => void;
    onPrint: (row: any) => void;
    onShare: (row: any) => void;
}