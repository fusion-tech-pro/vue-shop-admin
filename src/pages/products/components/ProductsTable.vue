<template>
  <div v-if="props.productsRow !== null">
    <q-table :rows="props.productsRow" :columns="columns" row-key="name" />
  </div>
</template>
<script lang="ts" setup>
import type { Product } from "@/core/models/Product";
import type { QTableProps } from "quasar";
import { defineProps } from "vue";

const props = defineProps<{
  productsRow: Product[] | null;
}>();

const columns: QTableProps["columns"] = [
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
    align: "center",
    label: "Group",
    field: "group",
    sortable: true,
  },
  { name: "shop", label: "Shop", field: "shop" },
  { name: "productType", label: "Product Type", field: "product_type" },
  {
    name: "price",
    label: "Price/Unit",
    field: "price",
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "quantity",
    label: "Quantity",
    field: "quantity",
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "status",
    label: "Status",
    field: "status",
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
  },
];
</script>
