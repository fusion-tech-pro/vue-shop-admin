<template>
  <q-dialog v-model="isOpenValue">
    <q-card class="full-width">
      <Form
        @submit="(values) => onFormSubmit(values as ShopFormState)"
        :validation-schema="schema"
        :initial-values="initialsValue"
        class="column q-pa-md"
      >
        <div class="row justify-between">
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

        <UploadImage
          :label="'Shop cover image'"
          :imageSrc="logoSrc"
          @get-image="getLogoSrc"
        />

        <UploadImage
          :label="'Shop cover image'"
          :imageSrc="coverImageSrc"
          @get-image="getCoverImageSrc"
        />

        <Field name="name" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type shop name"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="description" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type shop description"
            type="text"
            class="q-mb-sm"
            multiline
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="ownerName" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type owner for shop"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="webSite" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Add website for shop"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="socialLink" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type social link for shop"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="country" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type shop country"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="state" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type shop state"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="city" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type shop city"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="street" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type shop street"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="zipCode" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type shop zip code"
            type="text"
            class="q-mb-sm"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field name="telephoneNumber" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Type shop telephone number"
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
import type { ShopFormState } from "../entities";
import type { Shop } from "@/core/models/Shop";
import { noImageURL } from "../../../utils/constants";
import UploadImage from "./UploadImage.vue";

export default defineComponent({
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
    UploadImage,
  },
  props: {
    opened: {
      required: true,
      type: Boolean,
    },
    changingProduct: {
      required: false,
      type: Object as PropType<Shop>,
    },
    isUpdate: {
      required: false,
      type: Boolean,
    },
  },
  data() {
    return {
      logoSrc: this.$props.changingProduct?.logo ?? noImageURL,
      coverImageSrc: this.$props.changingProduct?.coverImage ?? noImageURL,
      schema: markRaw(
        yup.object({
          name: yup.string().required(),
          ownerName: yup.string(),
          description: yup.string(),
          webSite: yup.string(),
          socialLink: yup.string(),
          country: yup.string(),
          state: yup.string(),
          city: yup.string(),
          street: yup.string(),
          zipCode: yup.string(),
          telephoneNumber: yup.string(),
        })
      ),
    };
  },
  emits: {
    changeVisibility(value: boolean) {
      return true;
    },
    formSubmit: (values: ShopFormState) => true,
  },
  watch: {},
  methods: {
    onFormSubmit(values: ShopFormState) {
      this.$emit("formSubmit", {
        ...values,
        logo: this.logoSrc,
        coverImage: this.coverImageSrc,
      });
    },
    getLogoSrc(value: String) {
      this.logoSrc = value as string;
    },
    getCoverImageSrc(value: String) {
      this.coverImageSrc = value as string;
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
        logo: this.$props.changingProduct?.logo ?? "",
        coverImage: this.$props.changingProduct?.coverImage ?? "",
        name: this.$props.changingProduct?.name ?? "",
        webSite: this.$props.changingProduct?.webSite ?? "",
        socialLink: this.$props.changingProduct?.socialLink ?? "",
        description: this.$props.changingProduct?.description ?? "",
        country: this.$props.changingProduct?.country ?? "",
        state: this.$props.changingProduct?.state ?? "",
        city: this.$props.changingProduct?.city ?? "",
        street: this.$props.changingProduct?.street ?? "",
        zipCode: this.$props.changingProduct?.zipCode ?? "",
        telephoneNumber: this.$props.changingProduct?.telephoneNumber ?? "",
      };
    },
  },
  updated() {
    this.logoSrc = this.logoSrc =
      this.$props.changingProduct?.logo ?? noImageURL;
    this.coverImageSrc = this.coverImageSrc =
      this.$props.changingProduct?.coverImage ?? noImageURL;
  },
});
</script>

<style scoped lang="scss"></style>
