<template>
  <div class="q-py-lg">
    <q-table
      :columns="columns"
      :rows="ordersStore.orders"
      row-key="name"
      class="products-table__wrapper"
      hide-bottom
      :loading="ordersStore.loading"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <OrderBody :props="props"></OrderBody>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { useOrdersStore } from "@/stores/orders";
import type { QTableProps } from "quasar";
import { defineComponent, ref } from "vue";
import OrderBody from "./OrderBody.vue";
const columns: QTableProps["columns"] = [
  {
    name: "more",
    label: "",
    align: "right",
    field: "more",
    headerClasses: "q-table--col-auto-width",
  },
  {
    name: "trackingNumber",
    required: true,
    label: "Tracking Number",
    align: "center",
    field: "trackingNumber",
    headerClasses: "q-table--col-auto-width",
  },
  {
    name: "deliveryFee",
    label: "Delivery Fee",
    field: "deliveryFee",
    align: "center",
  },
  {
    name: "totalPrice",
    label: "Total",
    field: "totalPrice",
    sortable: true,
    align: "center",
  },
  {
    name: "orderDate",
    label: "Order Date",
    field: "orderDate",
    sortable: true,
    align: "center",
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    sortable: true,
    align: "left",
  },
  {
    name: "address",
    label: "Shipping Address",
    field: "address",
    align: "left",
    classes: "address-area",
    headerStyle: "max-width: 2000px; min-width: 190px",
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
    align: "center",
    headerClasses: "q-table--col-auto-width",
  },
];

export default defineComponent({
  setup() {
    const ordersStore = useOrdersStore();
    ordersStore.getOrders();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
    });
    return {
      columns,
      pagination,
      ordersStore,
    };
  },
  components: { OrderBody },
});
</script>

<style scoped lang="scss">
.products-table__wrapper {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: $gray-100;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
