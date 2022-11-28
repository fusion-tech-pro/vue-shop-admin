<template>
  <q-table
    class="no-shadow table__wrapper"
    :rows="rows"
    :columns="columns"
    hide-pagination
    v-model:pagination="pagination"
    row-key="name"
    style="border: 1px solid #ffffff; border-radius: 5px"
  >
    <template v-slot:top>
      <div class="q-table__title title-style">Recent Orders</div>
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th style="width: 1px"></q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td style="padding: 0 0 0 10px">
          <q-btn
            dense
            round
            flat
            :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
            @click="props.expand = !props.expand"
          ></q-btn>
        </q-td>

        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <div
            :style="
              col.label === 'Status'
                ? {
                    color: 'red',
                    fontWeight: 'bold',
                  }
                : undefined
            "
          >
            {{ col.value }}
          </div>
        </q-td>
      </q-tr>
      <q-tr
        v-show="props.expand"
        :props="props"
        v-for="(col, index) in rowsTemp"
        :key="index"
      >
        <q-td style="background-color: #f3f4f6"></q-td>
        <q-td
          v-for="(cell, index) in col"
          :key="index"
          style="background-color: #f3f4f6"
        >
          <div
            :style="
              index === 'status'
                ? {
                    color: 'red',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                  }
                : { display: 'flex', justifyContent: 'center' }
            "
          >
            {{ cell }}
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <div class="row justify-end q-pr-sm q-mt-sm q-mb-lg">
    <q-pagination
      v-model="pagination.page"
      color="grey-7"
      active-design="push"
      active-color="primary"
      active-text-color="white"
      gutter="8px"
      size="md"
      direction-links
      outline
      push
      :max="pagesNumber"
      :max-pages="3"
      :boundary-numbers="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { columns, rows, rowsTemp } from "../data";

export default defineComponent({
  setup() {
    // const productsStore = useProductsStore();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
    });

    return {
      // columns: productColumns,
      pagination,
      // productsStore,
      // selected: ref<[] | null>(null),
    };
  },

  data() {
    return {
      columns: columns,
      rows: rows,
      rowsTemp: rowsTemp,
    };
  },

  computed: {
    pagesNumber() {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
    },
  },
});
</script>

<style scoped lang="scss">
.table__wrapper {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: rgba(229, 231, 235, 0.3);
    white-space: nowrap;
    padding: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
  }
}
.title-style {
  font-weight: bold;
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
