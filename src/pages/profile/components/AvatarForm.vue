<template>
  <div class="q-py-lg row">
    <div class="col-xs-12 col-sm-4 q-pb-lg form-info">
      <h4 class="text-subtitle1 q-my-none text-weight-bold">Avatar</h4>
      <p class="q-mb-none">Upload your profile image from here.</p>
    </div>

    <div class="bg-white col-xs-12 col-sm-8 shadow-1 rounded-borders">
      <div class="q-pa-lg label-file-loader row">
        <label
          id="drag-area"
          for="avatar"
          class="label-file-loader height-content"
          @drop.prevent="onDropFile"
        >
          <div
            tabindex="0"
            class="label-file-loader cursor-pointer back column flex-center rounded-borders border-dashed"
            :class="{ 'dashed-on-drag': isInDragArea }"
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
            <div
              class="q-badge q-badge--outline q-badge--floating q-badge--rounded cursor-pointer bg-white delete-badge no-padding row flex-center"
              @click="removeAvatar"
            >
              &#215;
            </div>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useField } from "vee-validate";
import { Notify } from "quasar";
import convertFileToBase64 from "@/utils/imageConvertHelper";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

export default defineComponent({
  setup() {
    const { setValue } = useField("avatar");

    return {
      setValue,
    };
  },
  data() {
    return {
      previewImg: userStore.user?.avatar || "",
      isInDragArea: false,
    };
  },
  mounted() {
    this.initialFunctionForDragAndDrop();
  },

  methods: {
    preventDefaults(e: Event) {
      e.preventDefault();
    },

    highLight() {
      this.isInDragArea = true;
    },

    unHighLight() {
      this.isInDragArea = false;
    },

    initialFunctionForDragAndDrop() {
      const events = ["dragenter", "dragover", "dragleave", "drop"];
      let dropArea = document.getElementById("drag-area");

      events.forEach((eventName) => {
        dropArea?.addEventListener(eventName, this.preventDefaults);
      });

      ["dragenter", "dragover"].forEach((eventName) => {
        dropArea?.addEventListener(eventName, this.highLight, false);
      });

      ["dragleave", "drop"].forEach((eventName) => {
        dropArea?.addEventListener(eventName, this.unHighLight, false);
      });
    },

    removeAvatar() {
      this.previewImg = "";
      this.setValue("");
    },

    onDropFile(e: DragEvent) {
      const file = e.dataTransfer!.files[0];
      this.onChangeAvatar(file);
    },

    onChangeFile(e: Event) {
      const tar = e.target as EventTarget & HTMLInputElement;
      if (tar.files) {
        const file = tar.files[0];
        this.onChangeAvatar(file);
      }
    },

    async onChangeAvatar(file: Blob) {
      try {
        this.previewImg = URL.createObjectURL(file);
        const resultFile = await convertFileToBase64(file);
        this.setValue(resultFile as String);
      } catch (error) {
        if (error instanceof Error) {
          Notify.create({
            type: "negative",
            position: "top-right",
            message: error.message,
          });
        }
      }
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
  width: 18px;
  height: 18px;
}
</style>
