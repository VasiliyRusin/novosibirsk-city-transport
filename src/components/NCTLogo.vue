<template functional>
    <svg v-if="props.type === 'default'"
         xmlns="http://www.w3.org/2000/svg"
         xml:space="preserve"
         fill-rule="evenodd"
         stroke-linejoin="round"
         stroke-miterlimit="2"
         clip-rule="evenodd"
         viewBox="0 0 1700 600">
        <path fill-rule="nonzero" d="M300 150v33H183v150h234v-33h33v133h-17v17c0 9-7 17-16 17h-17c-9 0-17-8-17-17v-17H217v17c0 9-8 17-17 17h-17c-9 0-16-8-16-17v-17h-17V300h-17v-67h17v-50c0-18 15-33 33-33h117Zm-50 217h-67v33h67v-33Zm167 0h-67v33h67v-33Zm-9-250c41 0 75 34 75 75s-34 75-75 75-75-34-75-75 34-75 75-75Zm0 86c-8 0-15 3-21 8l-2 2 23 23 24-23c-6-7-15-10-24-10Zm0-45c-19 0-38 7-52 20l-3 3 16 16a55 55 0 0 1 76-3l3 3 15-16a78 78 0 0 0-55-23Z"></path>
        <g font-family="system-ui" font-weight="900">
            <text x="400" y="444" font-size="131" transform="translate(220 -133) scale(.93957)">Новосибирский</text>
            <text x="400" y="554" font-size="96" transform="translate(220 -133) scale(.93957)">г<tspan x="444" y="554">о</tspan>родск<tspan x="809" y="554">о</tspan>й транспор<tspan x="1416" y="554">т</tspan></text>
        </g>
    </svg>
    <svg v-else-if="props.type === 'icon'"
         xmlns="http://www.w3.org/2000/svg"
         xml:space="preserve"
         fill-rule="evenodd"
         stroke-linejoin="round"
         stroke-miterlimit="2"
         clip-rule="evenodd"
         viewBox="0 0 600 600">
        <path fill-rule="nonzero" d="M300 150v33H183v150h234v-33h33v133h-17v17c0 9-7 17-16 17h-17c-9 0-17-8-17-17v-17H217v17c0 9-8 17-17 17h-17c-9 0-16-8-16-17v-17h-17V300h-17v-67h17v-50c0-18 15-33 33-33h117Zm-50 217h-67v33h67v-33Zm167 0h-67v33h67v-33Zm-9-250c41 0 75 34 75 75s-34 75-75 75-75-34-75-75 34-75 75-75Zm0 86c-8 0-15 3-21 8l-2 2 23 23 24-23c-6-7-15-10-24-10Zm0-45c-19 0-38 7-52 20l-3 3 16 16a55 55 0 0 1 76-3l3 3 15-16a78 78 0 0 0-55-23Z"></path>
    </svg>
    <svg v-else-if="props.type === 'text'"
         xmlns="http://www.w3.org/2000/svg"
         xml:space="preserve" fill-rule="evenodd"
         stroke-linejoin="round"
         stroke-miterlimit="2"
         clip-rule="evenodd"
         viewBox="0 0 1200 600">
        <g font-family="system-ui" font-weight="900">
            <text x="400" y="444" font-size="131" transform="translate(-280 -133) scale(.93957)">Новосибирский</text>
            <text x="400" y="554" font-size="96" transform="translate(-280 -133) scale(.93957)">г<tspan x="444" y="554">о</tspan>родск<tspan x="809" y="554">о</tspan>й транспор<tspan x="1416" y="554">т</tspan></text>
        </g>
    </svg>
</template>

<script>
  export default {
    name: "NCTLogo",
    props: {
      type: {
        type: String,
        default: "default",
        validate: v => ["default", "icon", "text"].includes(v)
      }
    }
  };
</script>

<style scoped>

</style>
