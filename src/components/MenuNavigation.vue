<template>
    <div class="nav-wrapper">
        <SelectedRoutes></SelectedRoutes>
        
        <nav class="nav">
            <span class="logo">
                <NCTLogo></NCTLogo>
            </span>
            <MenuByNumberSection v-if="active === 'byNumber'" class="section"></MenuByNumberSection>
            <MenuByRouteSection v-else-if="active === 'byRoute'" class="section"></MenuByRouteSection>
        </nav>
    </div>
</template>

<script>
  import NCTLogo from "@/components/NCTLogo";
  import MenuByNumberSection from "@/components/MenuByNumberSection";
  import MenuByRouteSection from "@/components/MenuByRouteSection";
  import SelectedRoutes from "@/components/SelectedRoutes";
  import { mapActions } from "vuex";
  
  export default {
    name: "MenuNavigation",
    components: { SelectedRoutes, NCTLogo, MenuByNumberSection, MenuByRouteSection },
    
    created () {
      this.GET_ROUTES();
    },
  
    data () {
      return {
        active: "byNumber",
        segments: [
          {
            label: "По номеру",
            value: "byNumber"
          },
          {
            label: "По маршруту",
            value: "byRoute"
          }
        ]
      };
    },
    
    methods: {
      ...mapActions("routes", [
        "GET_ROUTES"
      ])
    }
  };
</script>

<style scoped lang="scss">
    @import "src/scss/variables";
    
    .nav {
        z-index: -1;
        display: flex;
        flex-shrink: 0;
        min-height: 180px;
        position: relative;
        pointer-events: auto;
        flex-direction: column;
        box-shadow: $ui-shadow;
        padding: $ui-offset 0 0;
        border-radius: $ui-offset;
        backdrop-filter: blur(10px);
        width: calc(100vw - #{ $ui-offset * 2 });
        height: calc(100vh - #{ $ui-offset * 6 });
        background-color: rgba(255, 255, 255, 0.8 );
    
        @media screen and (min-width: 768px) {
            order: 0;
            padding: 0;
            z-index: initial;
            max-width: 296px;
            position: initial;
            height: calc(100vh - #{ $ui-offset * 2 });
        }
        
        &-wrapper {
            pointer-events: none;
            margin: calc(100vh - 200px) $ui-offset $ui-offset $ui-offset;
    
            @media screen and (min-width: 768px) {
                display: flex;
                gap: $ui-offset;
                margin-top: $ui-offset;
                flex-direction: row;
            }
        }
        
        .logo {
            display: none;
            text-align: center;
            
            ::v-deep {
                svg {
                    height: 80px;
                }
            }
    
            @media screen and (min-width: 768px) {
                display: initial;
            }
        }
        
        .section {
            width: 100%;
            height: 100%;
            display: flex;
            overflow: hidden;
            flex-direction: column;
        }
    }
</style>
