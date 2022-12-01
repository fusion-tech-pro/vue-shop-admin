<template>
  <div class="q-py-lg">
    <q-table
      :columns="orderColumns"
      :rows="ordersStore.orders"
      row-key="name"
      class="products-table__wrapper"
      hide-bottom
      :loading="ordersStore.loading"
      :rows-per-page-options="[0]"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            @click="() => onChangeSort(col.name)"
          >
            {{ col.label }}
            <q-icon
              v-if="checkSortingColumn(col.name)"
              :name="`ion-${
                checkSelectedSorting(col.name) &&
                $router.currentRoute.value.query.direction
                  ? 'arrow-dropdown'
                  : 'arrow-dropup'
              }`"
              size="20px"
              class="cursor-pointer"
              :class="{ 'default-color': !checkSelectedSorting(col.name) }"
            />
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <OrderBody :bodyProps="props"></OrderBody>
      </template>
    </q-table>
  </div>
  <div class="row justify-end q-mt-lg">
    <q-pagination
      v-model="pagination!.page"
      color="grey-7"
      active-design="push"
      active-color="primary"
      active-text-color="white"
      gutter="8px"
      size="md"
      direction-links
      outline
      push
      :max="getMaxPages"
      :max-pages="4"
      :boundary-numbers="false"
      @update:model-value="onChangePagination"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useOrdersStore } from "@/stores/orders";
import OrderBody from "./OrderBody.vue";
import { orderColumns, type PaginationParams } from "../assetsData";
import type { Pagination } from "@/data/dto/OrdersResponse";

export default defineComponent({
  props: {
    pagination: Object as PropType<Pagination>,
  },
  emits: {
    onChangePagination: (options: PaginationParams) => true,
  },
  setup() {
    const ordersStore = useOrdersStore();
    return {
      orderColumns,
      ordersStore,
    };
  },
  components: { OrderBody },
  computed: {
    getMaxPages(): number {
      return Math.ceil(+this.pagination!.count / +this.pagination!.rowsPerPage);
    },
  },
  data() {
    return {};
  },

  methods: {
    checkSortingColumn(value: string) {
      return ["totalPrice", "orderDate", "status"].includes(value);
    },

    checkSelectedSorting(value: string) {
      return this.$route.query.sortBy === value;
    },

    async onChangePagination(value: number) {
      this.$emit("onChangePagination", { key: "page", value: value });
      if (value !== 1) {
        await this.$router.push({
          path: this.$route.fullPath,
          query: { ...this.$route.query, page: value },
        });
      } else {
        const query = Object.assign({}, this.$route.query);
        delete query.page;
        await this.$router.replace({ query });
      }
    },

    async onChangeSort(value: string) {
      if (["totalPrice", "orderDate", "status"].includes(value)) {
        if (this.$route.query.sortBy == value) {
          if (this.$route.query.direction !== "DESC") {
            await this.$router.push({
              path: this.$route.fullPath,
              query: { ...this.$route.query, sortBy: value, direction: "DESC" },
            });
            this.$emit("onChangePagination", { key: "sortBy", value: value });
            this.$emit("onChangePagination", {
              key: "direction",
              value: "DESC",
            });
          } else {
            let query = Object.assign({}, this.$route.query);
            delete query.sortBy;
            delete query.direction;
            await this.$router.replace({ query });
            this.$emit("onChangePagination", { key: "sortBy", value: "" });
            this.$emit("onChangePagination", {
              key: "direction",
              value: "ASC",
            });
          }
        } else {
          let query = Object.assign({}, this.$route.query);
          query.sortBy = value;
          delete query.direction;
          await this.$router.replace({ query });
          this.$emit("onChangePagination", { key: "sortBy", value: value });
          this.$emit("onChangePagination", {
            key: "direction",
            value: "ASC",
          });
        }
      }
    },
  },
});
</script>

<style scoped lang="scss">
.products-table__wrapper {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: $gray-100;
    font-size: 14px;
    font-weight: 600;
  }
}

.default-color {
  color: $gray-400;
}
</style>
