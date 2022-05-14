<template>
    <div>
        <LMap
            ref="map"
            class="map"
            v-bind="mapAttrs"
            :zoom.sync="zoom"
            :center.sync="center"
            @ready="mapReady">
            <LTileLayer :url="mapTileURL"></LTileLayer>
            <LControlZoom v-bind="mapZoomAttrs"></LControlZoom>
            <LControlAttribution :prefix="false"></LControlAttribution>
            <MapLayerRouteLines></MapLayerRouteLines>
        </LMap>
    </div>
</template>

<script>
  import MapLayerRouteLines from "@/components/MapLayerRouteLines";
  import { mapFields } from "@vasiliyrusin/vue-mapfields";
  import { mapGetters } from "vuex";
  
  import L from "leaflet";
  import { LMap, LTileLayer, LControlZoom, LControlAttribution } from "vue2-leaflet";

  import "leaflet/dist/leaflet.css";
  
  export default {
    name: "MapLayer",
    components: {
      MapLayerRouteLines,
      LMap,
      LTileLayer,
      LControlZoom,
      LControlAttribution
    },
  
    data () {
      return {
        map: undefined
      };
    },

    computed: {
      ...mapFields("mapControls", {
        fields: ["jams", "zoom", "rotation", "center", "currentPosition"],
        base: "",
        action: "UPDATE_UI"
      }),
  
      ...mapGetters("mapControls", ["minZoom", "maxZoom", "maxBounds"]),
      
      // Используем computed как локальную константу
      devicePixelRatioScale () {
        return window.devicePixelRatio;
      },
  
      mapAttrs () {
        const { minZoom, maxZoom, maxBounds } = this;
        
        return {
          minZoom,
          maxZoom,
          maxBounds,
          crs: L.CRS.EPSG3395,
          options: {
            zoomControl: false,
            attributionControl: false
          }
        };
      },
      
      mapZoomAttrs () {
        return {
          position: "topright",
          zoomInText: "<span aria-hidden=\"true\" class=\"material-icons-round zoom-in\">add</span>",
          zoomOutText: "<span aria-hidden=\"true\" class=\"material-icons-round zoom-in\">remove</span>"
        };
      },

      mapTileURL () {
        const scale = this.devicePixelRatioScale;
        // https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=1&lang=ru_RU
        return `https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=${ scale }&lang=ru_RU`;
      }
    },

    methods: {
      mapReady () {
        this.map = this.$refs.map.mapObject;
        
        // this.map.locate();
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
    .map {
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: transparent;
    }
    
    ::v-deep {
        .leaflet {
            &-pane {
                .icon {
                    &-item {
                        display: flex;
                        border-radius: 50%;
                        align-items: center;
                        justify-content: center;
                        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8)) saturate(1.5);
                        
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
                        
                        &.station {
                            filter: none;
                            border-radius: math.div($ui-offset, 3);
                        }
                    }
                }
            }
            
            &-container {
                font-family: inherit;
            }
            
            @each $position in ["top", "right", "bottom", "left"] {
                &-#{ $position } {
                    .leaflet-control {
                        margin-#{ $position }: 0;
                    }
                }
            }
            
            &-bar {
                border: none;
            }
            
            &-control {
                &-container {
                    z-index: 400;
                    
                    a[role="button"] {
                        border: none;
                        display: grid;
                        cursor: pointer;
                        font-size: 160%;
                        margin: $ui-offset;
                        border-radius: 50%;
                        place-content: center;
                        box-shadow: $ui-shadow;
                        width: $ui-button-size;
                        height: $ui-button-size;
                        background-color: white;
                        pointer-events: initial;
                    }
                }
                
                &-zoom {
                    top: 50%;
                    right: 0;
                    display: flex;
                    position: fixed;
                    pointer-events: none;
                    flex-direction: column;
                    transform: translateY(-50%);
                
                    & > .button {
                        pointer-events: auto;
                        margin: 0 $ui-offset 0 0;
                    }
                }
            }
            
            &-popup {
                &-content {
                    margin: 0;
                    opacity: 0.8;
                    min-width: 300px;
                    text-align: center;
                    
                    &-wrapper {
                        z-index: 1;
                        font-weight: 500;
                        font-size: 1.05em;
                        position: relative;
                        pointer-events: auto;
                        backdrop-filter: blur(10px);
                        border-radius:  math.div($ui-offset, 3);
                        background-color: rgba(255, 255, 255, 0.6);
                        box-shadow: 0 1px 3px 0 rgb(38 38 38 / 50%);
                    }
                }
                
                &-tip {
                    $size: 8px;
                    
                    width: $size;
                    height: $size;
                    margin: #{ math.div(-$size, 2) } auto 0;
                    
                    &-container {}
                }
                
                &-close-button {
                    $size: 18px;
                    
                    width: $size !important;
                    height: $size !important;
                }
            }
        }
    }
</style>
