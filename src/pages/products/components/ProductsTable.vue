<template>
  <div v-if="productsRow !== null">
    <q-table
      :rows="productsRow"
      :columns="columns"
      v-model:pagination="pagination"
      hide-pagination
      row-key="name"
      class="products-table__wrapper"
    >
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
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
          <q-td key="quantity" :props="props">
            {{ props.row.quantity }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge color="primary" class="q-pa-sm" rounded>
              {{ props.row.status }}
            </q-badge>
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              size="sm"
              color="red"
              flat
              dense
              @click="toggleConfirmModal(true, props.row.id)"
              icon="ion-trash"
            />
            <q-btn
              size="sm"
              color="grey-8"
              flat
              dense
              @click="toggleEditProductModal(true, props.row)"
              icon="ion-create"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="row justify-end q-pr-sm q-mt-lg">
      <q-pagination
        v-model="pagination.page"
        color="grey-7"
        active-design="push"
        active-color="primary"
        active-text-color="white"
        gutter="8px"
        size="md"
        direction-links
        outline
        push
        :max="pagesNumber"
        :max-pages="4"
        :boundary-numbers="false"
      />
    </div>
  </div>

  <AddProductModal
    :isUpdate="true"
    :opened="editModalOpened"
    :changingProduct="selectedProduct"
    @change-visibility="toggleEditProductModal"
    @form-submit="onChangeCurrentProduct"
  />

  <ConfirmModal
    :opened="confirmModalOpened"
    :productId="selectedProductId"
    @change-visibility="toggleConfirmModal"
    @remove="removeProduct"
  />
</template>

<script lang="ts">
import type { Product } from "@/core/models/Product";
import type { ProductFormState } from "../entities/index";
import { productColumns } from "../assetsData";
import { defineComponent, ref } from "vue";
import AddProductModal from "./AddProductModal.vue";
import ConfirmModal from "./ConfirmModal.vue";
import { useProductsStore } from "@/stores/products";

export default defineComponent({
  components: { AddProductModal, ConfirmModal },
  setup() {
    const productsStore = useProductsStore();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
    });

    return {
      columns: productColumns,
      pagination,
      productsStore,
    };
  },
  data() {
    return {
      selectedProduct: {} as Product,
      selectedProductId: 0,
      editModalOpened: false,
      confirmModalOpened: false,
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
    toggleConfirmModal(value: boolean, productId?: number) {
      this.selectedProductId = productId as number;
      this.confirmModalOpened = value;
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
      this.toggleConfirmModal(false);
    },
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.productsRow.length / this.pagination.rowsPerPage);
    },
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
</style>
