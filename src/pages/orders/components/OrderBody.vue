<template>
  <q-tr :props="bodyProps">
    <OrderRow
      :row="bodyProps?.row"
      @onChangeExpand="onChangeExpand"
      :expand="expand"
    ></OrderRow>
  </q-tr>
  <template v-if="expand">
    <q-tr
      :key="child.trackingNumber"
      v-for="child in bodyProps?.row.children"
      :props="bodyProps"
      class="child-row"
    >
      <OrderRow :row="child"></OrderRow>
    </q-tr>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderRow from "./OrderRow.vue";

export default defineComponent({
  setup() {},
  props: {
    // data type not described
    bodyProps: Object,
  },
  data() {
    return {
      expand: false,
    };
  },
  components: { OrderRow },

  methods: {
    onChangeExpand() {
      this.expand = !this.expand;
    },
  },
});
</script>

<style scoped lang="scss">
.child-row {
  background-color: $gray-150;
}

.current-color {
  color: $gray-500;
}
</style>
