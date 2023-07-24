<template>
  <div class="marquee-demo">
    <div ref="container" class="marquee-demo__container">
      <span ref="marquee" class="marquee-demo__text" :style="marqueeStyle">我是跑马灯~</span>
    </div>

    <div class="marquee-demo__footer">
      <button @click="start">开始</button>
      <button @click="pause">暂停</button>
      <button @click="resume">继续</button>
      <button @click="stop">停止</button>
    </div>
  </div>
</template>

<script>
import XhTransition, { XhTransitionPresetBezier, XhTransitionRepeater } from "xiaohe-transition";

export default {
  name: "MarqueeDemo",
  data() {
    return {
      top: 0,
      left: 0
    };
  },
  computed: {
    marqueeStyle() {
      const { top, left } = this;

      return {
        top: `${top}px`,
        left: `${left}px`
      };
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    init() {
      const { offsetWidth: containerWidth } = this.$refs.container;
      const { offsetWidth: marqueeWidth } = this.$refs.marquee;

      this.transition = new XhTransition({
        start: containerWidth,
        target: 0 - marqueeWidth,
        duration: 5 * 1000,
        preset: XhTransitionPresetBezier.linear
      }, (value) => {
        this.left = value;
      });

      this.repeater = new XhTransitionRepeater(this.transition, {
        repeated: () => {
          this.random();
        }
      });

      this.left = containerWidth;
      this.random();
    },
    random() {
      const { offsetHeight: containerHeight } = this.$refs.container;
      const { offsetHeight: marqueeHeight } = this.$refs.marquee;

      this.top = Math.random() * (containerHeight - marqueeHeight);
    },
    start() {
      this.repeater.start();
    },
    pause() {
      this.repeater.pause();
    },
    resume() {
      this.repeater.resume();
    },
    stop() {
      this.repeater.stop();
    },
    destroy() {
      this.repeater.stop();
      this.transition = null;
      this.repeater = null;
    }
  }
};
</script>

<style lang="scss">
.marquee-demo__container {
  position: relative;
  width: 500px;
  height: 300px;
  background-color: #000000;
  overflow: hidden;
}

.marquee-demo__text {
  position: absolute;
  color: #ffffff;
  font-size: 14px;
  white-space: nowrap;
}

.marquee-demo__footer {
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