<template>
  <div class="div-scroll-demo">
    <div ref="scroller" class="div-scroll-demo__scroller">
      <div v-for="(it) in 1000" :key="it" class="div-scroll-demo__block">
        <span class="div-scroll-demo__block__text">{{ it }}</span>
      </div>
    </div>

    <div class="div-scroll-demo__footer">
      <button @click="scroll2top">滚动至底部</button>
      <button @click="scroll2bottom">滚动至顶部</button>
      <button @click="pause">暂停</button>
      <button @click="resume">继续</button>
      <button @click="stop">停止</button>
    </div>
  </div>
</template>

<script>
import XhTransition, { XhTransitionPresetBezier } from "xiaohe-transition";

export default {
  name: "DivScrollDemo",
  created() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    init() {
      this.transition = new XhTransition({
        duration: 500,
        preset: XhTransitionPresetBezier.easeOut
      }, (value) => {
        this.$refs.scroller.scrollTop = value;
      });
    },
    scroll2top() {
      const { scrollTop, scrollHeight } = this.$refs.scroller;

      this.transition.start({
        start: scrollTop,
        target: scrollHeight
      });
    },
    scroll2bottom() {
      this.transition.start({
        start: this.$refs.scroller.scrollTop,
        target: 0
      });
    },
    pause() {
      this.transition.pause();
    },
    resume() {
      this.transition.resume();
    },
    stop() {
      this.transition.stop();
    },
    destroy() {
      this.transition.destroy();
      this.transition = null;
    }
  }
};
</script>

<style lang="scss">
.div-scroll-demo__scroller {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  overflow-y: auto;
}

.div-scroll-demo__footer {
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  button {
    & + button {
      margin-left: 20px;
    }
  }
}
</style>