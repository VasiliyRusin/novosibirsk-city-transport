<template>
    <table v-if="vehicle" :key="vehicle.label" class="vehicle">
        <caption>{{ vehicleTypeLabel }} №{{ vehicle.label }}</caption>
        <colgroup>
            <col class="time">
            <col class="stations">
        </colgroup>
        <thead class="vehicle-head">
            <tr class="vehicle-head-row">
                <th>Время</th>
                <th>Остановка</th>
            </tr>
        </thead>
        <tbody v-if="vehicle.schedule" class="vehicle-body">
            <tr :key="index" v-for="(route, index) in vehicle.schedule" class="vehicle-body-row">
                <th>
                    {{ route.time }}
                </th>
                <th>
                    <div class="station-wrapper">
                        <div ref="station" class="station">
                            {{ route.label }}
                        </div>
                    </div>
                </th>
            </tr>
        </tbody>
    </table>
</template>

<script>
  import { getTextSize } from "@/utils";

  export default {
    name: "MapLayerVehiclePopup",
    props: {
      vehicle: {
        type: Object,
        default: () => {}
      }
    },
    
    computed: {
      vehicleTypeLabel () {
        return {
          bus: "Автобус",
          minibus: "Маршрутка",
          trolleybus: "Троллейбус",
          tram: "Трамвай"
        }[this.vehicle.type];
      }
    },
  
    watch: {
      vehicle: {
        deep: true,
        handler () {
          this.$nextTick(() => {
            const stations = this.$refs.station ?? [];
    
            for (const station of stations) {
              const textSize = getTextSize(station.innerText, station);
              const offset = Math.min(station.offsetWidth - textSize, 0);
  
              station.style.setProperty("--size", `${ offset }px`);
              station.style.setProperty("--time", `${ Math.abs(offset / 8) }s`);
            }
          });
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
    .vehicle {
        width: 300px;
        table-layout: fixed;
        border-collapse: collapse;
        
        caption {
            padding-top: math.div($ui-offset, 2);
        }
        
        col {
            &.time {
                width: 20%;
            }
            
            &.stations {
                width: 60%;
            }
        }
        
        th {
            text-align: center;
            white-space: nowrap;
            padding: 0 math.div($ui-offset, 2);
            
            &:last-child {
                text-align: left;
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
                
                .station {
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
