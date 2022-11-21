<template>
  <Teleport to="body">
    <ModalEditUser
      :rowModal="row"
      :show="showModal"
      :readonly="headerModal === 'Edit User'"
      :changingUser="row"
      @addUser="updateUser"
      @close="showModal = false"
    >
      <template #header>
        <h3>{{ headerModal }}</h3>
      </template>
    </ModalEditUser>
  </Teleport>

  <div class="q-pa-md row full-width">
    <div
      class="q-pa-md row full-width shadow-2"
      style="background-color: white; justify-content: space-between"
    >
      <q-btn color="primary" label="Add user" @click="createUser"></q-btn>

      <q-input dense debounce="400" color="primary" v-model="search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>

  <div class="q-pa-md">
    <q-table
      :columns="columns"
      :rows="store.rows"
      :filter="filter"
      :filter-method="customFilter"
      row-key="firstName"
    >
      <template v-slot:body-cell-firstName="props">
        <q-td key="firstName" :props="props">
          {{ props.row.firstName }}
          <q-popup-edit v-model="props.row.firstName" v-slot="scope" buttons>
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

<script lang="ts">
import { columns, imageDefault } from "./assetsData/usersData";
import ModalEditUser from "./components/ModalEditUser.vue";
import type { RowType } from "./types";
import { useUsersStore } from "../../stores/usersStore";
export default {
  components: {
    ModalEditUser,
  },
  setup() {
    const store = useUsersStore();
    return {
      store,
    };
  },
  data() {
    return {
      showModal: false,
      imageAlt: imageDefault,
      // lowerSearch: "",
      search: "",
      columns: columns,
      // rows: rows as RowType[],
      row: {
        avatar: "",
        firstName: "",
        email: "",
        password: "123456",
      } as RowType,
      headerModal: "",
      // indexOfEdit: 0,
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
    customFilter(rowsUsers: RowType[], terms: { search: String }) {
      // Users contain the entire data
      // terms contains whatever you have as filter
      let lowerSearch = terms?.search ? terms.search.toLowerCase() : "";
      const filteredRows = rowsUsers.filter((row: RowType) => {
        let answer = true;
        if (lowerSearch != "") {
          answer = false;
          let temp_values: string[] = Object.values(row);
          let temp_values_lower = temp_values.map((x) => x.toLowerCase());
          for (let val = 0; val < temp_values_lower.length; val++) {
            if (temp_values_lower[val].includes(lowerSearch)) {
              answer = true;
              break;
            }
          }
        }
        return answer;
      });
      return filteredRows;
    },
    onEdit(row: RowType) {
      this.row = row
        ? row
        : { avatar: "", firstName: "", email: "", password: "123456" };
      this.store.indexOfEdit = row
        ? this.store.rows.indexOf(row)
        : this.store.rows.length++;
      this.headerModal = !row ? "Add User" : "Edit User";
      this.showModal = true;
    },

    onDelete(row: RowType) {
      this.store.removeUser(row);
      // this.store.rows.splice(this.store.rows.indexOf(row), 1);
    },

    updateUser(firstName: string, email: string) {
      this.store.rows[this.store.indexOfEdit] = {
        ...this.row,
        firstName,
        email,
      };
    },
    createUser() {
      this.$router.push("/users/create");
    },
  },
};
</script>

<style scoped>
img {
  width: 40px;
}
</style>
