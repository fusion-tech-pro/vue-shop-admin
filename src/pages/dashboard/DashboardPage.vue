<template>
  <div style="min-height: 100vh">
    <MyCards />

    <BarChart :height="200" class="q-mb-lg" style="background-color: white" />

    <RecentOrdersTable />

    <MostExpensiveProducts />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyCards from "./components/MyCards.vue";
import RecentOrdersTable from "./components/RecentOrdersTable.vue";
import MostExpensiveProducts from "./components/MostExpensiveProducts.vue";
import BarChart from "./components/BarChart.vue";

export default defineComponent({
  components: {
    MyCards,
    RecentOrdersTable,
    MostExpensiveProducts,
    BarChart,
  },
});
</script>

<style scoped lang="scss"></style>
