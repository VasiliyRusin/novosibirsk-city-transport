<template>
    <article class="route">
        <div class="icon icon-left" :class="{ [route.type]: true }">
            <NIcon
                :icon-name="`${ routeTypeLabel } №${ route.label }`"
                width="24"
                height="24"
                icon-color="#ffffff">
                <component :is="routeIcon"></component>
            </NIcon>
        </div>
        <h1 class="title" tabindex="1">
            {{ routeTypeLabel }} №{{ route.label }}
        </h1>
        <div class="station">
            <h3 class="station-start" tabindex="1">
                {{ route.stationA }}
            </h3>
            <h3 class="station-end" tabindex="1">
                {{ route.stationB }}
            </h3>
        </div>
        <button class="icon button icon-right" tabindex="1" :class="{ selected }" @click="selectRoute">
            <span v-if="selected" class="material-icons-round">
                close
            </span>
            <span v-else class="material-icons-round">
                add
            </span>
        </button>
    </article>
</template>

<script>
  import BaseRoute from "@/components/BaseRoute";
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    name: "SearchRoute",
    extends: BaseRoute,
    
    computed: {
      ...mapGetters("routes", ["isRouteSelected"]),
      
      selected () {
        return this.isRouteSelected(this.route.id);
      }
    },
    
    methods: {
      ...mapActions("routes", ["ADD_SELECTED_ROUTE", "REMOVE_SELECTED_ROUTE"]),
      
      selectRoute () {
        if (this.selected) {
          this.REMOVE_SELECTED_ROUTE(this.route.id);
        } else {
          this.ADD_SELECTED_ROUTE(this.route.id);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
    .route {
        display: grid;
        align-items: center;
        border-radius: $ui-offset;
        gap: 0 math.div($ui-offset, 2);
        padding: math.div($ui-offset, 2) $ui-offset;
        grid-template-areas: "icon-left title icon-right"
                             "icon-left station icon-right";
        grid-template-columns: min-content auto min-content;
        
        .icon {
            display: flex;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            
            &-left {
                $size: 40px;
    
                width: $size;
                height: $size;
                display: flex;
                grid-area: icon-left;
    
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
            }
    
            &-right {
                $size: 30px;
    
                color: black;
                width: $size;
                height: $size;
                grid-area: icon-right;
                background-color: transparent;
                
                &.selected {
                    color: crimson;
                }
            }
        }
        
        .button {
            border: none;
            cursor: pointer;
            background-color: transparent;
        }
        
        .title {
            margin: 0;
            display: block;
            grid-area: title;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        
        .station {
            display: grid;
            overflow: hidden;
            grid-area: station;
            align-items: center;
            gap: 0 math.div($ui-offset, 4);
            grid-template-areas: "station-start"
                                 "station-end";
            
            .icon {
                $size: 20px;
                
                width: $size;
                height: $size;
                grid-area: icon;
            }
            
            &-start, &-end {
                margin: 0;
                opacity: 0.8;
                font-size: 0.75em;
                font-weight: 500;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
    
            &-start {
                grid-area: station-start;
            }
    
            &-end {
                grid-area: station-end;
            }
        }
    }
</style>
