<template>
  <div class="products-page__search-bar-wrapper shadow-1">
    <div class="products-page__search-bar">
      <p class="products-page__search-bar-title">Products</p>
      <q-input
        outlined
        label="Type your query and press enter"
        type="text"
        class="products-page__search-field"
        dense
        hide-bottom-space
        v-model.trim="searchProductText"
      >
        <template v-slot:prepend>
          <q-icon name="search" color="grey" />
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
        @click="isAddProductModal = true"
      />
    </div>
    <div
      v-if="isFiltersOpen"
      class="q-pt-md q-mt-md products-page__filters-wrapper"
    >
      <div class="products-page__select-wrapper">
        <label class="products-page__select-label">Filter By Group</label>
        <q-select
          outlined
          v-model.trim="searchGroupText"
          :options="groupOptions"
          label="Filter by Group"
          bg-color="white"
          dense
        />
      </div>
      <div class="products-page__select-wrapper">
        <label class="products-page__select-label">Filter By Shop</label>
        <q-select
          outlined
          v-model.trim="searchShopText"
          :options="shopOptions"
          label="Filter by Shop"
          bg-color="white"
          dense
        />
      </div>
    </div>
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
import type { ProductFormState } from "./entities/index";
import { useProductsStore } from "@/stores/products";
import { defineComponent } from "vue";
import { groupOptions, shopOptions } from "./assetsData";
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
      groupOptions,
      shopOptions,
    };
  },
  methods: {
    handleFilterClick() {
      this.isFiltersOpen = !this.isFiltersOpen;
    },
    setModalVisibleStatus(status: boolean) {
      this.isAddProductModal = status;
    },
    onCreateNewProduct(values: ProductFormState) {
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
      if (this.searchGroupText) {
        return this.productsStore?.products?.filter((product) =>
          product
            ?.group!.toLowerCase()
            .includes(this.searchGroupText.toLowerCase())
        ) as Array<Product>;
      } else if (this.searchShopText) {
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
</style>
