<template>
    <table v-if="station" :key="station.label" class="station">
        <caption>{{ station.label }}</caption>
        <colgroup>
            <col class="route">
            <col class="time">
            <col class="direction">
        </colgroup>
        <thead class="station-head">
            <tr class="station-head-row">
                <th></th>
                <th>Время</th>
                <th>Направление</th>
            </tr>
        </thead>
        <tbody v-if="sortedForecast" class="station-body">
            <tr :key="index" v-for="(route, index) in sortedForecast" class="station-body-row">
                <th>
                    <div class="route" :class="routeClass(route)">
                        <div class="icon icon-left" :class="{ [route.type]: true }">
                            <NIcon
                                :icon-name="`${ routeTypeLabel(route.type) } №${ route.label }`"
                                width="16"
                                height="16"
                                icon-color="#ffffff">
                                <component :is="routeIcon(route.type)"></component>
                            </NIcon>
                        </div>
                        {{ route.label }}
                    </div>
                </th>
                <th>
                    {{ route.forecastTime }} мин
                </th>
                <th>
                    <div class="direction-wrapper">
                        <div ref="direction" class="direction">
                            {{ route.stationEnd }}
                        </div>
                    </div>
                </th>
            </tr>
        </tbody>
        <!--                    <tfoot>-->
        <!--                        <tr>-->
        <!--                            <th></th>-->
        <!--                            <th></th>-->
        <!--                            <th></th>-->
        <!--                        </tr>-->
        <!--                    </tfoot>-->
    </table>
</template>

<script>
  import BusIcon from "@/components/icons/BusIcon";
  import MinibusIcon from "@/components/icons/MinibusIcon";
  import TramIcon from "@/components/icons/TramIcon";
  import TrolleybusIcon from "@/components/icons/TrolleybusIcon";
  import NIcon from "@/components/ui/NIcon";
  
  import { getTextSize } from "@/utils";

  import { mapState, mapActions, mapGetters } from "vuex";

  export default {
    name: "MapLayerStationPopup",
    components: { NIcon },
    props: {
      station: {
        type: Object,
        default: () => {}
      }
    },
    
    computed: {
      ...mapState("forecast", ["forecast"]),
      ...mapGetters("routes", ["isRouteSelected"]),
  
      sortedForecast () {
        return this.forecast
          ?.filter(({ id, forecastTime }) => forecastTime > 0 && (forecastTime < 30 || this.isRouteSelected(id)))
          ?.sort((a, b) => a.forecastTime - b.forecastTime);
      }
    },
    
    methods: {
      ...mapActions("forecast", ["SET_ACTIVE_STATION_ID"]),
      
      routeClass (route) {
        return {
          [route.type]: true,
          active: this.isRouteSelected(route.id)
        };
      },
      
      routeIcon (type) {
        return {
          bus: BusIcon,
          minibus: MinibusIcon,
          trolleybus: TrolleybusIcon,
          tram: TramIcon
        }[type];
      },
  
      routeTypeLabel (type) {
        return {
          bus: "Автобус",
          minibus: "Маршрутка",
          trolleybus: "Троллейбус",
          tram: "Трамвай"
        }[type];
      }
    },
    
    watch: {
      station: {
        deep: true,
        handler (station) {
          this.SET_ACTIVE_STATION_ID(station.id);
        }
      },
      
      sortedForecast () {
        this.$nextTick(() => {
          const directions = this.$refs.direction ?? [];
  
          for (const direction of directions) {
            const textSize = getTextSize(direction.innerText, direction);
            const offset = Math.min(direction.offsetWidth - textSize, 0);
    
            direction.style.setProperty("--size", `${ offset }px`);
            direction.style.setProperty("--time", `${ Math.abs(offset / 8) }s`);
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
    .station {
        width: 300px;
        table-layout: fixed;
        border-collapse: collapse;
        
        caption {
            padding-top: math.div($ui-offset, 2);
        }
        
        col {
            &.route {
                width: 20%;
            }
            
            &.time {
                width: 20%;
            }
            
            &.direction {
                width: 60%;
            }
        }
    
        th {
            text-align: left;
            white-space: nowrap;
            padding: 0 math.div($ui-offset, 2);
    
            &:not(:first-child):not(:last-child) {
                text-align: right;
            }
        }
    
        tr {
            &:not(:last-child) {
                th {
                    border-bottom: 1px solid rgb(237, 237, 237);
                }
            }
        }
    
        .icon {
            display: flex;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
        
            &-left {
                $size: 20px;
            
                width: $size;
                height: $size;
                display: flex;
            }
        
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
        
        &-head {
            &-row {}
        }
        
        &-body {
            &-row {
                .route {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: math.div($ui-offset, 2);
                    margin: math.div($ui-offset, 3) 0;
                    
                    &.active {
                        color: white;
                        text-align: center;
                        border-radius: 9999rem;
                        
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
                }
    
                .direction {
                    width: 100%;
                    overflow: visible;
                    //margin: 0 0 -15px 0;
                    box-sizing: content-box;
                    animation: show-name ease-in-out var(--time) infinite;
        
                    @keyframes show-name {
                        5% {
                            transform: translateY(0);
                        }
            
                        45% {
                            //noinspection CssInvalidFunction
                            transform: translateX(var(--size));
                        }
            
                        55% {
                            //noinspection CssInvalidFunction
                            transform: translateX(var(--size));
                        }
            
                        95% {
                            transform: translateY(0);
                        }
                    }
        
                    &-wrapper {
                        width: 100%;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>
