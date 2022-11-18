<template>
  <div class="q-py-lg row">
    <div class="col-xs-12 col-sm-4 q-pb-lg form-info">
      <h4 class="text-subtitle1 q-my-none text-weight-bold">Avatar</h4>
      <p class="q-mb-none">Upload your profile image from here.</p>
    </div>

    <div class="bg-white col-xs-12 col-sm-8 shadow-1 rounded-borders">
      <Field name="avatar" v-slot="{ errorMessage, field }">
        <div
          class="q-pa-lg label-file-loader row"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
          <label
            id="drag-area"
            for="avatar"
            class="label-file-loader height-content"
            @drop.prevent="onDropFile"
          >
            <div
              tabindex="0"
              class="label-file-loader cursor-pointer back column flex-center rounded-borders border-dashed"
              :class="isInDragArea && 'dashed-on-drag'"
            >
              <q-icon name="cloud_upload" class="icon-download" />
              <p class="q-mb-none q-mt-md q-px-sm text-center">
                Upload an image or drag and drop PNG, JPG
              </p>
            </div>
          </label>
          <div v-if="previewImg" class="row q-mt-sm">
            <q-avatar rounded size="85px">
              <q-img :src="previewImg" spinner-color="green" />
              <q-badge
                class="cursor-pointer bg-white delete-badge"
                outline
                rounded
                label="x"
                floating
                @click="removeAvatar"
              />
            </q-avatar>
          </div>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            hidden
            @change="onChangeFile"
            class="border-dashed"
          />
        </div>
      </Field>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field } from "vee-validate";
import { useUserStore } from "@/stores/user";
import convertFileToBase64 from "@/utils/imageConvertHelper";

const userStore = useUserStore();

export default defineComponent({
  props: {
    avatar: String,
  },
  emits: {
    removeAvatar: () => true,
    changeAvatar: (value: string) => true,
  },
  components: {
    Field,
  },
  data() {
    return {
      previewImg: userStore.user?.avatar || "",
      isInDragArea: false,
    };
  },
  mounted() {
    function preventDefaults(e: Event) {
      e.preventDefault();
    }

    let dropArea = document.getElementById("drag-area");

    const events = ["dragenter", "dragover", "dragleave", "drop"];

    const highLight = () => {
      this.isInDragArea = true;
    };

    const unHighLight = () => {
      this.isInDragArea = false;
    };

    events.forEach((eventName) => {
      dropArea?.addEventListener(eventName, preventDefaults);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea?.addEventListener(eventName, highLight, false);
    });
    ["dragleave", "drop"].forEach((eventName) => {
      dropArea?.addEventListener(eventName, unHighLight, false);
    });
  },

  methods: {
    removeAvatar() {
      this.previewImg = "";
      this.$emit("removeAvatar");
    },

    async onDropFile(e: DragEvent) {
      const file = e.dataTransfer!.files[0];
      await this.changeAvatar(file);
    },

    async onChangeFile(e: Event) {
      const tar = e.target as EventTarget & HTMLInputElement;
      if (tar.files) {
        const file = tar.files[0];
        await this.changeAvatar(file);
      }
    },

    async changeAvatar(file: any) {
      this.previewImg = URL.createObjectURL(file);
      const resultFile = await convertFileToBase64(file);
      this.$emit("changeAvatar", resultFile as string);
    },
  },
});
</script>

<style scoped lang="scss">
.border-dashed {
  border-width: 2px;
  border-style: dashed;
  border-color: $gray-400;

  &:focus {
    border-color: $primary;
  }
}

.dashed-on-drag {
  border-color: $primary;
}

.icon-download {
  width: 41px;
  height: 30px;
  color: $gray-300;
  font-size: 41px;
}

.label-file-loader {
  height: 100%;
  width: 100%;
}

.height-content {
  height: 150px;
}

.form-info {
  color: $gray-600;
  @include media-sm {
    padding-top: 24px;
    padding-right: 16px;
  }
}

.delete-badge {
  color: $primary;
}
</style>
