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
import SearchInput from "@/components/SearchInput/SearchInput.vue";

export default defineComponent({
  props: {
    searchText: String,
  },
  emits: {
    onChangeSearchText: (value: string) => true,
  },
  components: {
    SearchInput,
  },

  data() {
    return {};
  },
  methods: {
    onChangeSearchText(value: string) {
      this.$emit("onChangeSearchText", value);
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
