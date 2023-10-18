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
          <strong class="title-description__title">Registro</strong>
          <p class="title-description__subtitle">
            Regístrate ahora para convertirte en parte de nuestra comunidad. Es fácil y rápido.
          </p>
        </div>
        <BasicInput
          required
          inputId="email"
          label="Correo electrónico"
          placeholder="Ej: usuario@correo.com"
          v-model="email"
        />
        <BasicInput
          required
          inputId="user"
          label="Nombre de usuario"
          placeholder="Ej: nombreUsuario"
          v-model="username"

        />
        <BasicInput
          required
          isPassword
          inputId="isPassword"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          v-model="password"

        />
        <BasicInput
          required
          isPassword
          inputId="isPassword2"
          label="Confirmar contraseña"
          placeholder="Ingresa tu contraseña"
          :bottomText="getPassTextEquals()"
          v-model="confirmPassword"

        />
  
        <BasicButton buttonText="Continuar" :disabled="!checkFields()" buttonType="filled" @click="register()" />
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
    name: "SignUp",
    components: {
      BasicInput,
      BasicButton,
      BasicLink
    },
    data() {
      return {
        confirmPassword: '',
        password: '',
        username: '',
        email: '',
        hasError: true
      }
    },
    methods: {
      getPassTextEquals() {
        if(this.confirmPassword.length > 0 && (this.confirmPassword !== this.password)) {
          return 'Contraseñas no coinciden';
        }
      },
      checkFields() {
        if(this.username && this.email && this.password && this.confirmPassword && (this.confirmPassword === this.password)) {
          return true;
        }
        return false;
      },
      async register() {
        const res = await UserApi.register({username: this.username, email: this.email, password: this.password, confirmPassword: this.confirmPassword}).catch(() => {
          this.hasError = true;
        });

        if(res && res.status === 200) {
          this.$router.push('/signin');
        }
      }
    }
  };
  </script>
  