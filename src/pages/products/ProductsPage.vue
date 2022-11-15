<template>
  <div class="column q-pa-md q-mb-lg bg-white rounded-borders">
    <p class="text-h6 text-center text-bold">Products</p>
    <q-input
      outlined
      label="Type your query and press enter"
      type="text"
      class="q-mb-sm"
      v-model.trim="this.searchProductText"
      v-on:keyup.enter="this.handleSearchProducts"
    />
    <q-btn
      color="white"
      text-color="primary"
      label="Filter"
      flat
      @click="this.handleFilterClick"
    />
    <div
      v-if="this.isFiltersOpen"
      class="q-pt-md q-mt-md products-page__filters-wrapper"
    >
      <q-input
        outlined
        label="Filter by Group"
        type="text"
        class="q-mb-sm"
        v-model.trim="this.searchGroupText"
      />
      <q-input
        outlined
        label="Filter by Category"
        type="text"
        class="q-mb-sm"
        v-model.trim="this.searchCategoryText"
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

  <!-- <q-dialog v-model="isAddProductModal">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Close icon</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section> Filter modal </q-card-section>
    </q-card>
  </q-dialog> -->

  <AddProductModal
    :opened="isAddProductModal"
    @close="isAddProductModal = false"
  />
  <ProductsTable />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AddProductModal from "./components/AddProductModal.vue";
import ProductsTable from "./components/ProductsTable.vue";

export default defineComponent({
  components: { AddProductModal, ProductsTable },
  data() {
    return {
      searchProductText: "",
      searchGroupText: "",
      searchCategoryText: "",
      isFiltersOpen: false,
      isAddProductModal: ref(false),
    };
  },
  watch: {
    searchGroupText() {
      // TODO add filtering products by groups
    },
    searchCategoryText() {
      // TODO add filtering products by category
    },
  },
  methods: {
    handleFilterClick() {
      this.isFiltersOpen = !this.isFiltersOpen;
    },
    handleSearchProducts() {
      if (this.searchProductText.length < 1) {
        return;
      }
      // TODO add filtering product with name's
    },
  },
});
</script>

<style scoped>
.products-page__filters-wrapper {
  border-top: 1px solid #ececec;
}
</style>
