<template>
  <div class="column q-pa-md q-mb-lg bg-white rounded-borders">
    <p class="text-h6 text-center text-bold">Products</p>
    <q-input
      outlined
      label="Type your query and press enter"
      type="text"
      class="q-mb-sm"
      v-model.trim="searchProductText"
    />
    <q-btn
      color="white"
      text-color="primary"
      label="Filter"
      flat
      @click="handleFilterClick"
    />
    <div
      v-if="isFiltersOpen"
      class="q-pt-md q-mt-md products-page__filters-wrapper"
    >
      <q-input
        outlined
        label="Filter by Group"
        type="text"
        class="q-mb-sm"
        v-model.trim="searchGroupText"
      />
      <q-input
        outlined
        label="Filter by Shop"
        type="text"
        class="q-mb-sm"
        v-model.trim="searchShopText"
      />
    </div>
    <q-btn
      color="white"
      text-color="primary"
      label="Add Product"
      flat
      @click="isAddProductModal = true"
    />
  </div>

  <ProductsTable :productsRow="filteredProducts" />

  <AddProductModal
    :opened="isAddProductModal"
    @change-visibility="setModalVisibleStatus"
    @form-submit="onCreateNewProduct"
  />
</template>

<script lang="ts">
import type { Product } from "@/core/models/Product";
import type { AddNewProductFormState } from "./entities/index";
import { useProductsStore } from "@/stores/products";
import { defineComponent } from "vue";
import AddProductModal from "./components/AddProductModal.vue";
import ProductsTable from "./components/ProductsTable.vue";

export default defineComponent({
  components: { AddProductModal, ProductsTable },

  setup() {
    const productsStore = useProductsStore();
    productsStore.fetchProducts();
    return { productsStore };
  },

  data() {
    return {
      searchProductText: "",
      searchGroupText: "",
      searchShopText: "",
      isFiltersOpen: false,
      isAddProductModal: false,
    };
  },
  methods: {
    handleFilterClick() {
      this.isFiltersOpen = !this.isFiltersOpen;
    },
    setModalVisibleStatus(status: boolean) {
      this.isAddProductModal = status;
    },
    onCreateNewProduct(values: AddNewProductFormState) {
      this.productsStore.addNewProduct({
        ...values,
        image: "",
        created_at: "n/a",
        updated_at: "n/a",
        id: Math.floor(Math.random() * 100),
      });
      this.setModalVisibleStatus(false);
    },
  },
  computed: {
    filteredProducts() {
      if (this.searchGroupText.length > 0) {
        return this.productsStore?.products?.filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.searchGroupText.toLowerCase())
        ) as Array<Product>;
      } else if (this.searchShopText.length > 0) {
        return this.productsStore?.products?.filter((product) =>
          product.shop
            ?.toLowerCase()
            .includes(this.searchShopText.toLowerCase())
        ) as Array<Product>;
      } else if (this.searchProductText.length > 0) {
        return this.productsStore?.products?.filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.searchProductText.toLowerCase())
        ) as Array<Product>;
      } else {
        return this.productsStore.products as Array<Product>;
      }
    },
  },
});
</script>

<style scoped>
.products-page__filters-wrapper {
  border-top: 1px solid #ececec;
}
</style>
