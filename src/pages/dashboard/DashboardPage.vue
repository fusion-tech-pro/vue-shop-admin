<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md row items-start q-gutter-md">
      <div class="col-12 col-sm-5" v-for="(item, index) in cards" :key="index">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal style="justify-content: space-between">
            <q-card-section class="q-pt-xs">
              <div class="text-h7 text-weight-bold q-mt-sm q-mb-xs">
                {{ item.title }}
              </div>
              <div :style="{ height: '20px' }" class="text-caption text-grey">
                {{ item.text }}
              </div>
            </q-card-section>

            <q-card-section class="col-2 flex flex-center">
              <q-icon name="warning" size="32px" color="primary"> </q-icon>
            </q-card-section>
          </q-card-section>

          <q-card-actions>
            <h5 class="text-weight-bold q-ma-md">{{ item.total }}</h5>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="q-pa-md">
      <q-table
        title="Recent Orders"
        :rows="rows"
        :columns="columns"
        row-key="name"
        hide-bottom
        class="q-table__title-center relative-position row items-center"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width></q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="accent"
                round
                dense
                @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'"
              ></q-btn>
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%" class="q-ma-xl">
              <q-table
                borderless
                hide-header
                hide-bottom
                :rows="rows"
                :columns="columns"
              >
                <q-tr :props="props" class="myclass"></q-tr>
              </q-table>
              <!-- <div class="text-left">
                This is expand slot for row above: {{ props.row.name }}.
              </div> -->
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dataCards, columns, rows } from "./data";

export default defineComponent({
  data() {
    return {
      cards: dataCards,
      columns: columns,
      rows: rows,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
});
</script>

<style scoped lang="scss">
.myclass td:hover:before {
  display: none;
}

/* td.q-td {
  padding: 0px;
} */
</style>
