<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "App",
    mounted () {
      this.UPDATE_VEHICLES_LOOP();
      this.UPDATE_FORECAST_LOOP();
    },
    
    methods: {
      ...mapActions("routes", ["UPDATE_VEHICLES_LOOP"]),
      ...mapActions("forecast", ["UPDATE_FORECAST_LOOP"])
    }
  };
</script>

<style lang="scss">
    body {
        margin: 0;
        overflow: hidden;
        
        font-family: "system-ui";
        
        * {
            box-sizing: border-box;
        }
    }
    
    #app {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }
</style>
