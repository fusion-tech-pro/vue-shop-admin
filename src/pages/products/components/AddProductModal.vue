<template>
  <q-dialog v-model="isOpenValue">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Close icon</div>
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
          @click="$emit('changeVisibility', false)"
        />
      </q-card-section>

      <q-card-section> Add product modal </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    opened: {
      required: true,
      type: Boolean,
    },
  },
  emits: {
    changeVisibility(value: boolean) {
      return true;
    },
  },
  computed: {
    isOpenValue: {
      set(value: boolean) {
        this.$emit("changeVisibility", value);
      },
      get() {
        return this.opened;
      },
    },
  },
});
</script>
