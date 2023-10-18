<template>
  <div class="topbar">
    <img class="logo" src="./../assets/images/blogit-logo-small.png" />
    <div class="button-container">
      <BasicLink
        v-if="!logout"
        buttonText="Cerrar sesión"
        buttonType="ghost"
        @click="logoutMethod()"
      />
      <a
        v-if="!logout"
        class="button button__ghost topbar__button"
        href="/home"
      >
        Inicio
      </a>
      <a
        v-if="!logout && checkRol(['ADMIN'])"
        class="button button__ghost topbar__button"
        href="/themes"
      >
        Temáticas
      </a>
      <a
        v-if="!logout && checkRol(['ADMIN'])"
        class="button button__ghost topbar__button"
        href="/categories"
      >
        Categorias
      </a>
      <BasicLink
        v-if="!logout && checkRol(['ADMIN', 'CREATOR'])"
        buttonText="Crear publicación"
        buttonType="filled"
        href="/create"
      />
      <BasicLink
        v-if="logout"
        buttonText="Iniciar sesión"
        buttonType="ghost"
        href="/signin"
      />
      <BasicLink
        v-if="logout"
        buttonText="Crear cuenta"
        buttonType="filled"
        href="/signup"
      />
    </div>
  </div>
</template>

<script>
//   import BasicButton from "@/components/BasicButton.vue";
import BasicLink from "@/components/BasicLink.vue";
import {mapGetters} from "vuex";
import {
  GET_USER,
} from "@/store/modules/session/session.types";


export default {
  name: "Topbar",
  components: {
    BasicLink,
  },
  computed: {
    ...mapGetters({
      user: GET_USER
    })
  },
  props: {
    logout: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    checkRol(rols) {
      return rols.includes(this.user.rol);
    },
    logoutMethod() {
      localStorage.clear();
      this.$router.push('/')
    }
  }
};
</script>
