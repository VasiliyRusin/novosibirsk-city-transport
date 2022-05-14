<template>
    <input v-model="input" class="input">
</template>

<script>
  export default {
    name: "NInput",
    props: {
      value: {
        type: [String, Number],
        default: ""
      }
    },
    
    computed: {
      input: {
        get () {
          return this.value;
        },
        
        set (value) {
          this.$emit("input", value);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
    .input {
        width: 100%;
        font: inherit;
        padding: math.div($ui-offset, 2);
        border: 2px solid rgb(237, 237, 237);
        border-radius: math.div($ui-offset, 2);
        background-color: rgb(255, 255, 255, 0.6);
    }
</style>
