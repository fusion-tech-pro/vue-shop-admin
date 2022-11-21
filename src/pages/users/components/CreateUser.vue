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

      <FormInput
        @submit="(values: any) => onFormSubmit(values)"
        @reset="resetForm"
        :validation-schema="schema"
        class="q-pa-md shadow-2"
        style="background-color: white"
      >
        <FieldInput name="firstName" v-slot="{ value, errorMessage, field }">
          <q-input
            dense
            outlined
            label="Enter First Name"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </FieldInput>
        <FieldInput name="lastName" v-slot="{ value, errorMessage, field }">
          <q-input
            dense
            outlined
            label="Enter Last Name"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </FieldInput>
        <FieldInput name="phone" v-slot="{ value, errorMessage, field }">
          <q-input
            dense
            outlined
            label="Enter Phone"
            mask="(###) ### - ####"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </FieldInput>
        <FieldInput name="email" v-slot="{ value, errorMessage, field }">
          <q-input
            dense
            outlined
            label="Enter Email"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </FieldInput>
        <FieldInput name="password" v-slot="{ value, errorMessage, field }">
          <q-input
            dense
            outlined
            label="Enter password"
            :model-value="value"
            v-bind="field"
            class="q-mb-sm"
            :error-message="errorMessage"
            :error="!!errorMessage"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              ></q-icon>
            </template>
          </q-input>
        </FieldInput>
        <FieldInput
          name="passwordConfirmation"
          v-slot="{ value, errorMessage, field }"
        >
          <q-input
            dense
            outlined
            label="Confirm password"
            :model-value="value"
            class="q-mb-sm"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              ></q-icon>
            </template>
          </q-input>
        </FieldInput>

        <div
          style="justify-content: space-evenly; padding-top: 25px"
          class="row full-width justify-center"
        >
          <!-- <q-btn color="negative" type="reset">{{ "Cancel" }}</q-btn> -->
          <q-btn color="primary" type="submit">{{ "Create User" }}</q-btn>
        </div>
      </FormInput>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from "vue";
import { Form as FormInput, Field as FieldInput } from "vee-validate";
import * as yup from "yup";
import type { RowType } from "../types";
import { useUsersStore } from "../../../stores/usersStore";

export default defineComponent({
  components: {
    FormInput,
    FieldInput,
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
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        })
      ),
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
      this.$router.push("/users");
    },
    resetForm() {},
    onFileChage(ev: Event) {
      const elem = ev.target as HTMLInputElement;
      if (!elem.files) return;
      this.someValueAvatar = elem.files[0];
    },
  },
});
</script>
