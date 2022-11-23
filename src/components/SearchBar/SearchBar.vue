<template>
  <div class="search-bar__wrapper shadow-1">
    <form class="search-bar__search-form" v-on:submit.prevent="onSubmitSearch">
      <p class="search-bar__search-title">{{ title }}</p>
      <q-input
        outlined
        label="Type your query and press enter"
        type="text"
        class="search-bar__search-field"
        v-model="searchRowValue"
        dense
        @update:model-value="searchText = ''"
        hide-bottom-space
        :class="{}"
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

      <template v-if="isFiltersShow">
        <q-btn
          color="white"
          text-color="primary"
          label="Filter"
          class="search-bar__button"
          no-caps
          dense
          flat
          @click="handleFilterClick"
        >
          <q-icon
            :name="isFiltersOpen ? 'arrow_upward' : 'arrow_downward'"
            size="xs"
            class="q-ml-sm"
          />
        </q-btn>
      </template>

      <template v-if="isAddButtonShow">
        <q-btn
          color="white"
          text-color="primary"
          :label="addButtonTitle"
          class="search-bar__button"
          no-caps
          dense
          flat
          @click="onAddButtonClick"
        />
      </template>
    </form>

    <div
      v-if="isFiltersOpen"
      class="q-pt-md q-mt-md search-bar__filters-wrapper"
    >
      <div class="search-bar__select-wrapper">
        <label class="search-bar__select-label">{{ leftFilterLabel }}</label>
        <CustomFilter
          :modelValue="leftFilterModelValue"
          :options="leftFilterOptions ?? []"
          :label="leftFilterLabel"
          @getFilterValue="getLeftFilterValues"
        />
      </div>
      <div class="search-bar__select-wrapper">
        <label class="search-bar__select-label">{{ rightFilterLabel }}</label>
        <CustomFilter
          :modelValue="rightFilterModelValue"
          :options="rightFilterOptions ?? []"
          :label="rightFilterLabel"
          @getFilterValue="getRightFilterValues"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomFilter from "../CustomFilter/CustomFilter.vue";

export default defineComponent({
  components: { CustomFilter },
  props: {
    title: {
      required: true,
      type: String,
    },
    isFiltersShow: {
      required: false,
      type: Boolean,
      default: true,
    },
    isAddButtonShow: {
      required: false,
      type: Boolean,
      default: true,
    },
    addButtonTitle: {
      required: false,
      type: String,
    },
    addButtonFunction: {
      required: false,
      type: Function,
    },
    leftFilterLabel: {
      required: false,
      type: String,
    },
    rightFilterLabel: {
      required: false,
      type: String,
    },
    leftFilterModelValue: {
      required: false,
      type: null,
    },
    leftFilterOptions: {
      required: false,
      type: Array<String>,
    },
    rightFilterModelValue: {
      required: false,
      type: null,
    },
    rightFilterOptions: {
      required: false,
      type: Array<String>,
    },
  },
  data() {
    return {
      searchRowValue: "",
      searchText: "",
      isFiltersOpen: false,
    };
  },
  watch: {
    searchText() {
      this.searchRowValue = this.searchText;
      this.getValue();
    },
  },
  methods: {
    handleFilterClick() {
      this.isFiltersOpen = !this.isFiltersOpen;
    },
    onSubmitSearch() {
      this.searchText = this.searchRowValue;
    },
    getValue() {
      this.$emit("getSearchValue", this.searchRowValue);
    },
    onAddButtonClick() {
      this.$emit("addButtonFunction");
    },
    getLeftFilterValues(data: string) {
      this.$emit("getLeftFilterValue", data);
    },
    getRightFilterValues(data: string) {
      this.$emit("getRightFilterValue", data);
    },
  },
});
</script>

<style scoped lang="scss">
.search-bar__wrapper {
  background: white;
  padding: 20px;
  margin-bottom: 32px;
  border: 0 solid #ececec;
  border-radius: 5px;

  @include media-sm {
    padding: 32px;
  }
}
.search-bar__search-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;

  @include media-sm {
    display: grid;
    grid-template-columns: 1fr 4fr repeat(2, max-content);
  }
}
.search-bar__search-title {
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
.search-bar__search-field {
  width: 100%;
  margin-bottom: 10px;

  @include media-sm {
    margin: 0;
  }
}

.search-bar__button {
  width: fit-content;
  justify-self: center;
  padding: 0;
  font-weight: 600;
  margin-left: 20px;

  @include media-sm {
    justify-self: end;
  }
}

.search-bar__filters-wrapper {
  border-top: 1px solid #ececec;
  display: grid;
  row-gap: 20px;

  @include media-sm {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
  }
}
.search-bar__select-wrapper {
  display: flex;
  flex-direction: column;
}
.search-bar__select-label {
  margin-bottom: 12px;
  font-weight: 600;
  color: rgba(75, 85, 99, 1);
}

.search-bar__select-selected {
  color: rgba(75, 85, 99, 1);
  background: grey;
}
</style>
