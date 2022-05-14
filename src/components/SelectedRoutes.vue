<template>
    <div ref="selectedRoutesWrapper" class="selected-routes-wrapper">
        <ul class="selected-routes">
            <li :key="selectedRoute.routeId" v-for="selectedRoute in selectedRoutes">
                <SelectedRoute :route="getRouteById(selectedRoute.routeId)"></SelectedRoute>
            </li>
        </ul>
    </div>
</template>

<script>
  import SelectedRoute from "@/components/SelectedRoute";
  import { mapState, mapGetters } from "vuex";
  
  export default {
    name: "SelectedRoutes",
    components: { SelectedRoute },
  
    computed: {
      ...mapState("routes", ["selectedRoutes"]),
      ...mapGetters("routes", ["getRouteById"])
    },
    
    provide () {
      return {
        parentRefs: this.$refs
      };
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";

    .selected-routes {
        display: flex;
        overflow: auto;
        gap: $ui-offset;
        list-style: none;
        flex-direction: row;
        pointer-events: auto;
        margin: 0 #{ -$ui-offset } -15px;
        padding: math.div($ui-offset, 4) $ui-offset;
    
        @media screen and (min-width: 768px) {
            padding: math.div($ui-offset, 4) $ui-offset math.div($ui-offset, 4) $ui-offset * 2;
        }
        
        &-wrapper {
            overflow: hidden;
            padding: 0 $ui-offset;
            height: $ui-offset * 3;
            margin: math.div(-$ui-offset, 4) #{ -$ui-offset } $ui-offset;
    
            @media screen and (min-width: 768px) {
                order: 1;
                margin: math.div(-$ui-offset, 4) #{ -$ui-offset } math.div(-$ui-offset, 4) #{ -$ui-offset * 2 };
            }
        }
    }
</style>
