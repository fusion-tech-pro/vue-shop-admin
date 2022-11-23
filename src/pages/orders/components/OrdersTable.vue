<template>
  <div class="q-py-lg">
    <q-table
      :columns="columns"
      :rows="rows"
      row-key="name"
      class="products-table__wrapper"
      hide-bottom
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="trackingNumber" :props="props">
            {{ props.row.trackingNumber }}
          </q-td>
          <q-td key="deliveryFee" :props="props">
            ${{ props.row.deliveryFee }}
          </q-td>
          <q-td key="totalPrice" :props="props">
            ${{ props.row.totalPrice }}
          </q-td>
          <q-td key="orderDate" :props="props">
            {{ props.row.orderDate }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="address" :props="props">{{ props.row.address }}</q-td>
          <q-td key="actions" :props="props">
            <q-icon
              name="ion-eye"
              size="30px"
              class="more-icon cursor-pointer"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import type { QTableProps } from "quasar";
import { defineComponent } from "vue";
const columns: QTableProps["columns"] = [
  {
    name: "trackingNumber",
    required: true,
    label: "Tracking Number",
    align: "center",
    field: "trackingNumber",
    format: (val: any) => `${val}`,
  },
  {
    name: "deliveryFee",
    label: "Delivery Fee",
    field: "deliveryFee",
    align: "center",
    format: (val: any) => `$${val}`,
  },
  {
    name: "totalPrice",
    label: "Total",
    field: "totalPrice",
    sortable: true,
    align: "center",
    format: (val: any) => `$${val}`,
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
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
    align: "center",
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    trackingNumber: "CGG82oQZc4i8",
    deliveryFee: "50.00",
    totalPrice: "1,641.20",
    orderDate: "20-09-2021",
    status: "Order Received",
    address: "2148 Straford ParkWinchesterKY40391United States",
    actions: "/ccskrf",
  },
  {
    trackingNumber: "CGG82oQZc4i8",
    deliveryFee: "50.00",
    totalPrice: "1,641.20",
    orderDate: "20-09-2021",
    status: "Order Received",
    address: "2148 Straford ParkWinchesterKY40391United States",
    actions: "/ccskrf",
  },
  {
    trackingNumber: "CGG82oQZc4i8",
    deliveryFee: "50.00",
    totalPrice: "1,641.20",
    orderDate: "20-09-2021",
    status: "Order Received",
    address: "2148 Straford ParkWinchesterKY40391United States",
    actions: "/ccskrf",
  },
  {
    trackingNumber: "CGG82oQZc4i8",
    deliveryFee: "50.00",
    totalPrice: "1,641.20",
    orderDate: "20-09-2021",
    status: "Order Received",
    address: "2148 Straford ParkWinchesterKY40391United States",
    actions: "/ccskrf",
  },
  {
    trackingNumber: "CGG82oQZc4i8",
    deliveryFee: "50.00",
    totalPrice: "1,641.20",
    orderDate: "20-09-2021",
    status: "Order Received",
    address: "2148 Straford ParkWinchesterKY40391United States",
    actions: "/ccskrf",
  },
];

export default defineComponent({
  setup() {
    return { columns, rows };
  },
});
</script>

<style scoped lang="scss">
.more-icon {
  color: $gray-500;
}
.products-table__wrapper {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: $gray-100;
    white-space: nowrap;
    padding: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
  }
}
</style>
