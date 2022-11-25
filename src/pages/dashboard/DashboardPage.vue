<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-none q-mb-sm row" style="justify-content: space-between">
      <div class="card-container" v-for="(item, index) in cards" :key="index">
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
              <q-icon name="warning" size="52px" color="primary"> </q-icon>
            </q-card-section>
          </q-card-section>

          <q-card-actions>
            <h5 class="text-weight-bold q-ma-md">{{ item.total }}</h5>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <MyChart />

    <div class="q-mb-lg">
      <q-table
        class="no-shadow"
        :rows="rows"
        :columns="columns"
        row-key="name"
        hide-bottom
      >
        <template v-slot:top>
          <div
            class="q-table__title"
            style="
              font-weight: bold;
              display: flex;
              width: 100%;
              justify-content: center;
            "
          >
            Recent Orders
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th style="width: 1px"></q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <q-badge style="font-size: 16px" :label="col.label"></q-badge>
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
                  col.label === 'Status' && { color: 'red', fontWeight: 'bold' }
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
                  index === 'status' && {
                    color: 'red',
                    fontWeight: 'bold',
                  }
                "
              >
                {{ cell }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <div class="q-mb-lg">
      <q-table
        class="no-shadow"
        :rows="rows"
        :columns="columns"
        row-key="name"
        hide-bottom
      >
        <template v-slot:top>
          <div
            class="q-table__title"
            style="
              font-weight: bold;
              display: flex;
              width: 100%;
              justify-content: center;
            "
          >
            Popular Products
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <!-- <q-th style="width: 1px"></q-th> -->
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <q-badge style="font-size: 16px" :label="col.label"></q-badge>
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <!-- <q-td style="padding: 0 0 0 10px">
              <q-btn
                dense
                round
                flat
                :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
                @click="props.expand = !props.expand"
              ></q-btn>
            </q-td> -->

            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div
                :style="
                  col.label === 'Status' && { color: 'red', fontWeight: 'bold' }
                "
              >
                {{ col.value }}
              </div>
            </q-td>
          </q-tr>
          <!-- <q-tr
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
                  index === 'status' && {
                    color: 'red',
                    fontWeight: 'bold',
                  }
                "
              >
                {{ cell }}
              </div>
            </q-td>
          </q-tr> -->
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dataCards, columns, rows } from "./data";
import MyChart from "./components/MyChart.vue";

export default defineComponent({
  components: { MyChart },
  data() {
    return {
      cards: dataCards,
      columns: columns,
      rows: rows,
      rowsTemp: [
        {
          name: "One Item",
          calories: 250,
          protein: 5.0,
          sodium: 300,
          status: "Order Received",
        },
        {
          name: "Second Item",
          calories: 200,
          protein: 3,
          sodium: 400,
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
.card-container {
  padding: 0px;
  margin-bottom: 15px;
  margin-left: 0px;
  width: 100%;
  @include media-sm {
    width: 48%;
  }
}
.my-card {
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
