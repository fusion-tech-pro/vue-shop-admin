<template>
  <SearchBar
    :title="'Products'"
    @getSearchValue="getSearchedProductValue"
    :addButtonTitle="'Add Product'"
    @addButtonFunction="setModalVisibleStatus(true)"
    :leftFilterLabel="'Filter By Group'"
    :leftFilterModelValue="groupModel"
    :leftFilterOptions="groupOptions"
    @getLeftFilterValue="getFilterByGroupValue"
    :rightFilterLabel="'Filter By Shop'"
    :rightFilterModelValue="shopModel"
    :rightFilterOptions="shopOptions"
    @getRightFilterValue="getFilterByShopValue"
  />

  <ProductsTable :productsRow="(filteredProducts as Product[])" />

  <ProductModal
    :opened="isProductModal"
    @change-visibility="setModalVisibleStatus"
    @form-submit="onCreateNewProduct"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useProductsStore } from "@/stores/products";
import { groupOptions, shopOptions } from "./assetsData";
import type { ProductFormState } from "./entities/index";
import type { Product } from "@/core/models/Product";
import ProductModal from "./components/ProductModal.vue";
import ProductsTable from "./components/ProductsTable.vue";
import SearchBar from "../../components/SearchBar/SearchBar.vue";

export default defineComponent({
  components: { ProductModal, ProductsTable, SearchBar },

  setup() {
    const productsStore = useProductsStore();
    productsStore.fetchProducts();

    return {
      productsStore,
      groupOptions,
      shopOptions,
      shopModel: ref<string | null>(null),
      groupModel: ref<string | null>(null),
    };
  },

  data() {
    return {
      searchProduct: "",
      searchText: "",
      searchedProduct: "",
      isProductModal: false,
    };
  },
  watch: {
    searchText() {
      this.searchProduct = this.searchText;
    },
  },
  methods: {
    getSearchedProductValue(value: string) {
      this.searchedProduct = value;
    },
    getFilterByShopValue(data: string) {
      this.shopModel = data;
    },
    getFilterByGroupValue(data: string) {
      this.groupModel = data;
    },
    onSubmitSearch() {
      this.searchText = this.searchProduct;
    },

    setModalVisibleStatus(status: boolean) {
      this.isProductModal = status;
    },
    onCreateNewProduct(values: ProductFormState) {
      this.productsStore.addNewProduct({
        ...values,
        created_at: "n/a",
        updated_at: "n/a",
        id: Math.floor(Math.random() * 100),
      });
      this.setModalVisibleStatus(false);
    },
  },
  computed: {
    filteredProducts() {
      if (this.groupModel !== null) {
        return this.productsStore.products?.filter((product) =>
          product
            ?.group!.toLowerCase()
            .includes(String(this?.groupModel).toLowerCase())
        );
      } else if (this.shopModel !== null) {
        return this.productsStore.products?.filter((product) =>
          product.shop
            ?.toLowerCase()
            .includes(String(this?.shopModel).toLowerCase())
        );
      } else if (this.searchText) {
        return this.productsStore.products?.filter((product) =>
          product.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else {
        return this.productsStore.products;
      }
    },
  },
});
</script>
