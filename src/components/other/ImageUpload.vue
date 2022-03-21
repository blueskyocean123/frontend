<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <v-tabs fixed-tabs>
        <v-tab @click="tab = 1;" :class="{ active: tab == 1 }">Image Link</v-tab>
        <v-tab @click="tab = 2;" :class="{ active: tab == 2 }">Image Upload</v-tab>
      </v-tabs>
      <br>
      <div v-if="tab == 1">
        <label for="url">Paste a image, photo or picture link, and press Add Image button:</label>
        <v-text-field
          v-model="imageSrc"
          label="Outlined"
          outlined
          clearable 
          id="url"
        ></v-text-field>
      </div>

      <div v-if="tab == 2">
        <label for="up">Really simple input upload:</label>
        <v-card-text>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            label="Click here to select a image file"
            outlined
            v-model="chosenFile"
            @change="fileChange" id="up" ref="file"
          >
          </v-file-input>
        </v-card-text>
      </div>

      <footer class="modal-footer">
        <button
          @click="insertImage"
          class="success"
          :title="validImage ? '' : 'Image URL needs to be valid'"
          :disabled="!validImage"
        >
          Add Image
        </button>
        <button @click="show = false;" class="danger">Close modal</button>
      </footer>
    </div>
  </div>
</template>

<script>
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";

export default {
  data() {
    return {
      imageSrc: "",
      command: null,
      show: false,
      tab: 1,
      chosenFile: { },
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        dictDefaultMessage: "UPLOAD A FILE"
      }
    };
  },
  computed: {
    validImage() {
      return (
        this.imageSrc.match(/unsplash/) !== null ||
        this.imageSrc.match(/\.(jpeg|jpg|gif|png)$/) != null
      );
    }
  },
  methods: {
    showModal(command) {
      // Add the sent command
      this.command = command;
      this.show = true;
    },
    vfileUploaded(file) {
      alert("Your image has been uploaded to the server");
      alert("NOTE THIS IS A DUMMY DEMO, THERE IS NO BACKEND");

      /** Here is where you get your URL/Base64 string or what ever.*/

      this.imageSrc = "https://source.unsplash.com/random/400x100";
    },

    fileChange(e) {
      let params = {
        imageFile: this.chosenFile
      };
      this.$store.dispatch('uploadImage', params)
      .then((res) => {
        this.imageSrc = res.data.msg;
        console.log(this.imageSrc);
      })
      .catch((error) => {
        //on fail do something
        alert(error);
      })
    },
    insertImage() {
      const data = {
        command: this.command,
        data: {
          src: this.imageSrc
        }
      };
      this.$emit("onConfirm", data);
      this.closeModal();
    },

    closeModal() {
      this.show = false;
      this.imageSrc = "";
      this.tab = 1;
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 40%;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
}

.modal-footer {
  margin-top: 10px;
}

label {
  display: block;
  margin: 0.25em 0;
}

button {
  font-family: inherit;
  font-size: 100%;
  padding: 0.5em 1em;
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  border: 1px solid #999;
  border: transparent;
  background-color: #e6e6e6;
  text-decoration: none;
  border-radius: 2px;
  cursor: pointer;
}

button.danger {
  background: rgb(202, 60, 60);
}

button.success {
  background: rgb(28, 184, 65);
}

button:disabled {
  opacity: 0.3;
}

button + button {
  margin-left: 10px;
}

.tab-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #222;
}

.tab-header button {
  color: #222;
  background: none;
  border: 0;
  flex: 1;
  padding: 5px 10px;
  cursor: pointer;
}

.tab-header button.active {
  background-color: #222;
  color: #fff;
}
</style>
