<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         :width="width"
         :height="height"
         viewBox="0 0 16 16"
         :aria-labelledby="iconName">
        <title
            :id="iconName">
            {{ iconName }}
        </title>
        <g :fill="iconColor">
            <slot></slot>
        </g>
    </svg>
</template>

<script>
  export default {
    name: "NIcon",
    props: {
      iconName: {
        type: String,
        required: true
      },
      width: {
        type: [Number, String],
        default: 16
      },
      height: {
        type: [Number, String],
        default: 16
      },
      iconColor: {
        type: String,
        default: "currentColor"
      }
    }
  };
</script>

<style scoped>

</style>
