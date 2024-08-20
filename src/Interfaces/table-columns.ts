// Interfaces used throughout the app
// We create it when it is usable in more than one component

export interface columnsInterface {
    render?: (text: string, row: any, index: number) => JSX.Element | any;
    title: string;
    dataSelector: string;
    type: any;
    width?: number;
    tagcolor?: "geekblue" | "green" | "volcano";
    sort?: boolean;
    filters?: any[];
    align?: "left" | "right" | "center";
    onCellClick?: (row: any) => void;
}
