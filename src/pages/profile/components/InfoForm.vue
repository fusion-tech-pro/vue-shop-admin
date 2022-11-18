<template>
  <div class="q-py-lg row">
    <div class="col-xs-12 col-sm-4 q-pb-lg form-info">
      <h4 class="text-subtitle1 q-my-none text-weight-bold">Information</h4>
      <p class="q-mb-none">Add your profile information from here</p>
    </div>

    <div class="bg-white col-xs-12 col-sm-8 shadow-1 rounded-borders">
      <div class="q-pa-lg">
        <Field name="userName" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Name"
            class="q-mb-md"
            v-bind="field"
            :model-value="value"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>

        <Field name="email" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Email"
            class="q-mb-md"
            v-bind="field"
            :model-value="value"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>

        <Field name="userBio" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            type="textarea"
            label="Bio"
            class="q-mb-md"
            autogrow
            :input-style="{ maxHeight: '120px', minHeight: '120px' }"
            v-bind="field"
            :model-value="value"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>

        <Field name="contactNumber" v-slot="{ value, errorMessage, field }">
          <q-input
            outlined
            label="Contact Number"
            v-bind="field"
            :model-value="value"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
      </div>
    </div>
    <div class="col-12 q-pt-lg row justify-end">
      <q-btn color="primary" type="submit" :loading="loading">Save</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field } from "vee-validate";

export default defineComponent({
  props: {
    loading: Boolean,
  },
  components: {
    Field,
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped lang="scss">
.form-info {
  color: $gray-600;
  @include media-sm {
    padding-top: 24px;
    padding-right: 16px;
  }
}
</style>
