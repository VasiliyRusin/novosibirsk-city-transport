<template>
    <section>
        <!--<h1>-->
        <!--    По номеру-->
        <!--</h1>-->
        <form class="search-form" @submit.prevent>
            <NInput v-model="number"
                    class="number"
                    type="number"
                    min="1"
                    max="9999"
                    placeholder="Номер маршрута">
            </NInput>
            <NSegment v-model="active" :segments="segments" class="type"></NSegment>
        </form>
        <SearchRoutes :routes="filteredRoutes"></SearchRoutes>
    </section>
</template>

<script>
  import NIcon from "@/components/ui/NIcon";
  import NInput from "@/components/ui/NInput";
  import NSegment from "@/components/ui/NSegment";
  
  import BusIcon from "@/components/icons/BusIcon";
  import TramIcon from "@/components/icons/TramIcon";
  import MinibusIcon from "@/components/icons/MinibusIcon";
  import TrolleybusIcon from "@/components/icons/TrolleybusIcon";
  import SearchRoutes from "@/components/SearchRoutes";
  
  import { mapState } from "vuex";
  
  export default {
    name: "MenuByNumberSection",
    components: { SearchRoutes, NSegment, NInput },
    
    data () {
      return {
        number: undefined,
        active: "all"
      };
    },
    
    computed: {
      ...mapState("routes", ["routes"]),
  
      segments () {
        return [
          {
            label: "Все",
            value: "all"
          },
          {
            label: (
              <NIcon icon-name="bus" width="24" height="24">
                <BusIcon></BusIcon>
              </NIcon>
            ),
            value: "bus"
          },
          {
            label: (
              <NIcon icon-name="minibus" width="24" height="24">
                <MinibusIcon></MinibusIcon>
              </NIcon>
            ),
            value: "minibus"
          },
          {
            label: (
              <NIcon icon-name="trolleybus" width="24" height="24">
                <TrolleybusIcon></TrolleybusIcon>
              </NIcon>
            ),
            value: "trolleybus"
          },
          {
            label: (
              <NIcon icon-name="tram" width="24" height="24">
                <TramIcon></TramIcon>
              </NIcon>
            ),
            value: "tram"
          }
        ];
      },
      
      filteredRoutes () {
        return this.routes?.filter(el => {
          return (!this.number || el.label.includes(this.number)) && (this.active === el.type || this.active === "all");
        });
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
    .search-form {
        padding: 0 $ui-offset;
        
        .number {
            margin-bottom: math.div($ui-offset, 1.5);
        }
        
        .type {}
    }
</style>
