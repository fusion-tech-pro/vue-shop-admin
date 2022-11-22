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
import type { RowType } from "../types";
import { useUsersStore } from "@/stores/usersStore";
import EditUserForm from "./EditUserForm.vue";

export default defineComponent({
  components: {
    EditUserForm,
  },

  setup() {
    const store = useUsersStore();
    return {
      store,
    };
  },

  data() {
    return {
      someValueAvatar: null as File | null,
      isPwd: true,
      src: "https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-of-default.jpg",
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
    onFormSubmit(values: RowType) {
      this.store.addUser({ ...values, createAt: Date.now() });
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
