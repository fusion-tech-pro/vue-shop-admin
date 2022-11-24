<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-none q-mb-sm row" style="justify-content: space-between">
      <div class="cardContainer" v-for="(item, index) in cards" :key="index">
        <q-card class="myCard" flat bordered>
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
              <q-icon name="warning" size="52px" color="primary"> </q-icon>
            </q-card-section>
          </q-card-section>

          <q-card-actions>
            <h5 class="text-weight-bold q-ma-md">{{ item.total }}</h5>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div>
      <q-table
        class="no-shadow"
        title="Recents Orders"
        :rows="rows"
        :columns="columns"
        row-key="name"
        hide-bottom
      >
        <!-- <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width></q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template> -->

        <template v-slot:body="props">
          <q-tr :props="props">
            <!-- <q-td auto-width>
              <q-btn
                size="sm"
                color="accent"
                round
                dense
                @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'"
              ></q-btn>
            </q-td> -->
            <q-td
              v-for="(col, index) in props.cols"
              :key="col.name"
              :props="props"
            >
              <q-btn
                :style="index && { display: 'none' }"
                dense
                round
                flat
                :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
                @click="props.expand = !props.expand"
              ></q-btn>
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%" class="myclass">
              <q-table
                :style="{
                  backgroundColor: 'yellow',
                }"
                hide-bottom
                :rows="rowsTemp"
                :columns="columns"
              >
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <q-btn round flat :icon="'arrow_drop_down'"></q-btn>
                    {{ col.value }}
                  </q-td>
                </q-tr>
              </q-table>
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
      rowsTemp: [
        {
          name: "Eclair",
          calories: 262,

          protein: 6.0,
          sodium: 337,
          status: "Order Received",
        },
        {
          name: "Cupcake",
          calories: 305,

          protein: 4.3,
          sodium: 413,
          status: "Order Received",
        },
      ],
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
});
</script>

<style scoped lang="scss">
.myclass {
  margin: 0px;
  padding: 0px 0px 0px 0px;
  /* display: none; */
}
.cardContainer {
  padding: 0px;
  margin-bottom: 15px;
  margin-left: 0px;
  width: 100%;
  @include media-sm {
    width: 48%;
  }
}
.myCard {
  padding: 10px 20px 10px 10px;
}
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: "yellow";
  margin-top: 4px;
}
</style>
