<template>
  <form @submit.prevent="submitForm">
    <div class="form-control mb-10" :class="{ invalid: !bodyData.isValid }">
      <label for="" class="block text-sm font-medium text-gray-700">Full details</label>
      <div class="mt-1">
        <editor
          id="body"
          v-model.trim="bodyData.val"
          @blur="clearValidity('bodyData')"
          api-key="no-api-key"
          initial-value=""
          :init="{
            images_upload_url: 'http://localhost/api/image/upload.php',
            images_upload_handler: imageUploadHandler,
            convert_urls: false,
            height: 500,
            menubar: false,
            /*
            menu: {
              file: {
                title: 'File',
                items: 'newdocument restoredraft | preview | print ',
              },
              edit: {
                title: 'Edit',
                items: 'undo redo | cut copy paste | selectall | searchreplace',
              },
              view: {
                title: 'View',
                items:
                  'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen',
              },
              insert: {
                title: 'Insert',
                items:
                  'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime',
              },
              format: {
                title: 'Format',
                items:
                  'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat',
              },
              tools: {
                title: 'Tools',
                items: 'spellchecker spellcheckerlanguage | code wordcount',
              },
              table: {
                title: 'Table',
                items: 'inserttable | cell row column | tableprops deletetable',
              },
              help: { title: 'Help', items: 'help' },
            },
			*/
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            /*
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            */
            toolbar:
              'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
              'forecolor backcolor emoticons | help',
          }"
        />
      </div>
      <p v-if="!bodyData.isValid" class="error-prompt">Body can't be empty.</p>
    </div>
    <div class="form-control mb-10" :class="{ invalid: !titleData.isValid }">
      <label for="title" class="block text-sm font-medium text-gray-700"
        >Title</label
      >
      <div class="mt-1">
        <input
          type="text"
          id="title"
          class="
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            sm:text-sm
            border-gray-300
            rounded-md
          "
          v-model.trim="titleData.val"
          @blur="clearValidity('titleData')"
        />
      </div>
      <p v-if="!titleData.isValid" class="error-prompt">{{ titleData.errorMsg || "Title can't be blank." }}</p>
    </div>
    <div class="form-control mb-10" :class="{ invalid: !descriptionData.isValid }">
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Brief description</label
      >
      <div class="mt-1">
        <textarea
          id="description"
          rows="5"
          maxlength="500"
          class="
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            sm:text-sm
            border-gray-300
            rounded-md
          "
          v-model.trim="descriptionData.val"
          @blur="clearValidity('descriptionData')"
        ></textarea>
      </div>
      <p v-if="!descriptionData.isValid" class="error-prompt">
        Brief description can't be blank.
      </p>
    </div>
    <div class="form-control mb-10">
      <label for="imageCaption" class="block text-sm font-medium text-gray-700"
        >Image caption</label
      >
      <div class="mt-1">
        <input
          type="text"
          id="imageCaption"
          class="
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            sm:text-sm
            border-gray-300
            rounded-md
          "
          v-model.trim="imageCaptionData.val"
        />
      </div>
    </div>
    <div class="form-control mb-10">
      <label for="imageAlt" class="block text-sm font-medium text-gray-700"
        >Image alt text</label
      >
      <div class="mt-1">
        <input
          type="text"
          id="imageAlt"
          class="
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            sm:text-sm
            border-gray-300
            rounded-md
          "
          v-model.trim="imageAltData.val"
        />
      </div>
    </div>
    <div class="form-control mb-10" :class="{ invalid: !readingTimeData.isValid }">
      <label for="readingTime" class="block text-sm font-medium text-gray-700"
        >Reading time</label
      >
      <div class="mt-1">
        <input
          type="text"
          id="readingTime"
          class="
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            sm:text-sm
            border-gray-300
            rounded-md
          "
          v-model.trim="readingTimeData.val"
          @blur="clearValidity('readingTimeData')"
        />
      </div>
      <p v-if="!readingTimeData.isValid" class="error-prompt">
        Reading time can't be blank.
      </p>
    </div>
    <div class="form-control mb-10" :class="{ invalid: !authorData.isValid }">
      <label for="author" class="block text-sm font-medium text-gray-700"
        >Author</label
      >
      <div class="mt-1">
        <input
          type="text"
          id="author"
          class="
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            sm:text-sm
            border-gray-300
            rounded-md
          "
          v-model.trim="authorData.val"
          @blur="clearValidity('authorData')"
        />
      </div>
      <p v-if="!authorData.isValid" class="error-prompt">Author can't be blank.</p>
    </div>
    <div>
      <p v-if="!formIsValid" class="error-prompt">
        Please fix the input errors and try again.
      </p>
    </div>
    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="button"
          class="
            bg-white
            py-2
            px-4
            border border-gray-300
            rounded-md
            shadow-sm
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
        >
          Cancel
        </button>
        <button
          type="submit"
          class="
            ml-3
            inline-flex
            justify-center
            py-2
            px-4
            border border-transparent
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
        >
          {{ submitBtnText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/print";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/paste";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";

export default {
  components: {
    editor: Editor,
  },
  props: {
    mode: {
      type: String,
      default: "" // 'new' or 'update'
    },
    id: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ""
    },
    body: {
      type: String,
      default: ""
    },
    categoryId: {
      type: String,
      default: "1"
    },
    description: {
      type: String,
      default: ""
    },
    imageCaption: {
      type: String,
      default: ""
    },
    imageUrl: {
      type: String,
      default: ""
    },
    imageAlt: {
      type: String,
      default: ""
    },
    readingTime: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: "Jonathan"
    },
    datePosted: {
      type: String,
      default: ""
    }
  },
  emits: ["save-data"],
  data() {
    return {
      bodyData: {
        val: this.body,
        isValid: true,
      },
      titleData: {
        val: this.title,
        isValid: true,
        errorMsg: null
      },
      descriptionData: {
        val: this.description,
        isValid: true,
      },
      categoryIdData: {
        val: this.categoryId,
        isValid: true,
      },
      imageCaptionData: {
        val: this.imageCaption,
        isValid: true,
      },
      imageUrlData: {
        val: this.imageUrl,
        isValid: true,
      },
      imageAltData: {
        val: this.imageAlt,
        isValid: true,
      },
      readingTimeData: {
        val: this.readingTime,
        isValid: true,
      },
      authorData: {
        val: this.author,
        isValid: true,
      },
      formIsValid: true,
    };
  },
  computed: {
    submitBtnText() {
      if (this.mode === "new") {
        return "Publish";
      } else if (this.mode === "update") {
        return "Update";
      } else {
        return "Broken";
      }
    }
  },
  methods: {
    imageUploadHandler(blobInfo, success, failure) {
      var xhr, formData;

      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open("POST", "http://localhost/api/image/upload.php");

      xhr.onload = function () {
        var json;

        if (xhr.status != 200) {
          failure("HTTP Error: " + xhr.status);
          return;
        }

        json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != "string") {
          failure("Invalid JSON: " + xhr.responseText);
          return;
        }

        success(json.location);
      };

      formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.bodyData.val === "") {
        this.bodyData.isValid = false;
        this.formIsValid = false;
      }
      if (this.titleData.val === "") {
        this.titleData.isValid = false;
        this.formIsValid = false;
      }
      for (let i = 0; i < this.$store.getters['blog/posts'].length; i++) {
        if (this.$store.getters['blog/posts'][i].id === this.id) continue
        if (this.titleData.val.replace(/[\W_]+/g,'-').toLowerCase() === this.$store.getters['blog/posts'][i].slug) {
          this.titleData.isValid = false;
          this.titleData.errorMsg = "The title already belongs to an existing post";
          this.formIsValid = false;
        }
      }
      if (this.descriptionData.val === "") {
        this.descriptionData.isValid = false;
        this.formIsValid = false;
      }
      /*
				if(this.imageCaptionData.val === '') {
					this.imageCaptionData.isValid = false;
					this.formIsValid = false;
				}
				if(this.imageAltData.val === '') {
					this.imageAltData.isValid = false;
					this.formIsValid = false;
				}
				*/
      if (this.readingTimeData.val === "") {
        this.readingTimeData.isValid = false;
        this.formIsValid = false;
      }
      if (this.authorData.val === "") {
        this.authorData.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      let formData = {}
      if (this.mode === "new") {
        formData = {
          body: this.bodyData.val,
          title: this.titleData.val,
          desc: this.descriptionData.val,
          categoryId: this.categoryIdData.val,
          imgCap: this.imageCaptionData.val,
          imgUrl: this.imageUrlData.val,
          imgAlt: this.imageAltData.val,
          readTime: this.readingTimeData.val,
          author: this.authorData.val,
        };
      } else if (this.mode === "update") {
        formData = {
          id: this.id,
          title: this.titleData.val,
          desc: this.descriptionData.val,
          body: this.bodyData.val,
          categoryId: this.categoryIdData.val,
          imgUrl: this.imageUrlData.val,
          imgCap: this.imageCaptionData.val,
          imgAlt: this.imageAltData.val,
          readTime: this.readingTimeData.val,
          author: this.authorData.val,
          datePosted: this.datePosted
        };
      }
      this.$emit("save-data", formData);
    },
  }		
};
/*
		//id
		title
		//slug
		//category
		//tags
		description
		body
		//datePosted
		//imageUrl
		imageCaption
		imageAlt		
		readingTime
		author
	*/
</script>

<style>
.error-prompt {
  color: red;
}

.form-control .error-prompt {
  text-align: right;
}

.invalid input,
.invalid .tox-tinymce,
.invalid textarea {
  border: 1px solid red;
}
</style>