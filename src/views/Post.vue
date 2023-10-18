<template>
  <div class="post-view">
    <Topbar></Topbar>
    <div class="hero-container">
      <img class="background" src="./../assets/images/background-landing.jpg" />
    </div>
    <div class="post-content" v-if="content">
      <div class="title-description">
        <strong class="title-description__title"> {{content.title}}</strong>
      </div>
      <div class="post-information">
        <p>
          {{content.description}} - Creado por: {{content.creator.username}}
        </p>

        <!-- <div id="carouselExampleControls" class="carousel slide" data-ride="false">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <iframe
                width="500"
                height="400"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
              >
              </iframe>
            </div>
            <div class="carousel-item">
              <img
                src="./../assets/images/background-login.jpg"
                class="d-block w-100"
                alt="Slide 1"
              />
            </div>
            <div class="carousel-item">
              <img
                src="./../assets/images/background-landing.jpg"
                class="d-block w-100"
                alt="Slide 1"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-target="#carouselExampleControls"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-target="#carouselExampleControls"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </button>
        </div> -->
      </div>
      <!-- <div class="title-description">
        <strong class="title-description__title"> Documentos</strong>
      </div> -->
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import ContentApi from "@/api/contents.api";

export default {
  name: "Post",
  components: {
    Topbar
  },
  data() {
    return {
      hasError: false,
      content: null
    }
  },
  methods: {
    async getPost() {
      const id = this.$route.params.id;

      const res = await ContentApi.getById({id}).catch(() => {
        this.hasError = true;
      });

      if(res && res.status === 200) {
        this.content = res.data.object;
      }
    }
  },
  async created () {
    await this.getPost(); 
  } 
};
</script>
