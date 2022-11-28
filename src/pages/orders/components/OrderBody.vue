<template>
  <q-tr :props="props">
    <OrderRow
      :props="props"
      :row="props?.row"
      @onChangeExpand="onChangeExpand"
      :expand="expand"
    ></OrderRow>
  </q-tr>
  <template v-if="expand">
    <q-tr
      :key="child.trackingNumber"
      v-for="child in props?.row.children"
      :props="props"
      class="child-row"
    >
      <OrderRow :props="props" :row="child"></OrderRow>
    </q-tr>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderRow from "./OrderRow.vue";

export default defineComponent({
  inheritAttrs: false,
  setup() {},
  props: {
    props: Object,
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
