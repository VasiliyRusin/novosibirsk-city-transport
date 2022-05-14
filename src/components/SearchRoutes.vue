<template>
    <ul v-if="routes" class="search-result">
        <li :key="key(route)" v-for="route in routes" class="route">
            <SearchRoute :route="route"></SearchRoute>
        </li>
    </ul>
</template>

<script>
  import SearchRoute from "@/components/SearchRoute";
  
  export default {
    name: "SearchRoutes",
    components: { SearchRoute },
    props: {
      routes: {
        type: Array,
        default: undefined
      }
    },
    
    methods: {
      key (route) {
        return `${ route.type }-${ route.route }`;
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
    .search-result {
        margin: 0;
        height: 100%;
        list-style: none;
        overflow-y: scroll;
        padding: math.div($ui-offset, 2) 0 0;
        
        @media screen and (min-width: 768px) {
            margin: 0 -15px 0 0;
        }
        
        .route {
            &:not(:last-child) {
                border-bottom: 1px solid rgb(237, 237, 237);
            }
        }
    }
</style>
