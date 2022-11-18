<template>
  <div v-if="productsRow !== null">
    <q-table :rows="productsRow" :columns="columns" row-key="name">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="toggleEditProductModal(true, props.row)"
              :icon="'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

  <AddProductModal
    :isUpdate="true"
    :opened="editModalOpened"
    :changingProduct="selectedProduct"
    @change-visibility="toggleEditProductModal"
    @form-submit="onChangeCurrentProduct"
  />
</template>

<script lang="ts">
import type { Product } from "@/core/models/Product";
import type { ProductFormState } from "../entities/index";
import type { QTableProps } from "quasar";
import { defineComponent } from "vue";
import AddProductModal from "./AddProductModal.vue";
import { useProductsStore } from "@/stores/products";

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
];

export default defineComponent({
  components: { AddProductModal },
  setup() {
    const productsStore = useProductsStore();

    return {
      columns,
      productsStore,
    };
  },
  data() {
    return {
      selectedProduct: {} as Product,
      editModalOpened: false,
    };
  },
  props: {
    productsRow: {
      required: true,
      type: Array<Product>,
    },
  },
  methods: {
    toggleEditProductModal(value: boolean, curProduct?: Product) {
      this.selectedProduct = curProduct as Product;
      this.editModalOpened = value;
    },
    onChangeCurrentProduct(changed: ProductFormState) {
      this.productsStore.changeProduct({
        ...changed,
        image: "",
        updated_at: "",
        created_at: "",
        id: this.selectedProduct.id,
      });
      this.toggleEditProductModal(false);
    },
  },
});
</script>
