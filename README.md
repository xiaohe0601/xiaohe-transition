<div align="center">
  <h1>xiaohe-transition</h1>
  <span>🏀 一个简单易用的贝塞尔曲线过渡动画工具</span>
</div>

<br>

![GitHub stars](https://img.shields.io/github/stars/xiaohe0601/xiaohe-transition?logo=GitHub&style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/xiaohe0601/xiaohe-transition?logo=GitHub&style=flat-square)
![GitHub watchers](https://img.shields.io/github/watchers/xiaohe0601/xiaohe-transition?logo=GitHub&style=flat-square)
![GitHub release](https://img.shields.io/github/v/release/xiaohe0601/xiaohe-transition?logo=GitHub&style=flat-square)
![GitHub license](https://img.shields.io/github/license/xiaohe0601/xiaohe-transition?style=flat-square)

小何同学 / [github@xiaohe0601](https://github.com/xiaohe0601) / [gitee@xiaohe0601](https://gitee.com/xiaohe0601)

### 🎉 特性

- 🍜 支持非线性动画

- 🍟 支持中途打断动画

- 🧀 支持TypeScript

- 🍳 支持免费商用

- 🥗 更多特性等你发掘...

### 🚁 安装

#### yarn

``` bash
yarn add xiaohe-transition
```

#### npm

``` npm
npm install xiaohe-transition
```

### 🛹 使用

#### 简单使用

``` javascript
import XhTransition from "xiaohe-transition";

const transition = new XhTransition((value) => {
  console.log("当前值发生变化", value);
});

transition.start({
  start: 0,
  target: 1000
});
```

#### 进阶用法

``` javascript
import XhTransition, { XhTransitionPresetBezier } from "xiaohe-transition";

// 完整配置请参考下方 `类型定义` 中的说明
const transition = new XhTransition({
  // 持续时间
  duration: 10 * 1000,
  // 预设曲线
  preset: XhTransitionPresetBezier.easeOut,
  // 延迟开始时间
  delay: 500,
  // 帧率
  fps: 60,
  started() {
    console.log("动画开始~");
  },
  paused() {
    console.log("动画暂停~");
  },
  resumed() {
    console.log("动画继续~");
  },
  stopped() {
    console.log("动画停止~");
  }
}, (value) => {
  console.log("当前值发生变化", value);
});

// 启动动画
transition.start({
  start: 0,
  target: 1000
});

setTimeout(() => {
  // 3秒后暂停动画
  transition.pause();

  setTimeout(() => {
    // 再2秒后继续动画
    transition.resume();

    setTimeout(() => {
      // 再3秒后停止动画
      transition.stop();
    }, 3 * 1000);
  }, 2 * 1000);
}, 3 * 1000);
```

#### 应用场景

##### div内部滚动动画

> 为方便起见，本示例以 `Vue` 举例，但不局限于 `Vue` 使用

``` vue
<template>
  <div class="transition-demo">
    <div ref="scroller" class="transition-demo-scroller">
      <div v-for="(it) in 1000" :key="it" class="transition-demo__block">
        <span class="transition-demo__block__text">{{ it }}</span>
      </div>
    </div>

    <div class="transition-demo-footer">
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
  name: "TransitionDemo",
  mounted() {
    this.init();
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
    }
  }
};
</script>

<style lang="scss">
.transition-demo-scroller {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  overflow-y: auto;
}

.transition-demo-footer {
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
```

> 效果展示（GIF图片经过压缩抽帧处理，看似卡顿实际很流畅）

<img src="./xiaohe-transition-demo.gif" width="500" />

##### 其他

> 其他应用场景示例正在赶来的路上...

### 🕹️ 构造函数

``` typescript
constructor(callback: XhTransitionValueCallback);

constructor(options: IXhTransitionOptions, callback: XhTransitionValueCallback);
```

### 🎮 实例方法

#### 获取运行状态

``` typescript
status(): XhTransitionWorkStatus;
```

#### 启动动画

> 该方法可以接收一个配置项，除了上方介绍的 `start` 和 `target` 属性外，亦支持 `IXhTransitionOptions` 中的所有属性，将会采用 `Object.assign` 与原配置合并

``` typescript
start(options: IXhTransitionOptions): void;
```

#### 暂停动画

``` typescript
pause(): void;
```

#### 继续动画

``` typescript
resume(): void;
```

#### 停止动画

``` typescript
stop(): void;
```

### 🚀 类型定义

#### 配置项

``` typescript
interface IXhTransitionOptions {
  /**
   * 起始值
   */
  readonly start?: number;
  /**
   * 目标值
   */
  readonly target?: number;
  /**
   * 动画时长 (单位: ms)
   */
  readonly duration?: number; // 默认值: 300
  /**
   * 预设曲线
   */
  readonly preset?: XhTransitionPresetBezier; // 默认值: XhTransitionPresetBezier.linear
  /**
   * 自定义曲线 (优先级高于 preset)
   */
  readonly bezier?: XhTransitionBezier;
  /**
   * 延迟开始时间 (单位: ms)
   */
  readonly delay?: number; // 默认值: 0
  /**
   * 帧率 (即每秒回调多少次, 若为-1则使用requestAnimationFrame自动处理)
   */
  readonly fps?: number; // 默认值: -1 (当不支持requestAnimationFrame时为默认值为30)
  /**
   * 动画开始回调
   */
  readonly started?: XhTransitionCommonCallback;
  /**
   * 动画暂停回调
   */
  readonly paused?: XhTransitionCommonCallback;
  /**
   * 动画继续回调
   */
  readonly resumed?: XhTransitionCommonCallback;
  /**
   * 动画停止回调
   */
  readonly stopped?: XhTransitionCommonCallback;
}
```

#### 曲线配置

``` typescript
type XhTransitionBezier = [x1: number, y1: number, x2: number, y2: number];
```

#### 预设曲线

``` typescript
enum XhTransitionPresetBezier {
  /**
   * 以相同速度开始至结束
   */
  linear = "linear",
  /**
   * 慢速开始, 然后变快, 然后慢速结束
   */
  ease = "ease",
  /**
   * 慢速开始
   */
  easeIn = "ease-in",
  /**
   * 慢速结束
   */
  easeOut = "ease-out",
  /**
   * 慢速开始和结束
   */
  easeInOut = "ease-in-out"
}

type XhTransitionPresetBezierConfigType = { readonly [key in XhTransitionPresetBezier]: XhTransitionBezier };

const XhTransitionPresetBezierConfig: XhTransitionPresetBezierConfigType = {
  [XhTransitionPresetBezier.linear]: [0, 0, 1, 1],
  [XhTransitionPresetBezier.ease]: [0.25, 0.1, 0.25, 1],
  [XhTransitionPresetBezier.easeIn]: [0.42, 0, 1, 1],
  [XhTransitionPresetBezier.easeOut]: [0, 0, 0.58, 1],
  [XhTransitionPresetBezier.easeInOut]: [0.42, 0, 0.58, 1]
};
```

#### 回调函数

##### 通用回调函数

``` typescript
type XhTransitionCommonCallback = (instance: XhTransition) => void;
```

##### 值变化回调函数

``` typescript
type XhTransitionValueCallback = (value: number, instance: XhTransition) => void;
```

#### 运行状态

``` typescript
enum XhTransitionWorkStatus {
  /**
   * 空闲 (未开始或已停止)
   */
  free = "free",
  /**
   * 运行中
   */
  working = "working",
  /**
   * 已暂停
   */
  paused = "paused"
}
```

### 🛸 链接

- 本插件基于 [bezier-easing](https://github.com/gre/bezier-easing) 实现

### 🐶 讨论交流

- ❓：若有疑问或BUG反馈，可提交[issues](https://github.com/xiaohe0601/xiaohe-transition/issues)

- 📫：[HeDianGeng0601@outlook.com](mailto:HeDianGeng0601@outlook.com)

- 🐧：暂未开通

### 🏆 开源协议

- MIT [LICENSE](./LICENSE)