<template>
    <div v-if="getActiveType" class="data">
        <div v-if="getActiveType === 'search'">
            <div>
                <label>
                    <select>
                        <option>
                            Номер
                        </option>
                        <option>
                            Маршрут
                        </option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    <input type="text">
                </label>
            </div>
            <div>
                <label>
                    <input type="text">
                </label>
            </div>
        </div>
        <div v-else>
            <input type="search">
        </div>
    </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "Data",
    
    computed: {
      ...mapGetters("mapControls", ["getActiveType"])
    }
  };
</script>

<style lang="scss" scoped>
    .data {
        max-width: 256px;
        min-height: 80px;
        margin: $ui-offset;
        position: absolute;
        padding: $ui-offset;
        box-sizing: border-box;
        box-shadow: $ui-shadow;
        background-color: white;
        border-radius: $ui-offset;
        left: $ui-offset * 3 + $ui-button-size;
        max-height: calc(100% - #{ $ui-offset } * 2);
        width: calc(100vw - #{ $ui-offset } * 5 - #{ $ui-button-size });
    }
</style>
