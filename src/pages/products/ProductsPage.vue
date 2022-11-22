<template>
  <div class="products-page__search-bar-wrapper shadow-1">
    <form
      class="products-page__search-bar"
      v-on:submit.prevent="onSubmitSearch"
    >
      <p class="products-page__search-bar-title">Products</p>
      <q-input
        outlined
        label="Type your query and press enter"
        type="text"
        class="products-page__search-field"
        v-model="searchProduct"
        dense
        hide-bottom-space
      >
        <template v-slot:prepend>
          <q-icon name="search" color="grey" />
        </template>

        <template v-if="searchText" v-slot:append>
          <q-icon
            name="cancel"
            @click.stop.prevent="searchText = ''"
            class="cursor-pointer"
          />
        </template>
      </q-input>
      <q-btn
        color="white"
        text-color="primary"
        label="Filter"
        class="products-page__button"
        no-caps
        dense
        flat
        @click="handleFilterClick"
      >
        <q-icon
          :name="isFiltersOpen ? 'arrow_upward' : 'arrow_downward'"
          size="xs"
          class="q-ml-sm"
        />
      </q-btn>
      <q-btn
        color="white"
        text-color="primary"
        label="Add Product"
        class="products-page__button"
        no-caps
        dense
        flat
        @click="isProductModal = true"
      />
    </form>
    <div
      v-if="isFiltersOpen"
      class="q-pt-md q-mt-md products-page__filters-wrapper"
    >
      <div class="products-page__select-wrapper">
        <label class="products-page__select-label">Filter By Group</label>
        <ProductFilter
          :modelValue="groupModel"
          :options="groupOptions"
          :label="'Filter by Group'"
          @getFilterValue="getFilterByGroupValue"
        />
      </div>
      <div class="products-page__select-wrapper">
        <label class="products-page__select-label">Filter By Shop</label>
        <ProductFilter
          :modelValue="shopModel"
          :options="shopOptions"
          :label="'Filter by Shop'"
          @getFilterValue="getFilterByShopValue"
        />
      </div>
    </div>
  </div>

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
import ProductFilter from "./components/ProductFilter.vue";

export default defineComponent({
  components: { ProductModal, ProductsTable, ProductFilter },

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
      isFiltersOpen: false,
      isProductModal: false,
    };
  },
  watch: {
    searchText() {
      this.searchProduct = this.searchText;
    },
  },
  methods: {
    getFilterByShopValue(data: string) {
      this.shopModel = data;
    },
    getFilterByGroupValue(data: string) {
      this.groupModel = data;
    },
    onSubmitSearch() {
      this.searchText = this.searchProduct;
    },
    handleFilterClick() {
      this.isFiltersOpen = !this.isFiltersOpen;
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

<style scoped lang="scss">
.products-page__search-bar-wrapper {
  background: white;
  padding: 20px;
  margin-bottom: 32px;
  border: 0 solid #ececec;
  border-radius: 5px;

  @include media-sm {
    padding: 32px;
  }
}
.products-page__search-bar {
  display: flex;
  flex-direction: column;
  width: 100%;

  align-items: center;
  justify-content: center;

  @include media-sm {
    display: grid;
    grid-template-columns: 1fr 4fr repeat(2, max-content);
    column-gap: 20px;
  }
}

.products-page__search-bar-title {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;

  @include media-sm {
    text-align: left;
    margin: 0;
  }
}

.products-page__search-field {
  width: 100%;
  margin-bottom: 10px;

  @include media-sm {
    margin: 0;
  }
}
.products-page__button {
  width: fit-content;
  justify-self: center;
  padding: 0;
  font-weight: 600;

  @include media-sm {
    justify-self: end;
  }
}

.products-page__filters-wrapper {
  border-top: 1px solid #ececec;
  display: grid;
  row-gap: 20px;

  @include media-sm {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
  }
}
.products-page__select-wrapper {
  display: flex;
  flex-direction: column;
}
.products-page__select-label {
  margin-bottom: 12px;
  font-weight: 600;
  color: rgba(75, 85, 99, 1);
}

.products-page__select-selected {
  color: rgba(75, 85, 99, 1);
  background: grey;
}
</style>
