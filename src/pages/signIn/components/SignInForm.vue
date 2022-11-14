<template>
  <h1 class="text-center text-h3">Login</h1>
  <Form
    @submit="(values) => onFormSubmit(values as SignInFormState)"
    :validation-schema="schema"
    :initial-values="formState"
  >
    <Field name="username" v-slot="{ value, errorMessage, field }">
      <q-input
        outlined
        label="Username"
        class="q-mb-sm"
        :model-value="value"
        v-bind="field"
        :error-message="errorMessage"
        :error="!!errorMessage"
      />
    </Field>

    <Field name="password" v-slot="{ value, errorMessage, field }">
      <q-input
        outlined
        label="Password"
        type="password"
        class="q-mb-lg"
        v-bind="field"
        :model-value="value"
        :error-message="errorMessage"
        :error="!!errorMessage"
      />
    </Field>

    <q-btn class="full-width" color="primary" type="submit" :disable="loading"
      >Submit</q-btn
    >
  </Form>
</template>

<script lang="ts">
import { defineComponent, markRaw } from "vue";
import * as yup from "yup";
import { Form, Field } from "vee-validate";
import type { SignInFormState } from "../entities";

export default defineComponent({
  props: {
    initialUsername: String,
    initialPassword: String,
    loading: Boolean,
  },
  emits: {
    formSubmit: (values: SignInFormState) => true,
  },
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
  },
  data() {
    return {
      schema: markRaw(
        yup.object({
          username: yup.string().required(),
          password: yup.string().required(),
        })
      ),
      formState: {
        username: this.$props.initialUsername ?? "",
        password: this.$props.initialPassword ?? "",
      },
    };
  },
  methods: {
    onFormSubmit(values: SignInFormState) {
      this.$emit("formSubmit", values);
    },
  },
});
</script>

<style scoped></style>
