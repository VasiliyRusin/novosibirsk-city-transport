<template>
    <div class="selected-route">
        <div class="icon" :class="{ [route.type]: true }">
            <NIcon
                :icon-name="`${ routeTypeLabel } №${ route.label }`"
                width="18"
                height="18"
                icon-color="#ffffff">
                <component :is="routeIcon"></component>
            </NIcon>
        </div>

        <div class="content">
            {{ route.label }}
        </div>
        
        <SelectedRouteDirection :route="route"></SelectedRouteDirection>

        <button class="icon button close" @click="removeRoute(route.id)">
            <span class="material-icons-round">
                close
            </span>
        </button>
    </div>
</template>

<script>
  import BaseRoute from "@/components/BaseRoute";
  import SelectedRouteDirection from "@/components/SelectedRouteDirection";
  import { mapActions } from "vuex";

  export default {
    name: "SelectedRoute",
    extends: BaseRoute,
    components: { SelectedRouteDirection },
    
    methods: {
      ...mapActions("routes", ["REMOVE_SELECTED_ROUTE"]),
      
      removeRoute (id) {
        this.REMOVE_SELECTED_ROUTE(id);
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";

    .selected-route {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        height: $ui-offset * 2.5;
        backdrop-filter: blur(10px);
        border-radius: $ui-offset * 2;
        justify-content: space-between;
        padding: math.div($ui-offset, 4);
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 1px 3px 0 rgb(38 38 38 / 50%);

        .icon {
            display: flex;
            border-radius: 50%;
            align-items: center;
            width: $ui-offset * 2;
            height: $ui-offset * 2;
            justify-content: center;
    
            &.bus {
                background-color: $bus-color;
            }
    
            &.minibus {
                background-color: $minibus-color;
            }
    
            &.trolleybus {
                background-color: $trolleybus-color;
            }
    
            &.tram {
                background-color: $tram-color;
            }

            &.close {
                color: crimson;
            }
        }

        .material-icons-round {
            font-size: 1.2em;
        }

        .button {
            border: none;
            cursor: pointer;
            transition: all 300ms;
            background-color: transparent;

            &:hover {
                background-color: rgba(150, 150, 150, 0.1);
            }
        }

        .content {
            text-align: center;
            min-width: $ui-offset * 3;
        }
    }
</style>
