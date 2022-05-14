<template>
    <NPopup v-if="parent" :active.sync="showPopup" :append-to-element="parent">
        <button class="icon button" @click="showPopup = !showPopup">
            <span class="material-icons-round">
                {{ directionIcon }}
            </span>
        </button>
        <template #tooltip>
            <div class="station">
                <div class="direction">
                    <button class="button icon">
                        <span class="material-icons-round" @click="changeDirection">
                            {{ directionIcon }}
                        </span>
                    </button>
                </div>
                <h3 class="station-start" tabindex="1">
                    {{ route.stationA }}
                </h3>
                <h3 class="station-end" tabindex="1">
                    {{ route.stationB }}
                </h3>
            </div>
        </template>
    </NPopup>
</template>

<script>
  import NPopup from "@/components/ui/NPopup";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "SelectedRouteDirection",
    components: { NPopup },
  
    props: {
      route: {
        type: Object,
        required: true
      }
    },
    
    mounted () {
      this.parent = this.parentRefs.selectedRoutesWrapper;
    },
  
    data () {
      return {
        parent: undefined,
        showPopup: false
      };
    },
    
    computed: {
      ...mapGetters("routes", ["getSelectedRouteById"]),
      
      selectedRoute () {
        return this.getSelectedRouteById(this.route.id);
      },
      
      directions () {
        // Массив понадобится, чтобы вывести иконки в правильном
        // порядке, так как объект порядок не гарантирует.
        return ["backward", "two-way", "forward"];
      },
  
      directionsIcons () {
        const icons = ["arrow_upward", "swap_vert", "arrow_downward"];
    
        return Object.fromEntries(icons.map((_, i) => [this.directions[i], icons[i]]));
      },
  
      directionIcon () {
        return this.directionsIcons[this.selectedRoute.direction];
      }
    },
    
    methods: {
      ...mapActions("routes", ["UPDATE_SELECTED_ROUTE"]),
  
      changeDirection () {
        let direction = this.selectedRoute.direction;
        
        switch (direction) {
          case "backward":
            direction = "two-way";
            break;
          case "two-way":
            direction = "forward";
            break;
          case "forward":
            direction = "backward";
            break;
        }
        
        this.UPDATE_SELECTED_ROUTE({
          routeId: this.route.id,
          route: {
            direction
          }
        });
      }
    },
    
    inject: {
      parentRefs: {
        from: "parentRefs"
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
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
        font-size: 1.4em;
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

    .station {
        display: grid;
        overflow: hidden;
        grid-area: station;
        align-items: center;
        gap: 0 math.div($ui-offset, 4);
        grid-template-areas: "direction station-start"
                             "direction station-end";
    
        .icon {
            $size: 30px;
        
            width: $size;
            height: $size;
            grid-area: icon;
        }
        
        .direction {
            display: flex;
            align-items: center;
            grid-area: direction;
            justify-content: center;
        }
    
        &-start, &-end {
            margin: 0;
            opacity: 0.8;
            overflow: hidden;
            font-weight: 500;
            font-size: 0.875em;
            white-space: nowrap;
            text-overflow: ellipsis;
            
            &:before {
                $size: 6px;
                
                content: "";
                width: $size;
                height: $size;
                border-radius: 50%;
                display: inline-block;
            }
        }
    
        &-start {
            grid-area: station-start;
    
            &:before {
                background-color: $bus-color;
            }
        }
    
        &-end {
            grid-area: station-end;
            
            &:before {
                background-color: $tram-color;
            }
        }
    }
</style>
