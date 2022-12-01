import type { QTableProps } from "quasar";

type CountablePagination = {
  key: "count" | "page" | "rowsPerPage";
  value: number;
};

type UncountablePagination = {
  key: "filter" | "sortBy";
  value: string;
};

type DirectionPagination = {
  key: "direction";
  value: "DESC" | "ASC";
};

export type PaginationParams =
  | CountablePagination
  | UncountablePagination
  | DirectionPagination;

export const orderColumns: QTableProps["columns"] = [
  {
    name: "more",
    label: "",
    align: "right",
    field: "more",
    headerClasses: "q-table--col-auto-width",
  },
  {
    name: "trackingNumber",
    required: true,
    label: "Tracking Number",
    align: "center",
    field: "trackingNumber",
    headerClasses: "q-table--col-auto-width",
  },
  {
    name: "deliveryFee",
    label: "Delivery Fee",
    field: "deliveryFee",
    align: "center",
  },
  {
    name: "totalPrice",
    label: "Total",
    field: "totalPrice",
    align: "center",
  },
  {
    name: "orderDate",
    label: "Order Date",
    field: "orderDate",
    align: "center",
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
  },
  {
    name: "address",
    label: "Shipping Address",
    field: "address",
    align: "left",
    classes: "address-area",
    headerStyle: "max-width: 2000px; min-width: 190px",
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
    align: "center",
    headerClasses: "q-table--col-auto-width",
  },
];
