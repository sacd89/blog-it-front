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
          <strong class="title-description__title">Categorias</strong>
          <p class="title-description__subtitle mb-5">
            Categorias de las publicaciones
          </p>
          <p class="title-description__subtitle mb-5 success" v-if="showMessageEditSuccess">
            Categoria guardada exitosamente
          </p>
          <p class="title-description__subtitle mb-5 success" v-if="showMessageDeleteSuccess">
            Categoria eliminada exitosamente
          </p>
          <div class="d-flex align-items-center">
            <div class="w-50 m-r-10">
                <BasicInput
                    required
                    inputId="name"
                    label="Nombe"
                    placeholder="Ej. Matematicas"
                    v-model="name"
                />
            </div>
            <div class="w-50">
                <BasicInput
                    required
                    inputId="name"
                    label="Tipos de archivos permitidos"
                    placeholder="Ej. txt, mp4"
                    v-model="allowTypes"

                />
            </div>
            <div style="margin-top: -15px;margin-left: 20px;">
                <BasicButton buttonText="Agregar" buttonType="stroke" @click="create()" :disabled="!name || !allowTypes" />
            </div>
          </div>
        </div>
        <div class="table-container">
          <table-lite
            :is-slot-mode="true"
            :is-loading="table.isLoading"
            :columns="table.columns"
            :rows="table.rows"
            :total="table.totalRecordCount"
            :sortable="table.sortable"
            @do-search="doSearch"
            @is-finished="table.isLoading = false"
          >
            <template v-slot:name="data">
              <input  v-model="data.value.name">
            </template>
            <template v-slot:allowTypes="data">
              <input  v-model="data.value.allowTypes">
            </template>
            <template v-slot:acciones="data">
              <div class="table-container__actions">
                <button class="edit" @click="edit(data)">
                  <i class="bi bi-send-fill"></i>
                </button>
                <button class="delete" @click="deleteData(data)">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </template>
          </table-lite>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BasicButton from "@/components/BasicButton.vue";
import BasicInput from "@/components/BasicInput.vue";
import { reactive } from "vue";
import TableLite from "vue3-table-lite";
//   import BasicLink from "@/components/BasicLink.vue";
import Topbar from "@/components/Topbar.vue";

import CategoryApi from "@/api/categories.api";


export default {
  name: "Categories",
  components: {
      BasicButton,
    BasicInput,
    TableLite,
    Topbar,
  },
  setup() {
  
  const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Nombre",
          field: "name",
          width: "46%",
          sortable: true,
        },
        {
          label: "Archivos permitidos",
          field: "allowTypes",
          width: "46%",
          sortable: false,
        },
        {
          label: "Acciones",
          field: "acciones",
          width: "5%",
          sortable: false,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
    });

    /**
     * Table search event
     */
     const doSearch = async (offset, limit, order, sort) => {
      table.isLoading = true;

      // Start use axios to get data from Server
      const query = {filters: {sort: {
        field: order,
        order: sort
      }}}

      const res = await CategoryApi.list(query).catch(() => {
        this.hasError = true;
      });

        table.rows = res.data.object;
        table.totalRecordCount = res.data.object.length;
        table.sortable.order = order;
        table.sortable.sort = sort;
    };

    /**
     * Table search finished event
     */
    const tableLoadingFinish = () => {
      table.isLoading = false;
    };

    // Get data first
    doSearch(0, 10, 'id', 'asc');

    return {
      table,
      doSearch,
      tableLoadingFinish,
    };
  },
  data() {
    return {
      hasError: false,
      name: '',
      allowTypes: '',
      showMessageEditSuccess: false,
      showMessageDeleteSuccess: false,
    }
  },
  methods: {
    async edit(data){
      const array = typeof data.value.allowTypes === 'string' ? data.value.allowTypes.split(',') : Object.values(data.value.allowTypes)
      const params = {
        categoryId: data.value.id,
        name: data.value.name,
        allowTypes: array
      }

      const res = await CategoryApi.update(params).catch(() => {
        this.hasError = true;
      })

      if(res && res.status === 200) {
        this.showMessageEditSuccess = true;
        setTimeout(() => {
          this.showMessageEditSuccess = false;
        }, 2000)
      }
    },
    async deleteData(data){
      const params = {
        categoryId: data.value.id
      }

      const res = await CategoryApi.delete(params).catch(() => {
        this.hasError = true;
      })

      if(res && res.status === 200) {
        this.showMessageDeleteSuccess = true;
        this.doSearch(0, 10, 'id', 'asc');
        setTimeout(() => {
          this.showMessageDeleteSuccess = false;
        }, 2000)
      }
    },
    async create(){
      const params = {
        name: this.name,
        allowTypes: this.allowTypes.split(',')
      }

      const res = await CategoryApi.create(params).catch(() => {
        this.hasError = true;
      })

      if(res && res.status === 200) {
        this.showMessageEditSuccess = true;
        this.name = '';
        this.allowTypes = '';
        this.doSearch(0, 10, 'id', 'asc');

        setTimeout(() => {
          this.showMessageEditSuccess = false;
        }, 2000)
      }
    }
  },
  async created () {
  }
};
</script>
