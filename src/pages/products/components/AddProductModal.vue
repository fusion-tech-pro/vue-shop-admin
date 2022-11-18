<template>
  <q-dialog v-model="isOpenValue">
    <q-card class="full-width">
      <Form
        @submit="(values) => onFormSubmit(values as ProductFormState)"
        :validation-schema="schema"
        :initial-values="initialsValue"
        class="column q-pa-md"
      >
        <div class="row justify-between">
          <q-card-section> Add new product </q-card-section>
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            @click="$emit('changeVisibility', false)"
          />
        </div>
        <q-card-section class="row items-center q-pb-none">
          <q-space />
        </q-card-section>
        <Field name="name" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type name for new product"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="group" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type group for new product"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="shop" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type shop for new product"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="product_type" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Add product type for new product"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="price" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type price for new product"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="quantity" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type quantity for new product"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="status" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type status for new product"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <q-btn class="full-width" color="primary" type="submit">{{
          isUpdate ? "Update" : "Create"
        }}</q-btn>
      </Form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, markRaw, type PropType } from "vue";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import type { ProductFormState } from "../entities/index";
import type { Product } from "@/core/models/Product";

export default defineComponent({
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
  },
  props: {
    opened: {
      required: true,
      type: Boolean,
    },
    changingProduct: {
      required: false,
      type: Object as PropType<Product>,
    },
    isUpdate: {
      required: false,
      type: Boolean,
    },
  },
  emits: {
    changeVisibility(value: boolean) {
      return true;
    },
    formSubmit: (values: ProductFormState) => true,
  },
  data() {
    return {
      schema: markRaw(
        yup.object({
          name: yup.string().required(),
          group: yup.string(),
          shop: yup.string().required(),
          product_type: yup.string(),
          price: yup.number(),
          quantity: yup.number(),
          status: yup.string(),
        })
      ),
    };
  },
  methods: {
    onFormSubmit(values: ProductFormState) {
      this.$emit("formSubmit", values);
    },
  },
  computed: {
    isOpenValue: {
      set(value: boolean) {
        this.$emit("changeVisibility", value);
      },
      get() {
        return this.opened;
      },
    },

    initialsValue() {
      return {
        name: this.$props.changingProduct?.name ?? "",
        group: this.$props.changingProduct?.group ?? "",
        shop: this.$props.changingProduct?.shop ?? "",
        product_type: this.$props.changingProduct?.product_type ?? "",
        price: this.$props.changingProduct?.price ?? 0,
        quantity: this.$props.changingProduct?.quantity ?? 0,
        status: this.$props.changingProduct?.status ?? "",
      };
    },
  },
});
</script>
