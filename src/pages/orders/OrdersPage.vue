<template>
  <div>
    <SearchArea
      :pagination="pagination"
      @onChangePagination="onChangePagination"
    ></SearchArea>
    <OrdersTable
      :pagination="pagination"
      @onChangePagination="onChangePagination"
    ></OrdersTable>
  </div>
</template>

<script setup lang="ts">
import router from "@/core/router";
import { watch, reactive } from "vue";
import SearchArea from "./components/SearchArea.vue";
import OrdersTable from "./components/OrdersTable.vue";
import { useOrdersStore } from "@/stores/orders";
import type { Pagination } from "@/data/dto/OrdersResponse";
import type { PaginationParams } from "./assetsData";

const ordersStore = useOrdersStore();

const pagination = reactive<Pagination>({
  ...ordersStore.pagination,
  page: router.currentRoute.value.query.page
    ? +router.currentRoute.value.query.page
    : 1,
  sortBy: router.currentRoute.value.query.sortBy
    ? router.currentRoute.value.query.sortBy + ""
    : "",
  direction: router.currentRoute.value.query.direction ? "DESC" : "ASC",
  filter: router.currentRoute.value.query.filter
    ? router.currentRoute.value.query.filter + ""
    : "",
});

ordersStore.getOrders(pagination);

const onChangePagination = (options: PaginationParams) => {
  switch (options.key) {
    case "page":
      pagination.page = options.value;
      break;

    case "filter":
      pagination.filter = options.value;
      break;

    case "sortBy":
      pagination.sortBy = options.value;
      break;

    case "direction":
      pagination.direction = options.value;
      break;
  }
};

watch(pagination, () => {
  ordersStore.getOrders(pagination);

  if (
    pagination.page == 1 &&
    router.currentRoute.value.query.page &&
    +router.currentRoute.value.query.page !== 1
  ) {
    const query = Object.assign({}, router.currentRoute.value.query);
    delete query.page;
    router.replace({ query });
  }
});
</script>

<style scoped lang="scss"></style>
