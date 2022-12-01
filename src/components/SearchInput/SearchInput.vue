<template>
  <q-input
    outlined
    v-model="searchText"
    placeholder="Type your query and press enter"
  >
    <template v-slot:prepend>
      <q-icon name="ion-search" />
    </template>
    <template v-if="!!searchText" v-slot:append>
      <q-icon name="close" @click="searchText = ''" class="cursor-pointer" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["modelValue"],
  emits: ["update:modelValue"],

  data() {
    return {};
  },

  computed: {
    searchText: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>

<style scoped></style>
