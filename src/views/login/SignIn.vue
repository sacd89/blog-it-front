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
        <strong class="title-description__title">Iniciar Sesión</strong>
        <p class="title-description__subtitle">
          Para administrar tu cuenta, ingresa tus datos e inicia sesión en tu
          cuenta de blog it.
        </p>
      </div>
      <BasicInput
        required
        :error="showError"
        inputId="username"
        label="Correo electrónico o nombre de usuario"
        placeholder="Ej: usuario@correo.com o nombreUsuario"
        v-model="username"
      />
      <BasicInput
        required
        :error="showError"
        isPassword
        inputId="password"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        v-model="password"
        :bottomText="showError ? 'Usuario / Contraseña incorrecto' : ''"
      />

      <BasicButton buttonText="Continuar" :disabled="!dataFilledCorrect" buttonType="filled" @click="login()" />
      <BasicLink buttonText="Regresar" buttonType="ghost" href="/"/>
    </div>
  </div>
</template>

<script>
import BasicInput from "@/components/BasicInput.vue";
import BasicButton from "@/components/BasicButton.vue";
import BasicLink from "@/components/BasicLink.vue";

import UserApi from "@/api/users.api";



export default {
  name: "SignIn",
  components: {
    BasicInput,
    BasicButton,
    BasicLink
  },
  data() {
    return {
      username: '',
      password: '',
      showError: false
    }
  },
  computed: {
    dataFilledCorrect() {
      return this.username !== '' && this.password !== '';
    }
  },
  methods: {
    async login() {
      const res = await UserApi.login({username: this.username, password: this.password}).catch(() => {
        this.showError = true;
      });

      if(res && res.status === 200) {
        localStorage.setItem('jwt', res.data.object);
        this.$router.push('/home');
      }
    }
  }
};
</script>
