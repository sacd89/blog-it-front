<template>
  <div class="home-view">
    <Topbar></Topbar>
    <div class="title-description">
      <strong class="title-description__title"
        >Lee nuestras publicaciones</strong
      >
      <p class="title-description__subtitle">Descubre, aprende, comparte.</p>
    </div>
    <div class="searchbar-container" id="publicaciones">
      <div class="searchbar">
        <div class="input-container">
          <i class="bi bi-search"></i>
          <input placeholder="Buscar..." v-model="searchText"/>
        </div>
        <BasicButton buttonText="Buscar" buttonType="filled" @click="getContentList" />
      </div>
    </div>
    <div class="post-container">
      <div class="post-container__home">
        <div class="left">
          <div class="title-description text-left mb-5">
            <strong class="title-description__title">Temas</strong>
          </div>
          <ul>
            <li @click="findByTheme(null)">Todos los temas</li>
            <li  v-for="(theme, index) in themes" :key="index"  @click="findByTheme(theme)">{{theme.name}}</li>
          </ul>
        </div>
        <div class="right"  v-if="contents.length > 0">
          <div class="links">
            <a  v-for="(content, index) in paginatedData" :key="index" @click="goToDetails(content)">
              <div class="post-card">
                <img src="./../assets/images/background-landing.jpg" />
                <div class="info">
                  <div class="title">{{content.title}}</div>
                </div>
              </div>
            </a>
          </div>
          <nav class="mt-5">
            <ul class="pagination justify-content-end">
            <li class="page-item" @click="backPage()">
              <a class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" :class="page === item ? 'active' : ''" v-for="item in Math.ceil(contents.length / perPage)"
              :key="item" @click="goToPage(item)"><a class="page-link">{{item}}</a></li>
            <li class="page-item" @click="nextPage()">
              <a class="page-link"  aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
          </nav>
        </div>
        <div class="card-container" v-else>
        <div class="emptystate">
          <img src="./../assets/images/emptystate.svg" />
          <div class="title">
            Sin publicaciones <br />
            <span> Comienza a agregar publicaciones. </span>
          </div>
          <br />
          <BasicLink
            buttonText="Crear publicacion"
            buttonType="filled"
            href="/signin"
          />
        </div>
      </div>
      </div>
      
      <!-- <div class="card-container">
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
            <template v-slot:publicacion="data">
              <a class="publication-link" href="#">{{
                data.value.publicacion
              }}</a>
            </template>
            <template v-slot:acciones="data">
              <div class="table-container__actions">
                <a class="edit" :href="data.value.id">
                  <i class="bi bi-pencil-fill"></i>
                </a>
                <button class="delete">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </template>
          </table-lite>
        </div>
      </div>-->
    </div> 
  </div>
</template>

<script>
import BasicButton from "@/components/BasicButton.vue";
import BasicLink from "@/components/BasicLink.vue";
import Topbar from "@/components/Topbar.vue";

import ThemeApi from "@/api/themes.api";
import ContentApi from "@/api/contents.api";


export default {
  name: "Home",
  components: {
    BasicButton,
    BasicLink,
    // TableLite,
    Topbar
  },
  // setup() {
    // Table config
    // const table = reactive({
    //   isLoading: false,
    //   columns: [
    //     {
    //       label: "ID",
    //       field: "id",
    //       width: "3%",
    //       sortable: true,
    //       isKey: true,
    //     },
    //     {
    //       label: "Publicacion",
    //       field: "publicacion",
    //       width: "15%",
    //       sortable: true,
    //     },
    //     {
    //       label: "Tema",
    //       field: "tema",
    //       width: "10%",
    //       sortable: true,
    //     },
    //     {
    //       label: "Autor",
    //       field: "autor",
    //       width: "10%",
    //       sortable: true,
    //     },
    //     {
    //       label: "Acciones",
    //       field: "acciones",
    //       width: "5%",
    //       sortable: false,
    //     },
    //   ],
    //   rows: [],
    //   totalRecordCount: 0,
    //   sortable: {
    //     order: "id",
    //     sort: "asc",
    //   },
    // });


  // },
  data() {
    return {
      hasError: true,
      themes: [],
      contents: [],
      themeSelected: null,
      page: 1,
      perPage: 9,
      searchText: ''
    }
  },
    computed: {
    paginatedData() {
      return this.contents.length > 0 ? this.contents.slice((this.page - 1) * this.perPage, this.page * this.perPage) : []
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
    async getContentList() {
      const params = {};

      if(this.searchText !== '') {
        params.filters = {search: this.searchText};
      }

      if(this.themeSelected) {
        if(params.filters) {
          params.filters['field'] = {
            name: 'theme',
            value: this.themeSelected
          }
        } else {
          params.filters = { field: {
            name: 'theme',
            value: this.themeSelected
          }
          }
        }
      }

      const res = await ContentApi.list(params).catch(() => {
        this.hasError = true;
      });

      if(res && res.status === 200) {
        this.contents = res.data.object;
      }
    },
    async findByTheme(theme) {
      if(theme) {
        this.themeSelected=theme.id;
      } else {
        this.themeSelected = null;
      }
      await this.getContentList();
    },
    nextPage() {
      if (this.page !== Math.ceil(this.contents.length / this.perPage)) {
        this.page += 1;
      }
    },
    backPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
    },
    goToPage(numPage) {
      this.page = numPage;
    },
    goToDetails(content) {
      this.$router.push({name: 'postDetail',  params: { id: content.id },})
    }
  },
  async created () {
    await this.getContentList();
    await this.getThemes();
  }

};
</script>
