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
          <div class="d-flex align-items-center">
            <div class="w-100">
                <BasicInput
                    required
                    inputId="name"
                    label="Agregar Categoria"
                    placeholder="Ej. Matematicas"
                />
            </div>
            <div style="margin-top: -15px;margin-left: 20px;">
                <BasicButton buttonText="Agregar" buttonType="stroke" disabled />
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
            <template v-slot:categoria="data">
              <input :value="data.value.categoria">
            </template>
            <template v-slot:acciones>
              <div class="table-container__actions">
                <button class="edit">
                  <i class="bi bi-send-fill"></i>
                </button>
                <button class="delete">
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
// Fake Data for 'asc' sortable
const sampleData1 = (offst, limit) => {
  offst = offst + 1;
  let data = [];
  for (let i = offst; i <= limit; i++) {
    data.push({
      id: i,
      categoria: "Publicacion" + i,
      acciones: "`<button>test</button>`",
    });
  }
  return data;
};

// Fake Data for 'desc' sortable
const sampleData2 = (offst, limit) => {
  let data = [];
  for (let i = limit; i > offst; i--) {
    data.push({
      id: i,
      categoria: "Publicacion" + i,
      acciones: "`<button>test</button>`",
    });
  }
  return data;
};
export default {
  name: "Home",
  components: {
    //   BasicInput,
      BasicButton,
    //   BasicLink,
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
          label: "Categoria",
          field: "categoria",
          width: "92%",
          sortable: true,
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

    const doSearch = (offset, limit, order, sort) => {
      table.isReSearch = offset == undefined ? true : false;
      if (offset >= 0 || limit >= 5) {
        limit = 5;
      }
      if (sort == "asc") {
        table.rows = sampleData1(offset, limit);
      } else {
        table.rows = sampleData2(offset, limit);
      }
      table.totalRecordCount = 5;
      table.sortable.order = order;
      table.sortable.sort = sort;
    };

    doSearch(0, 5, "id", "asc");

    return {
      table,
      doSearch,
    };
  },
};
</script>
