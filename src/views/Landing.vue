<template>
  <div class="landing-view">
    <Topbar logout />
    <div class="hero-container">
      <img class="logo" src="./../assets/images/blogit-logo.png" />
      <img class="background" src="./../assets/images/background-landing.jpg" />
    </div>
    <div class="searchbar-container" id="publicaciones" v-if="contents.length > 0">
      <div class="searchbar">
        <div class="input-container">
          <i class="bi bi-search"></i>
          <input placeholder="Buscar..." v-model="searchText" />
        </div>
        <BasicButton buttonText="Buscar" buttonType="filled" @click="getContentList()" />
      </div>
    </div>
    <div class="post-container" >
      <div class="items-container" v-if="contents.length > 0">
        <a v-for="(content, index) in paginatedData" :key="index">
          <div class="post-card">
            <img :src="content.image" />
            <div class="info">
              <div class="title">{{content.title}}</div>
            </div>
          </div>
        </a>
        <nav class="mt-5 w-100" >
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
      <div class="card-container" v-if="contents.length === 0 && !hasSearching">
        <div class="emptystate">
          <img src="./../assets/images/emptystate.svg" />
          <div class="title">
            Sin publicaciones <br />
            <span>
              Lo sentimos, en este momento no existen publicaciones.
            </span>
          </div>
        </div>
      </div>
      <div class="emptystate" v-if="contents.length === 0 && hasSearching">
        <img src="./../assets/images/emptystate.svg" />
        <div class="title">
          Sin resultados <br />
          <span> Intenta con otra busqueda </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicButton from "@/components/BasicButton.vue";
import Topbar from "@/components/Topbar.vue";
import ContentApi from "@/api/contents.api";

export default {
  name: "Landing",
  components: {
    BasicButton,
    Topbar,
  },
  data() {
    return {
        contents: [],
        hasSearching: false,
        searchText: '',
        page: 1,
        perPage: 4
      };
  },
  computed: {
    paginatedData() {
      return this.contents.length > 0 ? this.contents.slice((this.page - 1) * this.perPage, this.page * this.perPage) : []
    }
  },
  methods: {
    async getContentList() {
      const params = {};

      if(this.searchText !== '') {
        params.filters = {search: this.searchText};
      }
      const res = await ContentApi.list(params);

      if(res.status === 200) {
        this.contents = res.data.object;
      }
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
    }
  },
  async created () {
    await this.getContentList();
  }
};
</script>
