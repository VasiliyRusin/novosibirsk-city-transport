<template>
    <ul class="segments">
        <li :key="index"
            v-for="(segment, index) in segments"
            :class="{ active: segment.value === active }"
            class="segment">
            <slot name="segment" :segment="segment">
                <label class="label">
                    <template v-if="typeof segment.label === 'string'">
                        {{ segment.label }}
                    </template>
                    <template v-else-if="typeof segment.label === 'object'">
                        <VNode :node="segment.label"></VNode>
                    </template>
                    <input v-model="active" type="radio" name="segment" :value="segment.value" class="input">
                </label>
            </slot>
        </li>
    </ul>
</template>

<script>
  import { VNode } from "@vasiliyrusin/v-node";
  
  export default {
    name: "NSegment",
    components: { VNode },
    props: {
      value: {
        type: String,
        default: undefined
      },
      segments: {
        type: Array,
        required: true
      }
    },
  
    data () {
      const active = this.value || this.segments?.[0]?.value;
      
      return {
        active
      };
    },
    
    watch: {
      active (value) {
        this.$emit("input", value);
      }
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
    .segments {
        margin: 0;
        width: 100%;
        display: flex;
        box-sizing: border-box;
        padding: math.div($ui-offset, 3);
        background-color: rgba(237, 237, 237);
        border-radius: math.div($ui-offset, 2);
        
        .segment {
            flex-grow: 1;
            flex-basis: 0;
            flex-shrink: 1;
            list-style: none;
            align-self: stretch;
            
            .label {
                height: 100%;
                display: flex;
                cursor: pointer;
                text-align: center;
                align-items: center;
                justify-content: center;
                padding: math.div($ui-offset, 6);
                border-radius: math.div($ui-offset, 3);
                
                .input {
                    opacity: 0;
                    cursor: inherit;
                    position: fixed;
                }
            }
    
            &.active {
                .label {
                    background-color: white;
                }
            }
        }
    }
</style>
