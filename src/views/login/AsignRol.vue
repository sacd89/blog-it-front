<template>
  <div class="login-view">
    <div class="left-side">
      <img
        class="background"
        src="./../../assets/images/background-login.jpg"
      />
      <img class="logo" src="./../../assets/images/blogit-logo-small.png" />
    </div>
    <div class="right-side">
      <img class="logo" src="./../../assets/images/blogit-logo-dark.png" />
      <div class="title-description">
        <strong class="title-description__title">Asignar Rol</strong>
        <p class="title-description__subtitle">
          Para completar tu registro selecciona un Rol.
        </p>
      </div>
      <div class="col-12 col-md-6">
        <div class="input">
          <div class="input__container">
            <select class="custom-select" id="inputGroupSelect01" v-model="rolSelected">
              <option v-for="(rol, index) in rols" :key="index" :value="rol">
                {{ getNameRol(rol) }}
              </option>
            </select>
            <label>
              Rol
              <span>*</span>
            </label>
          </div>
        </div>
      </div>
      <BasicButton
        buttonText="Continuar"
        :disabled="!rolSelected"
        buttonType="filled"
        @click="saveUser()"
      />
      <BasicLink buttonText="Cerrar Sesion" buttonType="ghost" href="signIn" />
    </div>
  </div>
</template>

<script>
import BasicButton from "@/components/BasicButton.vue";
import BasicLink from "@/components/BasicLink.vue";
import {mapGetters} from "vuex";

import UserApi from "@/api/users.api";

import {
  GET_USER,
  // STORE as sessionStore
} from "@/store/modules/session/session.types";

export default {
  name: "AsignRol",
  components: {
    BasicButton,
    BasicLink,
  },
  data() {
    return {
      showError: false,
      rols: ["ADMIN", "READER", "CREATOR"],
      rolSelected: null
    };
  },
  computed: {
    ...mapGetters({
      user: GET_USER
    })
  },
  methods: {
    getNameRol(rol) {
      switch (rol) {
        case "ADMIN":
          return "Administrador";
        case "READER":
          return "Lector";
        case "CREATOR":
          return "Creador";
      }
    },
    async saveUser() {
      const res = await UserApi.update({
        userId: this.user.id,
        rol: this.rolSelected,
      }).catch(() => {
        this.showError = true;
      });

      if (res && res.status === 200) {
        this.$router.push("/home");
      }
    },
  },
};
</script>
