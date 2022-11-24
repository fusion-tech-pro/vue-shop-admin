<template>
  <SearchBar
    :title="'Shops'"
    @getSearchValue="getSearchedShopValue"
    :isFiltersShow="false"
    :isAddButtonShow="false"
  />

  <ShopsTable :shopsRow="(getFilteredShops as Shop[])" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useShopsStore } from "@/stores/shops";
import SearchBar from "../../components/SearchBar/SearchBar.vue";
import ShopsTable from "./components/ShopsTable.vue";
import type { Shop } from "@/core/models/Shop";

export default defineComponent({
  components: { SearchBar, ShopsTable },

  setup() {
    const shopsStore = useShopsStore();
    shopsStore.fetchShops();

    return { shopsStore };
  },

  data() {
    return {
      searchedShop: "",
    };
  },

  methods: {
    getSearchedShopValue(value: string) {
      this.searchedShop = value;
    },
  },

  computed: {
    getFilteredShops() {
      return this.shopsStore.shops?.filter((shop) =>
        shop
          ?.name!.toLowerCase()
          .includes(String(this?.searchedShop).toLowerCase())
      );
    },
  },
});
</script>

<style scoped lang="scss"></style>
