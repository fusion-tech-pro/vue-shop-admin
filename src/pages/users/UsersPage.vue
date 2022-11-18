<script lang="ts">
import { columns, rows, imageDefault } from "./assetsData/usersData";
import ModalEditUser from "./components/ModalEditUser.vue";

interface rowType {
  name: string;
  email: string;
  avatar: string;
}

export default {
  components: {
    ModalEditUser,
  },
  data() {
    return {
      showModal: false,
      imageAlt: imageDefault,
      lowerSearch: "",
      search: "",
      columns: columns,
      rows: rows,
      row: { avatar: "", name: "", email: "" },
      headerModal: "",
      indexOfEdit: 0,
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
    customFilter(rows: rowType[], terms: { search: String }) {
      // rows contain the entire data
      // terms contains whatever you have as filter
      this.lowerSearch = terms.search ? terms.search.toLowerCase() : "";

      const filteredRows = rows.filter((row: rowType) => {
        let ans = true;
        if (this.lowerSearch != "") {
          ans = false;
          let s1_values: string[] = Object.values(row);
          let s1_lower = s1_values.map((x) => x.toLowerCase());

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

    onEdit(row: rowType | undefined) {
      this.row = row ? row : { avatar: "", name: "", email: "" };
      this.indexOfEdit = row ? this.rows.indexOf(row) : this.rows.length++;
      this.headerModal = !row ? "Add User" : "Edit User";
      this.showModal = true;
    },

    onDelete(row: rowType) {
      this.rows.splice(this.rows.indexOf(row), 1);
    },

    updateUser(name: string, email: string) {
      this.rows[this.indexOfEdit] = { ...this.row, name, email };
    },
  },
};
</script>

<template>
  <Teleport to="body">
    <ModalEditUser
      :rowModal="row"
      :show="showModal"
      :readonly="headerModal === 'Edit User'"
      @addUser="updateUser"
      @close="showModal = false"
    >
      <template #header>
        <h3>{{ headerModal }}</h3>
      </template>
    </ModalEditUser>
  </Teleport>

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
        <q-btn
          color="primary"
          label="Add user"
          @click="onEdit(undefined)"
        ></q-btn>
      </template>

      <template v-slot:top-right>
        <q-input dense debounce="400" color="primary" v-model="search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
          <q-popup-edit v-model="props.row.name" v-slot="scope" buttons>
            <q-input v-model="scope.value" dense autofocus></q-input>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-avatar>
            <q-img :src="props.row.avatar ? props.row.avatar : imageAlt" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-email="props">
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
