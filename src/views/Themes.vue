<template>
  <div class="home-view">
    <Topbar></Topbar>
    <div class="post-container">
      <div class="card-container d-none">
        <div class="title-description text-left mb-5">
          <strong class="title-description__title">Crea una publicacion</strong>
          <p class="title-description__subtitle">
            Llena los campos obligadorios para crear una nueva publicacion
          </p>
        </div>
        <BasicInput
          required
          inputId="name"
          label="Titulo"
          placeholder="Sera el titulo de tu publicación"
          v-model="name"
        />
        <BasicTextarea
          required
          textareaId="text"
          label="Contenido"
          placeholder="Ingresa todo el texto que desees que forme parte de tu publicacion"
        />
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="input">
              <div class="input__container">
                <select class="custom-select" id="inputGroupSelect01">
                  <option disabled selected value hidden>
                    Selecciona el tema de tu publicacion
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label>
                  Tema
                  <span>*</span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input">
              <div class="input__container">
                <select class="custom-select" id="inputGroupSelect01">
                  <option disabled selected value hidden>
                    Selecciona la categoria de tu publicacion
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label>
                  Categoria
                  <span>*</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="input">
          <div class="input__container">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" />
              <label class="custom-file-label" for="customFile"
                >Seleccionar Imagen</label
              >
            </div>
            <label> Imagenes </label>
          </div>
        </div>
        <div class="media-container">
          <div class="item">
            <img class="logo" src="./../assets/images/background-login.jpg" />
          </div>
          <div class="item">
            <img class="logo" src="./../assets/images/background-landing.jpg" />
          </div>
        </div>
        <BasicInput
          inputId="name"
          label="Video"
          placeholder="Link de YouTube"
        />
        <div class="media-container vertical">
          <div class="item-container">
            <div class="item">
              <i class="bi bi-link-45deg"></i>
            </div>
            Youtube link
          </div>
          <div class="item-container">
            <div class="item">
              <i class="bi bi-link-45deg"></i>
            </div>
            Youtube link
          </div>
        </div>
        <div class="input">
          <div class="input__container">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" />
              <label class="custom-file-label" for="customFile"
                >Seleccionar archivo</label
              >
            </div>
            <label> Documentos </label>
          </div>
        </div>
        <div class="media-container vertical">
          <div class="item-container">
            <div class="item">
              <i class="bi bi-link-45deg"></i>
            </div>
            Youtube link
          </div>
          <div class="item-container">
            <div class="item">
              <i class="bi bi-link-45deg"></i>
            </div>
            Youtube link
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="title-description text-left mb-3">
          <strong class="title-description__title">Temáticas</strong>
          <p class="title-description__subtitle mb-5">
            Temáticas de los contenidos
          </p>
          <p class="title-description__subtitle mb-5 success" v-if="showMessageEditSuccess">
            Temática guardada exitosamente
          </p>
          <p class="title-description__subtitle mb-5 success" v-if="showMessageDeleteSuccess">
            Temática eliminada exitosamente
          </p>
          <div class="d-flex align-items-center">
            <div class="w-100">
                <BasicInput
                    required
                    inputId="name"
                    label="Nombre"
                    placeholder="Ej. Matematicas"
                    v-model="name"
                />
            </div>
            <div class="col-12 col-md-6">
              <div class="input">
                <div class="input__container">
                  <select  multiple class="custom-select" id="inputGroupSelect01" v-model="categoriesSelected">
                    <option disabled selected value hidden>
                      Selecciona la categoria para tu temática
                    </option>
                    <option v-for="(category, index) in categories" :key="index" :value="category.id">{{category.name}}</option>
                  </select>
                  <label>
                    Categorias
                    <span>*</span>
                  </label>
                </div>
              </div>
            </div>
          
            <div style="margin-top: -15px;margin-left: 20px;">
                <BasicButton :buttonText="itemToEdit ? 'Editar' : 'Agregar'" buttonType="stroke" @click="create()" />
            </div>
          </div>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categorias</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(theme, index) in themes" :key="index">
                <th scope="row">{{theme.id}}</th>
                <td>{{theme.name}}</td>
                <td>{{theme.categories}}</td>
                <td>
                  <div class="table-container__actions">
                <button class="edit" @click="selectItemToEdit(theme)">
                  <i class="bi bi-send-fill"></i>
                </button>
                <button class="delete" @click="deleteData(theme)">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BasicButton from "@/components/BasicButton.vue";
import BasicInput from "@/components/BasicInput.vue";
import Topbar from "@/components/Topbar.vue";

import CategoryApi from "@/api/categories.api";
import ThemeApi from "@/api/themes.api";


export default {
  name: "Themes",
  components: {
      BasicButton,
    BasicInput,
    Topbar,
  },
  data() {
    return {
      hasError: false,
      categories: [],
      themes: [],
      name: '',
      categoriesSelected: [],
      itemToEdit: null
    }
  },
  methods: {
    async getThemes() {
      const res = await ThemeApi.list().catch(() => {
        this.hasError = true;
      });

      if(res && res.status === 200) {
        this.themes = res.data.object;
      }
    },
    async getCategories() {
      const res = await CategoryApi.list().catch(() => {
        this.hasError = true;
      });

      if(res && res.status === 200) {
        this.categories = res.data.object;
      }
    },
    async edit(){
      const params = {
        themeId: this.itemToEdit.id,
        name: this.name,
        categories: this.categoriesSelected
      };

      const res = await ThemeApi.update(params).catch(() => {
        this.hasError = true;
      })

      if(res && res.status === 200) {
        this.showMessageEditSuccess = true;
        this.name = '';
        this.itemToEdit = null;
        this.categoriesSelected = null;
        await this.getThemes();
        setTimeout(() => {
          this.showMessageEditSuccess = false;
        }, 2000)
      }
    },
    async deleteData(theme){
      const params = {
        themeId: theme.id
      }

      const res = await ThemeApi.delete(params).catch(() => {
        this.hasError = true;
      })

      if(res && res.status === 200) {
        this.showMessageDeleteSuccess = true;
        await this.getThemes();

        setTimeout(() => {
          this.showMessageDeleteSuccess = false;
        }, 2000)
      }
    },
    selectItemToEdit(theme) {
      this.itemToEdit = theme;
      this.name = theme.name;
      this.categoriesSelected = theme.categories;
    },
    async create(){
      if(this.itemToEdit) {
        await this.edit();
      } else {
        const params = {
          name: this.name,
          categories: this.categoriesSelected
        }
  
        const res = await ThemeApi.create(params).catch(() => {
          this.hasError = true;
        })
  
        if(res && res.status === 200) {
          this.showMessageEditSuccess = true;
          this.name = '';
          this.categoriesSelected = [];
          await this.getThemes();
  
          setTimeout(() => {
            this.showMessageEditSuccess = false;
          }, 2000)
        }

      }
    }
  },
  async created () {
    await this.getThemes();
    await this.getCategories();
  }
};
</script>
