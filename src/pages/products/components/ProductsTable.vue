<template>
  <div v-if="productsRow !== null">
    <q-table :rows="productsRow" :columns="columns" row-key="name">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="image" :props="props">
            {{ props.row.image }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="group" :props="props">
            {{ props.row.group }}
          </q-td>
          <q-td key="shop" :props="props">
            {{ props.row.shop }}
          </q-td>
          <q-td key="productType" :props="props">
            {{ props.row.product_type }}
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
          <q-td key="quantity" :props="props">
            {{ props.row.quantity }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge color="primary">
              {{ props.row.status }}
            </q-badge>
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              size="sm"
              color="primary"
              flat
              dense
              @click="toggleEditProductModal(true, props.row)"
              icon="ion-create"
            />
            <q-btn
              size="sm"
              color="red"
              flat
              dense
              @click="removeProduct(props.row.id)"
              icon="ion-trash"
            />
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
import { productColumns } from "../assetsData";
import { defineComponent } from "vue";
import AddProductModal from "./AddProductModal.vue";
import { useProductsStore } from "@/stores/products";

export default defineComponent({
  components: { AddProductModal },
  setup() {
    const productsStore = useProductsStore();

    return {
      columns: productColumns,
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
    removeProduct(id: number) {
      this.productsStore.removeProduct(id);
    },
  },
});
</script>
