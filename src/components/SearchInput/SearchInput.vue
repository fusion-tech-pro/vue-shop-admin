<template>
  <q-input
    outlined
    :model-value="searchText"
    placeholder="Type your query and press enter"
    @update:model-value="onChange"
  >
    <template v-slot:prepend>
      <q-icon name="ion-search" />
    </template>
    <template v-if="!!searchText!.length" v-slot:append>
      <q-icon name="close" @click="onClear" class="cursor-pointer" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    searchText: String,
  },
  emits: {
    onChangeSearch: (value: string) => true,
  },

  data() {
    return {};
  },
  methods: {
    onChange(value: string) {
      this.$emit("onChangeSearch", value);
    },

    onClear() {
      this.$emit("onChangeSearch", "");
    },
  },
});
</script>

<style scoped></style>
