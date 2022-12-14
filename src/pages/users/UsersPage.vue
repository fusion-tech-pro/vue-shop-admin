<template>
  <Teleport to="body">
    <ModalEditUser :show="showModal" @close="showModal = false">
      <template #header>
        <h5 class="q-ma-none text-weight-bold">{{ headerModal }}</h5>
      </template>
    </ModalEditUser>
  </Teleport>

  <div class="q-pa-md q-mb-md row shadow-2 header-container">
    <div class="text-h5 text-weight-bold">Users</div>

    <div class="row col-12 col-sm-7 search-container">
      <q-input
        :style="{
          width: 'inherit',
        }"
        outlined
        dense
        debounce="400"
        color="primary"
        v-model="search"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <div :style="{ display: 'flex', justifyContent: 'center' }">
        <q-btn
          class="button-add"
          color="primary"
          label="Add user"
          @click="createUser"
        ></q-btn>
      </div>
    </div>
  </div>

  <q-table
    :columns="columns"
    :rows="store.users"
    :filter="filter"
    :filter-method="customFilter"
    row-key="firstName"
    class="products-table__wrapper"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

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
        <q-badge :label="props.value" class="q-pa-sm" rounded></q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-createAt="props">
      <q-td :props="props">
        {{ props.value ?? "n/a" }}
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          size="sm"
          color="primary"
          flat
          icon="ion-create"
          @click="onEdit(props.row)"
        >
        </q-btn>

        <q-btn
          size="sm"
          color="red"
          flat
          icon="ion-trash"
          @click="onDelete(props.row)"
        ></q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { columns, imageDefault } from "@/data/userSource/usersData";
import type { User } from "@/core/models/User";
import { useQuasar } from "quasar";
import { useUsers } from "@/stores/users";
import ModalEditUser from "./components/ModalEditUser.vue";
import type { EditUserType } from "./types";

export default defineComponent({
  components: {
    ModalEditUser,
  },
  setup() {
    const store = useUsers();
    // TODO: Add this hack when API is done to fetch data normally
    // store.fetchUsers();
    const $q = useQuasar();
    function showNotification() {
      $q.notify({
        message: "User deleted",
        color: "purple",
        position: "top-right",
      });
    }
    return {
      store,
      showNotification,
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
        password: "",
      } as EditUserType,
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

  // TODO: Remove this hack when API is done to fetch data normally
  created() {
    if (this.store.users.length) {
      return;
    }
    this.store.fetchUsers();
  },

  methods: {
    customFilter(
      rowsUsers: Readonly<EditUserType[]>,
      terms: { search: string }
    ) {
      let lowerSearch = terms?.search ? terms.search.toLowerCase() : "";
      const filteredRows = rowsUsers.filter((row: EditUserType) => {
        let answer = true;
        if (lowerSearch != "") {
          answer = false;

          let tempValuesLower = Object.entries(row)
            .filter(
              (item) =>
                item[0] === "firstName" ||
                item[0] === "email" ||
                item[0] === "lastName"
            )
            .map((item) => {
              return item[1].toLowerCase();
            });

          for (let val = 0; val < tempValuesLower.length; val++) {
            if (tempValuesLower[val].includes(lowerSearch)) {
              answer = true;
              break;
            }
          }
        }
        return answer;
      });
      return Object(filteredRows);
    },

    onEdit(user: User) {
      this.row = { ...user };
      this.store.indexOfEdit = user
        ? this.store.users.indexOf(user)
        : this.store.users.length++;
      this.headerModal = !user ? "Add User" : "Edit User";
      this.showModal = true;
    },

    onDelete(user: User) {
      this.store.removeUser(user);
      this.showNotification();
    },

    createUser() {
      this.$router.push("/users/create");
    },
  },
});
</script>

<style scoped lang="scss">
img {
  width: 40px;
}

.button-add {
  margin-top: 5px;
  font-weight: bold;
  justify-content: center;
  @include media-sm {
    margin-top: 0px;
    margin-left: 10px;
  }
}

.header-container {
  flex-direction: column;
  background-color: white;
  justify-content: space-between;
  @include media-sm {
    flex-direction: row;
  }
}

.search-container {
  flex-direction: column;
  background-color: white;
  justify-content: flex-end;
  @include media-sm {
    flex-direction: row;
  }
}
.products-table__wrapper {
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
</style>
