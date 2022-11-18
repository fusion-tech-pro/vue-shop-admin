import type { Product } from "@/core/models/Product";
import type { QTableProps } from "quasar";

export const groupOptions = ["Grocery", "Clothing", "Bags"];
export const shopOptions = ["Grocery shop", "Bags shop"];

export const productColumns: QTableProps["columns"] = [
  {
    name: "image",
    required: true,
    label: "Image",
    align: "center",

    field: (row: Product) => row.image,
    format: (val: string) => `${val}`,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "center",

    field: (row: Product) => row.name,
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: "group",
    label: "Group",
    field: "group",
    align: "center",
    sortable: true,
  },
  { name: "shop", label: "Shop", field: "shop", align: "center" },
  {
    name: "productType",
    label: "Product Type",
    field: "product_type",
    align: "center",
  },
  {
    name: "price",
    label: "Price/Unit",
    field: "price",
    align: "center",
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "quantity",
    label: "Quantity",
    field: "quantity",
    align: "center",
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
