<template>
  <Teleport to="body">
    <ModalEditUser :show="showModal" @close="showModal = false">
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
      <div class="text-h5 text-weight-bold">Users</div>

      <div class="row">
        <q-input outlined dense debounce="400" color="primary" v-model="search">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-xl"
          color="primary"
          label="Add user"
          style="font-weight: bold"
          @click="createUser"
        ></q-btn>
      </div>
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

      <template v-slot:body-cell-createAt="props">
        <q-td :props="props">
          {{ props.value && new Date(props.value).toLocaleString() }}
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
import { defineComponent } from "vue";
import { columns, imageDefault } from "./assetsData/usersData";
import ModalEditUser from "./components/ModalEditUser.vue";
import type { RowType } from "./types";
import { useUsersStore } from "@/stores/usersStore";
// import type { QTableProps } from "quasar";

// type Method = Exclude<QTableProps["filterMethod"], undefined>;
// type ReturnTest = ReturnType<Method>;
// type ArgsTest = Parameters<Method>;

export default defineComponent({
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
      search: "",
      columns: columns,
      row: {
        avatar: "",
        firstName: "",
        email: "",
        password: "123456",
      } as RowType,
      headerModal: "",
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
    customFilter(rowsUsers: Readonly<RowType[]>, terms: { search: string }) {
      // customFilter(rowsUsers: ArgsTest[0], terms: ArgsTest[1]): ReturnTest {
      let lowerSearch = terms?.search ? terms.search.toLowerCase() : "";
      const filteredRows = rowsUsers.filter((row: RowType) => {
        let answer = true;
        if (lowerSearch != "") {
          answer = false;
          let temp_values: string[] = Object.entries(row)
            .filter(
              (item: string[]) =>
                item[0] === "firstName" ||
                item[0] === "email" ||
                item[0] === "lastName"
            )
            .map((item: string[]) => {
              return item[1];
            });
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
      return Object.freeze(filteredRows);
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
});
</script>

<style scoped>
img {
  width: 40px;
}
</style>
