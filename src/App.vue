<template>
  <router-view />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style lang="scss">

$primary: #B931FC;
$primary-light: #e7b8fe;
$accent: #fc31da;
$accent-light: #feccf6;
$error: #E55051;
$info: #292AFB;
$warning: #F3BB1C;
$success: #50C14F;
$background: #FAFCFF;
$disabled: #EBECF0;
$text: #5F6185;
$title: #3C3E6A;
$white: #FFF;
$placeholder: #BBBBCB;

$poppins-font-light: Poppins-light;
$poppins-font-regular: Poppins-regular;
$poppins-font-medium: Poppins-medium;
$poppins-font-semibold: Poppins-semibold;
$poppins-font-bold: Poppins-bold;
$poppins-font-black: Poppins-black;

@import "assets/styles/main.scss";
</style>


