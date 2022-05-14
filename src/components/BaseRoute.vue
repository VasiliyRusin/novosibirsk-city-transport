<script>
  import NIcon from "@/components/ui/NIcon";
  
  import BusIcon from "@/components/icons/BusIcon";
  import MinibusIcon from "@/components/icons/MinibusIcon";
  import TramIcon from "@/components/icons/TramIcon";
  import TrolleybusIcon from "@/components/icons/TrolleybusIcon";
  
  export default {
    name: "BaseRoute",
    components: { NIcon, BusIcon, MinibusIcon, TrolleybusIcon, TramIcon },
  
    props: {
      route: {
        type: Object,
        required: true
      }
    },
    
    computed: {
      routeIcon () {
        return {
          bus: BusIcon,
          minibus: MinibusIcon,
          trolleybus: TrolleybusIcon,
          tram: TramIcon
        }[this.route.type];
      },
  
      routeTypeLabel () {
        return {
          bus: "Автобус",
          minibus: "Маршрутка",
          trolleybus: "Троллейбус",
          tram: "Трамвай"
        }[this.route.type];
      }
    }
  };
</script>
