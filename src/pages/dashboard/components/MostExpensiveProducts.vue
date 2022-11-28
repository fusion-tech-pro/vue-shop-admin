<template>
  <q-table
    :rows="productsStore.getMostPopulars"
    :columns="columns"
    row-key="name"
    hide-pagination
    :rows-per-page-options="[8]"
    class="no-shadow products-table__wrapper"
  >
    <template v-slot:top>
      <div class="q-table__title title-style">Most Expensive Products</div>
    </template>
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
          <q-img
            :src="props.row.image"
            loading="lazy"
            spinner-color="grey-8"
            :ratio="1"
            width="42px"
            height="42px"
          />
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
        <q-td key="price" :props="props"> {{ props.row.price }} $ </q-td>
        <q-td key="quantity" :props="props">
          {{ props.row.quantity }}
        </q-td>
        <q-td key="status" :props="props">
          <q-badge color="primary" class="q-pa-sm" rounded>
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="ts">
import { productColumns } from "@/pages/dashboard/data";
import { defineComponent } from "vue";
import { useProductsStore } from "@/stores/products";

export default defineComponent({
  setup() {
    const productsStore = useProductsStore();
    //   // TODO: Add this hack when API is done to fetch data normally
    //   // store.fetchUsers();
    //   // productsStore.fetchProducts();
    return {
      columns: productColumns,
      productsStore,
    };
  },
  // TODO: Remove this hack when API is done to fetch data normally
  created() {
    if (this.productsStore.products && this.productsStore.products.length) {
      return;
    }
    this.productsStore.fetchProducts();
  },
});
</script>

<style scoped lang="scss">
.products-table__wrapper {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: rgba(229, 231, 235, 0.3);
    white-space: nowrap;
    padding: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
  }
}
.title-style {
  font-weight: bold;
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
