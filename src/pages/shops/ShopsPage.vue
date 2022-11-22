<template>
  <div class="shops-page__search-bar-wrapper shadow-1">
    <form class="shops-page__search-bar" v-on:submit.prevent="onSubmitSearch">
      <p class="shops-page__search-bar-title">Shops</p>
      <q-input
        outlined
        label="Type your query and press enter"
        type="text"
        class="shops-page__search-field"
        v-model="searchShop"
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
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useShopsStore } from "@/stores/shops";

export default defineComponent({
  components: {},

  setup() {
    const shopsStore = useShopsStore();
    shopsStore.fetchShops();

    return { shopsStore };
  },

  data() {
    return {
      searchShop: "",
      searchText: "",
    };
  },

  watch: {
    searchText() {
      this.searchShop = this.searchText;
    },
  },

  methods: {
    onSubmitSearch() {
      this.searchText = this.searchShop;
    },
  },
  mounted() {
    console.log("shops", this.shopsStore.getShops);
  },
});
</script>

<style scoped lang="scss">
.shops-page__search-bar-wrapper {
  background: white;
  padding: 20px;
  margin-bottom: 32px;
  border: 0 solid #ececec;
  border-radius: 5px;

  @include media-sm {
    padding: 32px;
  }
}
.shops-page__search-bar {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;

  @include media-sm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  }
}
.shops-page__search-bar-title {
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
.shops-page__search-field {
  width: 100%;
  margin-bottom: 10px;

  @include media-sm {
    margin: 0;
  }
}
</style>
