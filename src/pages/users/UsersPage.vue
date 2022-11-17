<script lang="ts">
import { columns, rows } from "./assetsData/usersData";
// import iconSet from "quasar/icon-set/ionicons-v4";
// import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import ModalEditUser from "./components/ModalEditUser.vue";

export default {
  // el: "#q-app",
  // config: {
  //   iconSet,
  // },
  components: {
    ModalEditUser,
  },
  data() {
    return {
      showModal: false,
      imageAlt: "https://cdn.quasar.dev/img/avatar.png",
      lowerSearch: "",
      // filterToggle: {
      //   breakfast: true,
      //   lunch: true,
      //   dinner: true,
      // },
      search: "",
      columns: columns,
      rows: rows,
    };
  },
  computed: {
    // showAll: {
    //   get: function () {
    //     console.log(this.filterToggle);
    //     return (
    //       this.filterToggle.breakfast &&
    //       this.filterToggle.lunch &&
    //       this.filterToggle.dinner
    //     );
    //   },
    //   set: function (newValue) {
    //     this.filterToggle.breakfast = newValue;
    //     this.filterToggle.lunch = newValue;
    //     this.filterToggle.dinner = newValue;
    //   },
    // },
    filter() {
      return {
        search: this.search,
        // breakfast: this.filterToggle.breakfast,
        // lunch: this.filterToggle.lunch,
        // dinner: this.filterToggle.dinner,
      };
    },
  },
  methods: {
    customFilter(rows, terms) {
      // rows contain the entire data
      // terms contains whatever you have as filter

      console.log(terms, rows);

      this.lowerSearch = terms.search ? terms.search.toLowerCase() : "";

      const filteredRows = rows.filter((row, i) => {
        // let ans = false;

        //Gather toggle conditions
        // let c1 = this.filterToggle.breakfast && row.category == "breakfast";
        // let c2 = this.filterToggle.lunch && row.category == "lunch";
        // let c3 = this.filterToggle.dinner && row.category == "dinner";

        //Gather search condition

        //Assume true in case there is no search
        let s1 = true;

        //If search term exists, convert to lower case and see which rows contain it
        if (this.lowerSearch != "") {
          s1 = false;
          //Get the values
          let s1_values = Object.values(row);
          console.log("s1_values", s1_values);

          //Convert to lowercase
          let s1_lower = s1_values.map((x) => x.toString().toLowerCase());

          for (let val = 0; val < s1_lower.length; val++) {
            if (s1_lower[val].includes(this.lowerSearch)) {
              s1 = true;
              break;
            }
          }
        }

        //assume row doesn't match
        // ans = false;
        // ans = true;
        //check if any of the conditions match
        // if ((c1 && s1) || (c2 && s1) || (c3 && s1)) {
        //   ans = true;
        // }

        return s1;
      });

      return filteredRows;
    },
    onEdit(row) {
      this.showModal = true;
      console.log(`Editing row - '${row.name}'`);
    },
    onDelete(row) {
      console.log(`Deleting row - '${row.name}'`);
    },
  },
};
</script>

<template>
  <!-- <Teleport to="body"> -->
  <!-- use the modal component, pass in the prop -->
  <ModalEditUser :show="showModal" @close="showModal = false">
    <template #header>
      <h3>custom header</h3>
    </template>
  </ModalEditUser>
  <!-- </Teleport> -->

  <div>Hello from Users!</div>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :columns="columns"
      :rows="rows"
      :filter="filter"
      :filter-method="customFilter"
      row-key="name"
    >
      <template v-slot:top-left>
        <!-- <div style="width: 100%" class="row"> -->
        <q-btn
          color="primary"
          :disable="loading"
          label="Add row"
          @click="() => {}"
        ></q-btn>
        <!-- <div class="col-8">
            <q-toggle
              v-model="filterToggle.breakfast"
              val="breakfast"
              label="Show Breakfast"
            />
            <q-toggle
              v-model="filterToggle.lunch"
              val="lunch"
              label="Show Lunch"
            />
            <q-toggle
              v-model="filterToggle.dinner"
              val="dinner"
              label="Show Dinner"
            />
            <q-toggle v-model="showAll" val="showAll" label="Show All" />
          </div> -->
        <!-- </div> -->
      </template>
      <template v-slot:top-right>
        <!-- <div> -->
        <q-input dense debounce="400" color="primary" v-model="search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <!-- </div> -->
      </template>
      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <!-- <q-badge :label="props.value"></q-badge> -->
          <q-avatar size="42px">
            <img :src="props.row.avatar ? props.row.avatar : imageAlt" />
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-calcium="props">
        <q-td :props="props">
          <q-badge :label="props.value"></q-badge>
          <!-- <q-avatar size="42px">
            <img :src="props.row.url" />
          </q-avatar> -->
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <!-- <q-btn icon="mode_edit" @click="onEdit(props.row)"></q-btn> -->
          <q-btn
            color="primary"
            flat
            icon="ion-create"
            @click="onEdit(props.row)"
          >
            <!-- <q-icon name="ion-create" /> -->
          </q-btn>
          <q-btn
            color="red"
            flat
            icon="ion-trash"
            @click="onDelete(props.row)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>

  <!-- <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          icon="signal_wifi_off"
          color="primary"
          text-color="white"
        ></q-avatar>
        <span class="q-ml-sm"
          >You are currently not connected to any network.</span
        >
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat label="Cancel" color="red" v-close-popup></q-btn>
        <q-btn flat label="Yes" color="primary" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog> -->
</template>

<style scoped>
img {
  width: 40px;
}
</style>
