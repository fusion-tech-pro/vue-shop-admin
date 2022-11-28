<template>
  <q-td key="more">
    <div
      v-if="row?.children && row.children.length"
      class="expand-icon cursor-pointer"
      @click="onChangeExpand"
    >
      <q-icon :name="expand ? 'ion-remove' : 'ion-add'" class="current-color" />
    </div>
  </q-td>
  <q-td key="trackingNumber" class="text-center">
    {{ row?.trackingNumber }}
  </q-td>
  <q-td key="deliveryFee" class="text-center">
    ${{ row?.deliveryFee.toFixed(2) }}
  </q-td>
  <q-td key="totalPrice" class="text-center">
    ${{ row?.totalPrice.toFixed(2) }}
  </q-td>
  <q-td key="orderDate" class="text-center">
    {{ formattedDate(row?.orderDate) }}
  </q-td>
  <q-td key="status" class="status-area">
    {{ row?.status }}
  </q-td>
  <q-td key="address">
    <div class="row">
      <span>{{ row?.address.district }}</span>
      <span>, {{ row?.address.city }}</span>
      <span>, {{ row?.address.state }}</span>
      <span>, {{ row?.address.zipCode }}</span>
      <span>, {{ row?.address.country }}</span>
    </div>
  </q-td>
  <q-td key="actions" class="text-center">
    <router-link :to="`${$route.path}/${row?.id}`" class="drawer-item">
      <q-icon name="ion-eye" size="24px" class="current-color cursor-pointer" />
    </router-link>
  </q-td>
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  props: {
    props: Object,
    row: Object,
    expand: Boolean,
  },
  emits: {
    onChangeExpand: () => true,
  },
  data() {
    return {};
  },
  methods: {
    onChangeExpand() {
      this.$emit("onChangeExpand");
    },

    formattedDate(value: Date) {
      return moment(value).fromNow();
    },
  },
});
</script>

<style scoped lang="scss">
tr td {
  color: $gray-500;
  font-size: 14px;
  font-weight: 400;
}

.expand-icon {
  width: 16px;
  height: 16px;
  border: 1px solid $gray-500;
  display: flex;
  justify-content: center;
  align-items: center;
}

.current-color {
  color: $gray-500;
}

.status-area {
  font-size: 14px;
  font-weight: 600;
  color: $green;
}

.drawer-item {
  color: inherit;
  text-decoration: none;
}
</style>
