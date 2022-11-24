import type { Shop } from "@/core/models/Shop";
import type { QTableProps } from "quasar";

export const shopsColumns: QTableProps["columns"] = [
  {
    name: "logo",
    required: true,
    label: "Logo",
    align: "left",

    field: (row: Shop) => row.logo,
    format: (val: string) => `${val}`,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",

    field: (row: Shop) => row.name,
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: "ownerName",
    label: "Owner name",
    field: "ownerName",
    align: "center",
  },
  {
    name: "products",
    label: "Products",
    align: "center",
    field: "totalProducts",
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "orders",
    label: "Orders",
    align: "center",
    field: "totalProducts",
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "center",
  },
  { name: "actions", label: "Actions", field: "id", align: "center" },
];
