<template>
  <div class="count-to-demo">
    <div class="count-to-demo__body">
      <span class="count-to-demo__number">{{ tweened }}</span>
    </div>

    <div class="div-scroll-demo__footer">
      <button @click="plus100">加100</button>
      <button @click="minus100">减100</button>
      <button @click="pause">暂停</button>
      <button @click="resume">继续</button>
      <button @click="stop">停止</button>
    </div>
  </div>
</template>

<script>
import XhTransition, { XhTransitionPresetBezier } from "xiaohe-transition";

export default {
  name: "CountToDemo",
  data() {
    return {
      value: 666,
      tweened: 666
    };
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        this.transition.start({
          start: oldValue,
          target: newValue
        });
      }
    }
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    init() {
      this.transition = new XhTransition({
        duration: 1000,
        preset: XhTransitionPresetBezier.easeOut
      }, (value) => {
        this.tweened = value.toFixed(0);
      });
    },
    plus100() {
      this.value += 100;
    },
    minus100() {
      this.value -= 100;
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
.count-to-demo__body {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 100px;
}

.count-to-demo__number {
  font-size: 36px;
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