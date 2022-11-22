<template>
  <div class="row full-width justify-center">
    <div style="width: 600px">
      <h5 class="row full-width justify-center text-weight-bold q-ma-md">
        Create New User
      </h5>
      <div style="display: flex; justify-content: center">
        <q-avatar class="q-ma-md" size="100px">
          <label>
            <img style="height: 100px; max-width: 100px" :src="src" />
            <input
              type="file"
              accept=".jpg,.png"
              @change="onFileChage"
              :style="{ display: 'none' }"
              class="q-ma-md"
            />
          </label>
        </q-avatar>
      </div>

      <EditUserForm @form-submit="onFormSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from "vue";
import * as yup from "yup";
import type { EdditUserType } from "./types";
import { useUsers } from "@/stores/users";
import EditUserForm from "./components/EditUserForm.vue";
import { imageDefault as defaultAvatar } from "@/data/userSource/usersData";

export default defineComponent({
  components: {
    EditUserForm,
  },

  setup() {
    const store = useUsers();
    return {
      store,
    };
  },

  data() {
    return {
      someValueAvatar: null as File | null,
      isPwd: true,
      src: defaultAvatar,
      schema: markRaw(
        yup.object({
          firstName: yup.string().required(),
          lastName: yup.string(),
          phone: yup.string(),
          email: yup.string().email().required(),
          password: yup
            .string()
            .required()
            .min(6, "Password should be of minimum 6 characters length"),
          passwordConfirmation: yup
            .string()
            .required()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        })
      ),
      formState: {
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        email: "",
        passwordConfirmation: "",
      },
    };
  },

  watch: {
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
    showNotification() {
      this.$q.notify({
        message: "User added",
        color: "purple",
        position: "top-right",
      });
    },

    onFormSubmit(values: EdditUserType) {
      this.store.addUser({ ...values, createAt: Date.now(), id: Date.now() });
      this.showNotification();
      this.$router.replace({
        name: "users",
      });
    },

    onFileChage(ev: Event) {
      const elem = ev.target as HTMLInputElement;
      if (!elem.files) return;
      this.someValueAvatar = elem.files[0];
    },
  },
});
</script>
