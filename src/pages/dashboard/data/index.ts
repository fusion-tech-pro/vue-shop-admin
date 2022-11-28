import type { QTableProps } from "quasar";
import type { Product } from "@/core/models/Product";

export const dataCards = [
  {
    title: "Total Revenue",
    text: "(Last 30 Days)",
    total: "$0.00",
  },
  { title: "Total Order", text: "(Last 30 Days)", total: 0 },
  { title: "Todays Revenue", text: "qqq", total: "$10" },
  { title: "Total Shops", text: "", total: 15 },
];

export const columns: QTableProps["columns"] = [
  {
    name: "name",
    required: true,
    label: "Tracking Number",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Total",
    field: "calories",
    sortable: true,
  },
  { name: "protein", align: "center", label: "Amount", field: "protein" },
  { name: "sodium", align: "center", label: "Weight", field: "sodium" },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
  },
];

export const rows = [
  {
    name: "CGG82oQZc4i8",
    calories: 159,
    protein: 4.0,
    sodium: 87,
    status: "Order Received",
  },
  {
    name: "wkmlTz3qHjU9",
    calories: 237,
    protein: 4.3,
    sodium: 129,
    status: "Order Received",
  },
  {
    name: "4uZX1gNyJKjz",
    calories: 262,
    protein: 6.0,
    sodium: 337,
    status: "Order Received",
  },
  {
    name: "9zGcWzO0smNx",
    calories: 305,
    protein: 4.3,
    sodium: 413,
    status: "Order Received",
  },
  {
    name: "euGGTn4iUocU",
    calories: 356,
    protein: 3.9,
    sodium: 327,
    status: "Order Received",
  },
  {
    name: "rh3Az9KeBi2j",
    calories: 375,
    protein: 0.0,
    sodium: 50,
    status: "Order Received",
  },
  {
    name: "5AuxKlioauOQ",
    calories: 392,
    protein: 0,
    sodium: 38,
    status: "Order Received",
  },
  {
    name: "6yOXda60zpQ5",
    calories: 408,
    protein: 6.5,
    sodium: 562,
    status: "Order Received",
  },
  {
    name: "inZxfXR6wBS7",
    calories: 452,
    protein: 4.9,
    sodium: 326,
    status: "Order Received",
  },
  {
    name: "X13tfrF6mPk3",
    calories: 518,
    protein: 7,
    sodium: 54,
    status: "Order Received",
  },
];

export const rowsTemp = [
  {
    name: "X13tsddF6mPk3",
    calories: 250,
    protein: 5.0,
    sodium: 300,
    status: "Order Received",
  },
  {
    name: "Z1dffrF6cSk5",
    calories: 200,
    protein: 3,
    sodium: 400,
    status: "Order Received",
  },
];

export const chartCategories = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "Juli",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ChartData = [30, 40, 45, 50, 49, 60, 70, 81, 87, 0, 0, 0];

export const productColumns: QTableProps["columns"] = [
  {
    name: "image",
    required: true,
    label: "Image",
    align: "left",

    field: (row: Product) => row.image,
    format: (val: string) => `${val}`,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",

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
];
