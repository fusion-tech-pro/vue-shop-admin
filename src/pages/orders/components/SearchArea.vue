<template>
  <q-card class="shadow-1 search-area">
    <q-card-section class="row">
      <div
        class="col-xs-grow col-md-6 text-h6 text-weight-bolder q-py-sm row items-center text-center"
      >
        <div class="title">Orders</div>
      </div>
      <div class="col-xs-12 col-md-6 row items-center">
        <div class="col-xs-12 col-sm-grow">
          <SearchInput
            :searchText="searchText"
            @onChangeSearch="onChangeSearchText"
            @keyup.enter="onSubmitSearchText"
          />
        </div>
        <div class="row col-xs-12 col-sm-auto justify-center">
          <q-icon
            name="ion-more"
            size="30px"
            class="more-icon cursor-pointer"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useOrdersStore } from "@/stores/orders";
import SearchInput from "@/components/SearchInput/SearchInput.vue";

export default defineComponent({
  setup() {
    const ordersStore = useOrdersStore();
    ordersStore.getOrders();
    return {
      ordersStore,
    };
  },
  components: {
    SearchInput,
  },

  data() {
    return {
      searchText: (this.$route.query.filter as string) || "",
    };
  },
  methods: {
    onChangeSearchText(value: string) {
      this.searchText = value;
    },

    async onSubmitSearchText() {
      if (this.searchText) {
        await this.$router.push({
          path: this.$route.fullPath,
          query: { ...this.$route.query, filter: this.searchText },
        });
      } else {
        let query = Object.assign({}, this.$route.query);
        delete query.filter;
        await this.$router.replace({ query });
      }
      this.ordersStore.getOrders();
    },
  },
});
</script>

<style scoped lang="scss">
.more-icon {
  color: $gray-500;
}

.title {
  width: 100%;

  @include media-lg {
    width: auto;
  }
}

.search-area {
  padding: 0px;

  @include media-lg {
    padding: 16px;
  }
}
</style>
