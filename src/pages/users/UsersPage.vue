<script lang="ts">
import { columns, rows } from "./assetsData/usersData";
import ModalEditUser from "./components/ModalEditUser.vue";

export default {
  components: {
    ModalEditUser,
  },
  data() {
    return {
      showModal: false,
      imageAlt: "https://cdn.quasar.dev/img/avatar.png",
      lowerSearch: "",
      search: "",
      columns: columns,
      rows: rows,
    };
  },
  computed: {
    filter() {
      return {
        search: this.search,
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
        let ans = true;
        if (this.lowerSearch != "") {
          ans = false;
          let s1_values = Object.values(row);
          console.log("s1_values", s1_values);

          let s1_lower = s1_values.map((x) => x.toString().toLowerCase());

          for (let val = 0; val < s1_lower.length; val++) {
            if (s1_lower[val].includes(this.lowerSearch)) {
              ans = true;
              break;
            }
          }
        }
        return ans;
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
        <q-btn color="primary" label="Add row" @click="() => {}"></q-btn>
      </template>
      <template v-slot:top-right>
        <q-input dense debounce="400" color="primary" v-model="search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-avatar size="42px">
            <img :src="props.row.avatar ? props.row.avatar : imageAlt" />
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-calcium="props">
        <q-td :props="props">
          <q-badge :label="props.value"></q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            flat
            icon="ion-create"
            @click="onEdit(props.row)"
          >
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
</template>

<style scoped>
img {
  width: 40px;
}
</style>
