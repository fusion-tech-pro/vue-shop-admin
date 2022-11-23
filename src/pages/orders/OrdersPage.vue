<template>
  <div>
    <SearchArea
      :searchText="searchText"
      @onChangeSearchText="onChangeSearchText"
    ></SearchArea>
    <OrdersTable></OrdersTable>
  </div>
</template>

<script setup lang="ts">
import SearchArea from "./components/SearchArea.vue";
import { ref } from "vue";
import OrdersTable from "./components/OrdersTable.vue";

const searchText = ref("");
function onChangeSearchText(value: string) {
  searchText.value = value;
}
</script>

<style scoped lang="scss"></style>
