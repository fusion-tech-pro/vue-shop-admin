<template>
  <div v-if="shopsRow !== null">
    <q-table
      :rows="shopsRow"
      :columns="columns"
      v-model:pagination="pagination"
      hide-pagination
      row-key="name"
      class="shops-table__wrapper"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click="props.selected = !props.selected"
          v-model="props.row.selected"
          v-model:selected="selected"
        >
          <q-td key="logo" :props="props">
            <q-img
              :src="props.row.logo"
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
          <q-td key="ownerName" :props="props">
            {{ props.row.ownerName }}
          </q-td>
          <q-td key="products" :props="props">
            {{ props.row.totalProducts }}
          </q-td>
          <q-td key="orders" :props="props">
            {{ props.row.totalOrders }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge
              :color="props.row.status === 'active' ? 'primary' : 'red'"
              class="q-pa-sm"
              rounded
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              size="md"
              color="red"
              flat
              dense
              @click="toggleConfirmModal(true, props.row.id)"
              icon="ion-close-circle"
            />
            <q-btn
              size="md"
              color="grey-8"
              flat
              dense
              @click="openShopPage(props.row.id, props.row.name)"
              icon="ion-eye"
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

  <ConfirmModal
    :opened="confirmModalOpened"
    :itemId="selectedShopId"
    :iconName="'done'"
    :subtitle="'Are you sure?'"
    :cancelButtonText="'Cancel'"
    :submitButtonText="'Submit'"
    @change-visibility="toggleConfirmModal"
    @confirmEmit="changeShopStatus"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Shop } from "@/core/models/Shop";
import { useShopsStore } from "@/stores/shops";
import { shopsColumns } from "../assetsData/index";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal.vue";

export default defineComponent({
  components: { ConfirmModal },
  setup() {
    const shopsStore = useShopsStore();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 2,
    });

    return {
      columns: shopsColumns,
      pagination,
      shopsStore,
      selected: ref<[] | null>(null),
    };
  },
  props: {
    shopsRow: {
      required: true,
      type: Array<Shop>,
    },
  },
  data() {
    return {
      selectedShopId: 0,
      editModalOpened: false,
      confirmModalOpened: false,
    };
  },
  methods: {
    openShopPage(id: number, name: string) {
      this.$router.push({
        path: `shop/:${name}/${id}`,
      });
    },
    toggleConfirmModal(value: boolean, productId?: number) {
      this.selectedShopId = productId as number;
      this.confirmModalOpened = value;
    },
    changeShopStatus(id: number) {
      this.shopsStore.changeStatusShop(id);
      this.toggleConfirmModal(false);
    },
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.shopsRow?.length / this.pagination.rowsPerPage);
    },
  },
});
</script>

<style scoped lang="scss">
.shops-table__wrapper {
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
