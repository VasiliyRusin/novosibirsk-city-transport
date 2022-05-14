<template>
    <component :is="tag" aria-describedby="tooltip">
        <transition>
            <div v-show="active" ref="tooltip" class="tooltip-wrapper" role="tooltip">
                <div class="tooltip">
                    <slot name="tooltip"></slot>
                </div>
                <div ref="arrow" class="arrow"></div>
            </div>
        </transition>
        <slot></slot>
    </component>
</template>

<script>
  import {
    autoUpdate,
    computePosition,
    offset,
    shift,
    flip,
    arrow,
    hide
  } from "@floating-ui/dom";
  
  // TODO: Компонент нуждается в приличной доработке, что бы сделать его более гибким и настраиваемым.
  
  const closePopupEvents = ["mousedown", "touchstart"];
  
  export default {
    name: "NPopup",
    
    props: {
      tag: {
        type: String,
        default: "div"
      },
      
      active: {
        type: Boolean,
        default: true
      },
      
      appendToBody: {
        type: Boolean,
        default: false
      },
      
      appendToElement: {
        type: HTMLDivElement,
        default: undefined
      },
      
      options: {
        type: Object,
        default: () => {}
      }
    },
    
    mounted () {
      this.$nextTick(() => {
        const tooltip = this.$refs.tooltip;
        const element = this.$slots.default[0].elm;
        
        this.cleanup = autoUpdate(element, tooltip, this.update);
        this.tooltip = tooltip;
  
        if (this.appendToBody) {
          document.body.appendChild(this.tooltip);
        } else if (this.appendToElement) {
          this.appendToElement.appendChild(this.tooltip);
        }
  
        closePopupEvents.forEach(event => {
          document.addEventListener(event, this.click);
        });
      });
    },
    
    methods: {
      update () {
        const tooltip = this.$refs.tooltip;
        const arrowElement = this.$refs.arrow;
        const element = this.$slots.default[0].elm;
        
        const padding = 8;
        
        computePosition(element, tooltip, {
          placement: "bottom",
          middleware: [
            offset(0),
            shift({
              padding
            }),
            flip(),
            arrow({
              element: arrowElement,
              padding
            }),
            hide()
          ]
        }).then(({ x, y, placement, middlewareData }) => {
          const { referenceHidden } = middlewareData.hide;
  
          const reverseSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right"
          }[placement.split("-")[0]];
          
          Object.assign(tooltip.style, {
            top: "6px",
            left: "-1px",
            visibility: referenceHidden ? "hidden" : "visible",
            transform: `translate3d(${ Math.round(x) }px, ${ Math.round(y) }px, 0)`
          });
        
          const { x: arrowX, y: arrowY } = middlewareData.arrow;
        
          Object.assign(arrowElement.style, {
            transform: `translate3d(${ Math.round(arrowX) || 0 }px, ${ Math.round(arrowY) || 0 }px, 0) rotate(45deg)`,
            [reverseSide]: "-4px"
          });
        });
      },
      
      click (e) {
        const tooltip = this.$refs.tooltip;
        const element = this.$slots.default[0].elm;
        
        if (this.active && !(e.path.includes(tooltip) || e.path.includes(element))) {
          this.$emit("update:active", false);
        }
      }
    },
    
    beforeDestroy () {
      this.cleanup();
      
      if (this.appendToBody) {
        document.body.removeChild(this.tooltip);
      } else if (this.appendToElement) {
        this.appendToElement.removeChild(this.tooltip);
      }
  
      closePopupEvents.forEach(event => {
        document.removeEventListener(event, this.click);
      });
    }
  };
</script>

<style scoped lang="scss">
    @use "sass:math";
    @import "src/scss/variables";
    
    .tooltip {
        z-index: 1;
        font-size: 90%;
        font-weight: bold;
        position: relative;
        pointer-events: auto;
        backdrop-filter: blur(10px);
        padding: math.div($ui-offset, 2);
        border-radius:  math.div($ui-offset, 3);
        background-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 1px 3px 0 rgb(38 38 38 / 50%);
        
        &-wrapper {
            position: absolute;
        }
    }

    .arrow {
        $size: 8px;
        
        width: $size;
        height: $size;
        position: inherit;
        background: white;
    }
</style>
