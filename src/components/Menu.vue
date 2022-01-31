<template>
    <div class="menu">
        <nav class="nav">
            <button :key="type" v-for="type in types"
                    class="button"
                    :class="{ [type]: true, close: type === activeType }"
                    @click="setType(type)">
                {{ type.label }}
            </button>
        </nav>
        <Data></Data>
    </div>
</template>

<script>
  import Data from "@/components/Data";
  import { mapFields } from "@vasiliyrusin/vue-mapfields";
  import { mapGetters } from "vuex";
  
  export default {
    name: "Menu",
    components: { Data },
    
    computed: {
      ...mapFields("mapControls", {
        fields: ["activeType"],
        base: "",
        action: "UPDATE_UI"
      }),
      
      ...mapGetters("mapControls", ["types"])
    },
    
    methods: {
      setType (type) {
        this.activeType = this.activeType === type ? undefined : type;
      }
    }
  };
</script>

<style scoped lang="scss">
    $types: (
        "search": (
            "icon": "🔎",
            "color": lightgray
        ),
        "bus": (
            "icon": "🚌",
            "color": orange
        ),
        "trolleybus": (
            "icon": "🚎",
            "color": lightblue
        ),
        "tram": (
            "icon": "🚋",
            "color": lightgreen
        ),
        "taxiBus": (
            "icon": "🚐",
            "color": lightgoldenrodyellow
        )
    );
    
    .nav {
        display: flex;
        gap: $ui-offset;
        position: absolute;
        margin: $ui-offset;
        padding: $ui-offset;
        box-sizing: border-box;
        flex-direction: column;
        box-shadow: $ui-shadow;
        background-color: white;
        border-radius: $ui-offset;
        height: calc(100% - #{ $ui-offset } * 2);
    
        .button {
            border: none;
            cursor: pointer;
            font-size: 160%;
            transition: 300ms;
            position: relative;
            border-radius: 50%;
            width: $ui-button-size;
            height: $ui-button-size;
    
            &:after {
                content: "";
                transition: inherit;
            }
        }
        
        @each $type, $content in $types {
            .#{ $type } {
                background-color: map.get($content, "color");
        
                &:after {
                    content: map.get($content, "icon");
                }
            }
        }
        
        .close {
            background-color: lightpink;
            
            &:after {
                content: "❌";
            }
        }
    }
</style>
