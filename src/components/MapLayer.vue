<template>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
        
        <vl-geoloc @update:position="centerMapToUserPosition">
            <template slot-scope="geoloc">
                <vl-feature v-if="geoloc.position" id="position-feature">
                    <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
                </vl-feature>
            </template>
        </vl-geoloc>
        
        <vl-layer-tile>
            <vl-source-xyz :url="mapTileUrl" projection="EPSG:3395"></vl-source-xyz>
        </vl-layer-tile>
        
        <vl-layer-tile v-if="jams">
            <vl-source-xyz :url="jamsTileUrl" projection="EPSG:3395"></vl-source-xyz>
        </vl-layer-tile>
        
        <!--        <vl-layer-tile>-->
        <!--            <vl-source-xyz url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"></vl-source-xyz>-->
        <!--        </vl-layer-tile>-->
    </vl-map>
</template>

<script>
  import { mapFields } from "@vasiliyrusin/vue-mapfields";
  
  export default {
    name: "MapLayer",
    
    created () {
      this.timestamp = Math.trunc(new Date() / 1000);
      
      this.intervalId = setInterval(() => {
        this.timestamp = Math.trunc(new Date() / 1000);
      }, 10000);
    },
  
    data () {
      return {
        timestamp: undefined
      };
    },

    computed: {
      ...mapFields("mapControls", {
        fields: ["jams", "zoom", "rotation", "center", "currentPosition"],
        base: "",
        action: "UPDATE_UI"
      }),
      
      devicePixelRatioScale () {
        return 1;
      },

      mapTileUrl () {
        const scale = this.devicePixelRatioScale;
        // https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=1&lang=ru_RU
        return `https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=${ scale }&lang=ru_RU`;
      },

      jamsTileUrl () {
        const scale = this.devicePixelRatioScale;
        // https://core-jams-rdr-cache.maps.yandex.net/1.1/tiles?l=trf&x={x}&y={y}&z={z}&scale=1&lang=ru_RU&tm=1643026740
        return `https://core-jams-rdr-cache.maps.yandex.net/1.1/tiles?l=trf&x={x}&y={y}&z={z}&scale=${ scale }&lang=ru_RU&tm=${ this.timestamp }`;
      }
    },

    methods: {
      centerMapToUserPosition (event) {
        this.center = this.currentPosition = event;
      }
    },
    
    beforeDestroy () {
      clearInterval(this.intervalId);
    }
  };
</script>

<style scoped lang="scss">
    .vl-map {
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        position: fixed;
    }
</style>
