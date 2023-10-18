<template>
  <div class="input"   :class="[error ? 'error': '']">
    <div class="input__container">
      <input autocomplete="off" :id="inputId" :required="required" :placeholder="placeholder" :type="inputType" key=""
       :value="modelValue" @input="onInput"
    />
      <label :for="inputId">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </div>
    <small>{{ bottomText }}</small>
  </div>
</template>

<script>
export default {
  name: "BasicInput",
  props: {
    modelValue: String,
    inputId: {
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
  computed: {
    inputType() {
      return this.isPassword ? 'password' : 'text';
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
