<template>
  <a :class="buttonClasses" :disabled="disabled" :href="href">
    {{ buttonText }}
    <i aria-hidden="true" :class="iconClass"></i>
  </a>
</template>

<script>
export default {
  name: "BasicButton",
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: false,
    },
    iconClass: {
      type: String,
      default: "iconsax-arrow-arrow-right",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: "filled", // Valor predeterminado es 'filled'
      validator(value) {
        // Validar que el valor de buttonType es uno de los tipos permitidos
        return ["filled", "ghost", "stroke"].includes(value);
      },
    },
  },
  computed: {
    buttonClasses() {
      return {
        button: true,
        "button__filled": this.buttonType === "filled",
        "button__ghost": this.buttonType === "ghost",
        "button__stroke": this.buttonType === "stroke",
      };
    },
  },
};
</script>
