<template>
    <div class="home">
        <MapLayer></MapLayer>
        <UILayer></UILayer>
    </div>
</template>

<script>
  // @ is an alias to /src
  import UILayer from "@/components/UILayer";
  import MapLayer from "@/components/MapLayer";

  export default {
    name: "Home",
    components: {
      UILayer,
      MapLayer
    }
  };
</script>
