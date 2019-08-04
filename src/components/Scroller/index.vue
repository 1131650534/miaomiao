<template>
  <div class="wrapper" ref="wrapper">
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  props: {
    handleToScroll: {
      type: Function,
      default: function() {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
    var scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      //  probeType: 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
      probeType: 1
    });
    this.scroll=scroll;
    scroll.on("scroll", pos => {
      this.handleToScroll(pos);
    });
    scroll.on("touchEnd", pos => {
      this.handleToTouchEnd(pos);
    });
  },
  methods:{
      toScrollTop(y){
        //   x=0
          this.scroll.scrollTo(0,y);
      }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100px;
}
</style>
