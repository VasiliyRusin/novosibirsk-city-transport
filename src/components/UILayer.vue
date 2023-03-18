<template>
    <div
        class="ui"
        :class="{ 'user-scroll-ui': isUserScrollUI }"
        @touchstart="touchstart"
        @touchend="touchend">
        <MenuNavigation ref="nav"></MenuNavigation>
    </div>
</template>

<script>
  import MenuNavigation from "@/components/MenuNavigation";

  export default {
    name: "UILayer",
    components: {
      MenuNavigation
    },

    data () {
      return {
        isUserScrollUI: false
      };
    },

    methods: {
      touchstart (event) {
        this.isUserScrollUI = event
          .composedPath()
          .includes(this.$refs.nav.$el);
      },

      touchend () {
        this.isUserScrollUI = false;
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/scss/variables";

    .ui {
        width: 100%;
        height: 100%;
        overflow: auto;
        position: fixed;
        pointer-events: none;

        @media screen and (min-width: 768px) {
            overflow: hidden;
        }

        &.user-scroll-ui {
            pointer-events: auto;
        }
    }
</style>
