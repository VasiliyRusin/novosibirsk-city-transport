<template>
    <div class="ui">
        <div class="zoom">
            <button class="material-icons-round button zoom-in"
                    :disabled="zoom >= maxZoom"
                    @click="zoom = Math.round(zoom + 1)">
                add
            </button>
            <button class="material-icons-round button zoom-out"
                    :disabled="zoom <= minZoom"
                    @click="zoom = Math.round(zoom - 1)">
                remove
            </button>
        </div>
    
        <button class="material-icons-round button jams" :class="{ active: jams }" @click="jams = !jams">
            traffic
        </button>
        
        <button v-if="currentPosition && !isCurrentPositionInCenter"
                class="material-icons-round button location"
                @click="center = currentPosition">
            my_location
        </button>
        
        <Menu></Menu>
    </div>
</template>

<script>
  import Menu from "@/components/Menu";
  import { mapGetters } from "vuex";
  import { mapFields } from "@vasiliyrusin/vue-mapfields";

  export default {
    name: "UILayer",
    components: { Menu },
    
    computed: {
      ...mapFields("mapControls", {
        fields: ["jams", "zoom", "center", "currentPosition"],
        base: "",
        action: "UPDATE_UI"
      }),
      
      ...mapGetters("mapControls", ["minZoom", "maxZoom"]),

      isCurrentPositionInCenter () {
        return JSON.stringify(this.center) === JSON.stringify(this.currentPosition);
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/scss/variables";
    
    .ui {
        width: 100%;
        height: 100%;
        position: fixed;
        pointer-events: none;
        
        & > * {
            pointer-events: auto;
        }
        
        .button {
            border: none;
            cursor: pointer;
            font-size: 160%;
            margin: $ui-offset;
            border-radius: 50%;
            box-shadow: $ui-shadow;
            width: $ui-button-size;
            height: $ui-button-size;
            background-color: white;
        }
        
        .zoom {
            top: 50%;
            right: 0;
            display: flex;
            gap: $ui-offset;
            position: absolute;
            pointer-events: none;
            flex-direction: column;
            transform: translateY(-50%);
            
            & > .button {
                pointer-events: auto;
                margin: 0 $ui-offset 0 0;
            }
        }
        
        .jams {
            top: 0;
            right: 0;
            position: absolute;
            
            &.active {
                color: white;
                background-color: blue;
            }
        }
        
        .location {
            right: 0;
            bottom: 0;
            position: absolute;
        }
    }
</style>
