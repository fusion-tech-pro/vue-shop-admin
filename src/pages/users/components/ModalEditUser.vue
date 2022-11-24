<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-header"></div>

          <div class="row full-width justify-center">
            <q-avatar size="150px">
              <label>
                <img class="avatar-img" :src="src" />
                <input
                  type="file"
                  accept=".jpg,.png"
                  @change="onFileChage"
                  :style="{ display: 'none' }"
                />
              </label>
            </q-avatar>
          </div>

          <EditUserForm
            @form-close="$emit('close')"
            @form-submit="onFormSubmit"
            :init-user="initialValues"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { imageDefault } from "@/data/userSource/usersData";
import type { EditUserType } from "../types";
import { useUsers } from "@/stores/users";
import EditUserForm from "./EditUserForm.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  components: {
    EditUserForm,
  },
  props: {
    show: Boolean,
  },
  emits: ["close"],

  setup() {
    const store = useUsers();
    const $q = useQuasar();
    function showNotification() {
      $q.notify({
        message: "Editing Completed",
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
      isPwd: true,
      someValueAvatar: null as File | null,
      src: "",
    };
  },

  watch: {
    show(value) {
      if (!value) {
        return;
      }
      this.src =
        this.store.users[this.store.indexOfEdit].avatar ?? imageDefault;
    },

    someValueAvatar: {
      handler(newVal: File | null) {
        if (newVal) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (typeof e.target?.result !== "string") {
              return;
            }
            this.src = e.target?.result;
          };

          reader.readAsDataURL(newVal);
        }
      },
      deep: true,
    },
  },

  methods: {
    onFormSubmit(values: EditUserType) {
      this.showNotification();
      this.store.updateUser({ ...values, avatar: this.src });
      this.$emit("close");
    },

    resetForm() {
      this.$router.push("/users");
    },

    onFileChage(ev: Event) {
      const elem = ev.target as HTMLInputElement;
      if (!elem.files) return;
      this.someValueAvatar = elem.files[0];
    },
  },

  computed: {
    initialValues() {
      return {
        firstName: this.store.users[this.store.indexOfEdit].firstName,
        lastName: this.store.users[this.store.indexOfEdit].lastName,
        email: this.store.users[this.store.indexOfEdit].email,
        contactNumber: this.store.users[this.store.indexOfEdit].contactNumber,
        password: this.store.users[this.store.indexOfEdit].password,
        passwordConfirmation: this.store.users[this.store.indexOfEdit].password,
      };
    },
  },
});
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  margin: 0 0 20px 0;
}

.modal-default-button {
  float: center;
  margin-right: 10px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.avatar-img {
  height: 100px;
  max-width: 100px;
}
</style>
