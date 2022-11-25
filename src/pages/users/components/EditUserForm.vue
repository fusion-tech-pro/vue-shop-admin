<template>
  <FormInput
    @submit="(values) => onFormSubmit(values as FormTypeUser)"
    @reset="closeForm"
    :validation-schema="schema"
    class="q-pa-md shadow-2 form-background"
    :initial-values="formState"
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
    <FieldInput name="contactNumber" v-slot="{ value, errorMessage, field }">
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

    <div class="row full-width justify-center button-container">
      <q-btn v-show="initUser?.firstName" color="primary" type="reset">{{
        "Cancel"
      }}</q-btn>
      <q-btn color="primary" type="submit">{{
        initUser?.firstName ? "Edit User" : "Create User"
      }}</q-btn>
    </div>
  </FormInput>
</template>

<script lang="ts">
import { defineComponent, markRaw, type PropType } from "vue";
import { Form as FormInput, Field as FieldInput } from "vee-validate";
import * as yup from "yup";
import type { EditUserType, FormTypeUser } from "../types";

export default defineComponent({
  components: {
    FormInput,
    FieldInput,
  },

  props: {
    initUser: { type: Object as PropType<EditUserType> },
  },

  emits: {
    formSubmit: (values: FormTypeUser) => true,
    formClose: null,
  },

  data() {
    return {
      isPwd: true,
      schema: markRaw(
        yup.object({
          firstName: yup.string().required(),
          lastName: yup.string(),
          contactNumber: yup.string(),
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
      formState: this.$props.initUser,
    };
  },

  methods: {
    onFormSubmit(values: FormTypeUser) {
      this.$emit("formSubmit", values);
    },

    closeForm() {
      this.$emit("formClose");
    },
  },
});
</script>

<style scoped>
.button-container {
  justify-content: space-evenly;
  padding-top: 25px;
}
.form-background {
  background-color: white;
}
</style>
