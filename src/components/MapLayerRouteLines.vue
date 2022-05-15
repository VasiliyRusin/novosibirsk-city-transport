<template>
    <div>
        <template v-for="({ path, route, color }, index) in paths">
            <LPolyline
                :key="`route-${ route.id }-${ index }`"
                :lat-lngs="path"
                :color="color">
            </LPolyline>
        </template>
        <template v-for="({ route, stations }) in paths">
            <template v-for="(station, _index) in stations">
                <LMarker
                    :key="`station-${ route.id }-${ _index }`"
                    :lat-lng="station.coords"
                    :icon="icon({ route, item: station })"
                    @click="showStationPopup(station)">
                </LMarker>
            </template>
        </template>
        <template v-for="({ route, stations, vehicles }) in paths">
            <template v-for="(vehicle, _index) in vehicles">
                <LMarker
                    :key="`vehicle-${ route.id }-${ _index }`"
                    :lat-lng="vehicle.coords"
                    :icon="icon({ route, item: vehicle })"
                    :zIndexOffset="stations.length"
                    @click="showVehiclePopup(vehicle)">
                </LMarker>
            </template>
        </template>
        <LFeatureGroup ref="stationPopup">
            <LPopup>
                <MapLayerStationPopup :station="station"></MapLayerStationPopup>
            </LPopup>
        </LFeatureGroup>
        <LFeatureGroup ref="vehiclePopup">
            <LPopup>
                <MapLayerVehiclePopup :vehicle="vehicle"></MapLayerVehiclePopup>
            </LPopup>
        </LFeatureGroup>
    </div>
</template>

<script>
  import BusIcon from "@/components/icons/BusIcon";
  import MinibusIcon from "@/components/icons/MinibusIcon";
  import TramIcon from "@/components/icons/TramIcon";
  import TrolleybusIcon from "@/components/icons/TrolleybusIcon";
  import MapLayerVehiclePopup from "@/components/MapLayerVehiclePopup";
  import NIcon from "@/components/ui/NIcon";
  import StationIcon from "@/components/icons/StationIcon";
  import MapLayerStationPopup from "@/components/MapLayerStationPopup";
  import { VNodeReactive } from "@vasiliyrusin/v-node";
  import colors from "@/scss/_colors.scss";
  
  import Vue from "vue";
  import L from "leaflet";
  import {
    LPopup,
    LMarker,
    LPolyline,
    LFeatureGroup
  } from "vue2-leaflet";
  import { mapActions, mapGetters, mapState } from "vuex";
  
  export default {
    name: "MapLayerRouteLines",
    components: {
      MapLayerVehiclePopup,
      LPopup,
      LMarker,
      LPolyline,
      LFeatureGroup,
      MapLayerStationPopup
    },
    
    mounted () {
      this.stationPopup = this.$refs.stationPopup.mapObject;
      this.vehiclePopup = this.$refs.vehiclePopup.mapObject;
      
      this.stationPopup.addEventListener("popupclose", _ => {
        this.SET_ACTIVE_STATION_ID(undefined);
      });
    },
    
    data () {
      return {
        station: undefined,
        vehicle: undefined,
        stationPopup: undefined,
        vehiclePopup: undefined
      };
    },
    
    computed: {
      ...mapState("routes", ["selectedRoutes", "selectedRoutesData"]),
      ...mapGetters("routes", ["getRouteById"]),
      
      paths () {
        // TODO: возможно нужно сделать дополнительную оптимизацию
        // Убрав все повторяющиеся точки, использовать наложение от
        // последнего к первому и добавлять только уникальные точки в
        // каждый следующий слой. Над алгоритмом нужно подумать.
        const paths = [];
        
        for (const selectedRoute of this.selectedRoutes) {
          const route = this.getRouteById(selectedRoute.routeId);
          const { points = [], vehicles = [] } = this.selectedRoutesData[selectedRoute.routeId] ?? {};
          
          const path = [];
          const stations = [];
          
          for (const { id, label, lat, lng } of points) {
            if (id) {
              stations.push({
                id,
                label,
                type: "station",
                coords: [lat, lng]
              });
            }
            
            path.push([lat, lng]);
          }
          
          paths.push(
            {
              path,
              route,
              stations,
              color: colors[`${ route.type }Color`],
              vehicles: vehicles
                .filter(({ schedule }) => schedule.length)
                .map(({ lat, lng, ...vehicle }) => ({
                  ...vehicle,
                  type: route.type,
                  label: route.label,
                  coords: [lat, lng]
                }))
            }
          );
        }
        
        return paths;
      }
    },
    
    methods: {
      ...mapActions("forecast", ["SET_ACTIVE_STATION_ID"]),
      
      showStationPopup (station) {
        this.station = station;
        this.stationPopup.openPopup(station.coords);
      },
      
      showVehiclePopup (vehicle) {
        this.vehicle = vehicle;
        this.vehiclePopup.openPopup(vehicle.coords);
      },
      
      typeLabel (type) {
        return {
          bus: "Автобус",
          minibus: "Маршрутка",
          trolleybus: "Троллейбус",
          tram: "Трамвай",
          station: "Остановка"
        }[type];
      },
      
      icon ({ route, item }) {
        const VNodeReactiveCtor = Vue.extend(VNodeReactive);
        const Icon = {
          station: StationIcon,
          bus: BusIcon,
          minibus: MinibusIcon,
          trolleybus: TrolleybusIcon,
          tram: TramIcon
        }[item.type];
        const size = item.type === "station" ? 14 : 22;
        const label = `${ this.typeLabel(item.type) } ${ item.type === "station" ? "" : " №" }${ item.label }`;
        
        const vm = new VNodeReactiveCtor({
          propsData: {
            node: (
              <NIcon
                icon-name={ label }
                width={ size }
                height={ size }
                icon-color="#ffffff">
                <Icon></Icon>
              </NIcon>
            )
          }
        });
        
        return L.divIcon({
          html: vm.$mount().$el.outerHTML,
          className: `icon-item ${ [route.type] } ${ [item.type] }`,
          iconSize: size + 4,
          iconAnchor: [size / 2, size / 2]
        });
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
