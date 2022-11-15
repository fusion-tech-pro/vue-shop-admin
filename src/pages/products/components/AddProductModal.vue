<template>
  <q-dialog :v-model="opened">
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
          @click="$emit('close')"
        />
      </q-card-section>

      <q-card-section> Add product modal </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
export default {
  props: {
    opened: {
      required: true,
      type: Boolean,
    },
  },
  emits: ["close"],
};
</script>
