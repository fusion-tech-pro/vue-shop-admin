<template>
  <q-input
    :label="label"
    outlined
    :type="isViewPassword ? 'text' : 'password'"
    :model-value="value"
    :error-message="errorMessage"
    :error="!!errorMessage"
  >
    <template v-slot:append>
      <q-icon
        :name="isViewPassword ? 'visibility' : 'visibility_off'"
        class="cursor-pointer"
        @click="onChangeView"
      />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: String,
    value: String,
    errorMessage: String,
  },
  data() {
    return {
      isViewPassword: false,
    };
  },
  methods: {
    onChangeView() {
      this.isViewPassword = !this.isViewPassword;
    },
  },
});
</script>

<style scoped></style>
