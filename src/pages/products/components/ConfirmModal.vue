<template>
  <q-dialog v-model="isOpenValue">
    <q-card class="confirm-modal__wrapper">
      <q-btn
        icon="close"
        class="self-end"
        flat
        round
        dense
        v-close-popup
        @click="$emit('changeVisibility', false)"
      />
      <q-icon
        name="delete"
        size="48px"
        color="primary"
        class="confirm-modal__icon"
      />
      <h2 class="confirm-modal__title">Delete</h2>
      <p class="confirm-modal__subtitle">Are you sure, you want to delete?</p>
      <div class="confirm-modal__buttons-wrapper">
        <q-btn
          class="full-width"
          color="primary"
          type="submit"
          @click="$emit('changeVisibility', false)"
          >Cancel</q-btn
        >
        <q-btn
          class="full-width"
          color="red-8"
          size="md"
          type="submit"
          @click="confirm"
          >Delete</q-btn
        >
      </div>
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
    productId: {
      required: true,
      type: Number,
    },
  },
  emits: {
    remove: (productId: number) => true,
    changeVisibility(value: boolean) {
      return true;
    },
  },
  data() {
    return {};
  },
  methods: {
    confirm() {
      this.$emit("remove", this.productId);
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

<style scoped lang="scss">
.confirm-modal__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 24px;
}

.confirm-modal__icon {
  margin: 16px auto;
}
.confirm-modal__title {
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin: 0;
  margin-bottom: 12px;
}

.confirm-modal__subtitle {
  line-height: 1.625;
  opacity: 0.7;
  margin-bottom: 32px;
}
.confirm-modal__buttons-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
}
</style>
