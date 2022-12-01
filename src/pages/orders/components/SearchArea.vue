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
          <SearchInput v-model="searchText" @keyup.enter="onSubmitSearchText" />
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
import { defineComponent, type PropType } from "vue";
import type { Pagination } from "@/data/dto/OrdersResponse";
import SearchInput from "@/components/SearchInput/SearchInput.vue";
import type { PaginationParams } from "../assetsData";

export default defineComponent({
  props: {
    pagination: Object as PropType<Pagination>,
  },
  emits: {
    onChangePagination: (options: PaginationParams) => true,
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
      this.$emit("onChangePagination", {
        key: "filter",
        value: this.searchText,
      });
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
