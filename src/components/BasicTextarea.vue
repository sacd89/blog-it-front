<template>
  <div class="input"   :class="[error ? 'error': '']">
    <div class="input__container">
      <textarea autocomplete="off" :id="id" :required="required" :placeholder="placeholder" :value="modelValue" @input="onInput"/>
      <label :for="id">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </div>
    <small>{{ bottomText }}</small>
  </div>
</template>

<script>
export default {
  name: "BasicTextarea",
  props: {
    modelValue: String,
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    bottomText: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    isPassword: {
      type: Boolean,
      default: false, // Por defecto, el input no es de tipo password
    },
  },
  emits:["update:modelValue"],
  methods:{
    onInput(e){
      this.$emit("update:modelValue",e.target.value)
    }
  }
};
</script>
