<template>
  <div class="create-view">
    <Topbar></Topbar>
    <div class="card-container">
      <div class="title-description mb-5">
        <strong class="title-description__title">Crea una publicacion</strong>
        <p class="title-description__subtitle">
          Llena los campos obligadorios para crear una nueva publicacion
        </p>
      </div>
      <div class="d-flex justify-content-end">
      <BasicButton
          style="margin-bottom:10px"
          buttonText="Guardar contenido"
          buttonType="stroke"
          :disabled="!checkData()"
          @click="create()"
        />

      </div>
      <BasicInput
        required
        inputId="name"
        label="Titulo"
        placeholder="Sera el titulo de tu publicación"
        v-model="title"
      />
      <BasicTextarea
        required
        textareaId="text"
        label="Contenido"
        placeholder="Ingresa todo el texto que desees que forme parte de tu publicacion"
        v-model="description"
      />
      <div class="input">
        <div class="input__container">
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="customFilePortada"
              @change="uploadDocPortada"
            />
            <label class="custom-file-label" for="customFile"
              >Seleccionar Imagen de Portada</label
            >
          </div>
          <label> Imagen de portada </label>
        </div>
      </div>
      <div class="media-container">
        <div class="item">
          <img class="logo" src="./../assets/images/background-login.jpg" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="input">
            <div class="input__container">
              <select
                class="custom-select"
                id="inputGroupSelect01theme"
                v-model="theme"
                @change="selectTheme()"
              >
                <option disabled selected value hidden>
                  Selecciona el tema de tu contenido
                </option>
                <option
                  v-for="(theme, index) in themes"
                  :key="index"
                  :value="theme.id"
                >
                  {{ theme.name }}
                </option>
              </select>
              <label>
                Tema
                <span>*</span>
              </label>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <BasicButton
            buttonText="Agregar un tipo de contenido"
            buttonType="stroke"
            @click="showFormContentTypeM()"
            :disabled="!theme"
          />
        </div>
      </div>

      <div v-if="showFormContentType">
        <div class="col-12 col-md-6">
          <div class="input">
            <div class="input__container">
              <select
                class="custom-select"
                id="inputGroupSelect01category"
                v-model="category"
                @change="selectCategory()"
              >
                <option disabled selected value hidden>
                  Selecciona la categoria de tu publicacion
                </option>
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category"
                >
                  {{ category.name }}
                </option>
              </select>
              <label>
                Categoria
                <span>*</span>
              </label>
            </div>
          </div>
        </div>
        <div class="input" v-if="checkIfAcceptImages">
          <div class="input__container">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="customFile"
                @change="uploadDoc(doc)"
              />
              <label class="custom-file-label" for="customFile"
                >Seleccionar Imagen</label
              >
            </div>
            <label> Imagenes </label>
          </div>
        </div>

        <BasicInput
          v-if="checkIfAcceptVideos"
          inputId="name"
          label="Video"
          placeholder="Link de YouTube"
          v-model="contentTypeToSave.data"
        />

        <div class="input" v-if="checkIfAcceptDocs">
          <div class="input__container">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="customFileDocs"
                @change="uploadDocDocs(doc)"
              />
              <label class="custom-file-label" for="customFile"
                >Seleccionar archivo</label
              >
            </div>
            <label> Documentos </label>
          </div>
        </div>

        <BasicButton
          style="margin-bottom:10px"
          buttonText="Agregar Contenido"
          buttonType="stroke"
          @click="addContentType()"
          :disabled="!contentTypeToSave.data"
        />

        <div  v-for="(ct, index) in contentTypes" :key="index">
          <div class="media-container" v-if="checkIfIsImages(ct)">
            <div class="item">
              <img class="logo" :src="ct.data" />
            </div>
            
          </div>
          <div class="media-container vertical" v-if="checkIfIsVideos(ct)">
            <div class="item-container">
              <div class="item">
                <i class="bi bi-link-45deg"></i>
              </div>
              {{ct.data}}
            </div>
          </div>
          <div class="media-container vertical"  v-if="checkIfIsDocs(ct)">
            <div class="item-container">
              <div class="item">
                <i class="bi bi-link-45deg"></i>
              </div>
              {{ct.data}}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInput from "@/components/BasicInput.vue";
import BasicTextarea from "@/components/BasicTextarea.vue";
import BasicButton from "@/components/BasicButton.vue";
import Topbar from "@/components/Topbar.vue";

import ThemeApi from "@/api/themes.api";
import ContentApi from "@/api/contents.api";

export default {
  name: "CreatePost",
  components: {
    BasicInput,
    BasicTextarea,
    Topbar,
    BasicButton,
  },
  data() {
    return {
      title: "",
      description: "",
      theme: null,
      category: null,
      themes: [],
      categories: [],
      image: null,
      showFormContentType: false,
      contentTypes: [],
      contentTypeToSave: {
        category: null,
        data: null,
      },
    };
  },
  computed: {
    checkIfAcceptImages() {
      if (this.category) {
        const contains = ["jpg", "png"].some((element) => {
          return this.category.allowTypes.includes(element);
        });
        return contains;
      }

      return false;
    },
    checkIfAcceptVideos() {
      return this.category && this.category.allowTypes.includes("link");
    },
    checkIfAcceptDocs() {
      return this.category && this.category.allowTypes.includes("txt");
    },
  },
  methods: {
    checkIfIsImages(ct) {
        const contains = ["jpg", "png"].some((element) => {
          return ct.category.allowTypes.includes(element);
        });
        return contains;
    },
    checkIfIsVideos(ct) {
      return ct.category.allowTypes.includes("link");
    },
    checkIfIsDocs(ct) {
      return ct.category.allowTypes.includes("txt");
    },
    showFormContentTypeM() {
      this.showFormContentType = true;
    },
    async getThemes() {
      const res = await ThemeApi.list().catch(() => {
        this.hasError = true;
      });

      if (res && res.status === 200) {
        this.themes = res.data.object;
      }
    },
    async selectTheme() {
      this.category = null;
      const themeDetail = await ThemeApi.getById({ id: this.theme }).catch(
        () => {
          this.hasError = true;
        }
      );
      this.categories = themeDetail.data.object.categories;
    },
    selectCategory() {
      this.contentTypeToSave.category = this.category;
    },
    uploadDocPortada() {
      this.image = document.getElementById("customFilePortada").value;
    },
    uploadDoc() {
      this.contentTypeToSave.data = document.getElementById("customFile").value;
    },
    uploadDocDocs() {
      this.contentTypeToSave.data =
        document.getElementById("customFileDocs").value;
    },
    addContentType() {
      this.contentTypes.push({...this.contentTypeToSave});
      this.contentTypes.category = null;
      this.contentTypes.data = null;
      this.category = null;
    },
    checkData() {
      return this.title && this.description && this.image && this.theme && this.contentTypes.length > 0;
    },
    async create() {
      const res = await ContentApi.create(
        {
          title: this.title,
          description: this.description,
          image: this.image,
          theme: this.theme,
          data: this.contentTypes.map(ct => {
            ct.category = ct.category.id;

            return ct;
          }),
        }
      ).catch(() => {
          this.hasError = true;
        });

      if (res && res.status === 200) {
        this.$router.push("/home");
      }
    },
  },
  async created() {
    await this.getThemes();
  },
};
</script>
