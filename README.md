<div align="center">
  <h1>xiaohe-transition</h1>
  <span>🏀 一个简单易用的贝塞尔曲线过渡动画工具</span>
</div>

<br>

[![github stars][github-stars-src]][github-stars-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

小何同学 / [github@xiaohe0601](https://github.com/xiaohe0601) / [gitee@xiaohe0601](https://gitee.com/xiaohe0601)

### 🎉 特性

- 🍜 支持非线性动画
- 🍟 支持中途打断动画
- 🌭 支持往复播放动画
- 🧀 支持TypeScript
- 🍳 支持免费商用
- 🥗 更多特性等你发掘...

### 🚁 安装

#### PNPM

``` shell
pnpm add xiaohe-transition
```

#### YARN

``` shell
yarn add xiaohe-transition
```

#### NPM

``` shell
npm install xiaohe-transition
```

### 🛹 使用

#### 简单使用

``` typescript
import { Transition } from "xiaohe-transition";

const transition = new Transition((value) => {
  console.log("当前值发生变化", value);
});

transition.start({
  start: 0,
  target: 1000
});

// 如果是单页应用，请在合适的时机（如：页面销毁生命周期等）销毁动画，以避免内存泄露
transition.destroy();
```

#### 重复播放

``` typescript
import { Transition, Repeater } from "xiaohe-transition";

const transition = new Transition({
  start: 0,
  target: 1000
}, (value) => {
  console.log("当前值发生变化", value);
});

// 调用start方法后，动画将会开始无限重复播放
const repeater = new Repeater(transition).start();

// 调用stop方法即可停止动画
repeater.stop();

// 如果是单页应用，请在合适的时机（如：页面销毁生命周期等）销毁动画，以避免内存泄露
repeater.destroy(); // repeater内部会自动调用 transition.destroy()，无需再手动调用
```

#### 进阶用法

``` typescript
import { Transition, BezierCurvePreset } from "xiaohe-transition";

// 完整配置请参考下方 `类型定义` 中的说明
const transition = new Transition({
  // 持续时间
  duration: 10 * 1000,
  // 预设曲线
  preset: BezierCurvePreset.EASE_OUT,
  // 延迟开始时间
  delay: 500,
  // 帧率
  fps: 60,
  started(instance) {
    console.log("动画开始~");
  },
  paused(instance) {
    console.log("动画暂停~");
  },
  resumed(instance) {
    console.log("动画继续~");
  },
  stopped(instance) {
    console.log("动画停止~");
  },
  completed(instance) {
    console.log("动画完成~");
  }
}, (value, instance) => {
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

``` typescript
import { Transition, Repeater, RepeatMode } from "xiaohe-transition";

const transition = new Transition({
  start: 0,
  target: 1000
}, (value) => {
  console.log("当前值发生变化", value);
});

// 完整配置请参考下方 `类型定义` 中的说明
const repeater = new Repeater(transition, {
  // 重复次数
  count: 10,
  // 重复模式
  mode: RepeatMode.ALTERNATE,
  started(instance, transition) {
    console.log("动画开始~");
  },
  paused(instance, transition) {
    console.log("动画暂停~");
  },
  resumed(instance, transition) {
    console.log("动画继续~");
  },
  stopped(instance, transition) {
    console.log("动画停止~");
  },
  // 注意！！！Transition的completed回调函数将会被Repeater占用，可使用repeated回调函数替代
  repeated(count, instance, transition) {
    console.log("动画重复~");
    console.log("已重复次数", count);
  },
  completed(instance, transition) {
    console.log("动画完成~");
  }
});

repeater.start();

// 现在应该使用Repeater中的相关方法来替代Transition控制动画
repeater.pause();
repeater.resume();
repeater.stop();
```

#### 事件

> 配置项中的 `回调函数` 均支持 `on`、`once` 事件监听，下面以 `started` 事件举例

``` typescript
// 监听started事件
transition.on("started", (instance) => {
  console.log("动画开始~");
});

// 单次监听started事件，started事件触发一次后将自动取消监听
transition.once("started", (instance) => {
  console.log("动画开始~");
});

// 手动取消监听started事件
const unbind = transition.on("started", (instance) => {
  console.log("动画开始~");
});
// 调用on、once返回的unbind方法即可取消监听
unbind();

// 取消监听所有事件
transition.clearEvents();
```

#### 类型定义

> 请查看 [jsdocs.io](https://www.jsdocs.io/package/xiaohe-transition)

### 🛸 链接

- [xiaohe-nano-emitter](https://github.com/xiaohe0601/xiaohe-nano-emitter) 🛴 一个轻量级的事件发射器
- [bezier-easing](https://github.com/gre/bezier-easing) cubic-bezier implementation for your JavaScript animation easings.

### 🐶 讨论交流

- ❓：若有疑问或BUG反馈，可提交[issues](https://github.com/xiaohe0601/xiaohe-transition/issues)
- 📫：[HeDianGeng0601@outlook.com](mailto:HeDianGeng0601@outlook.com)
- 🐧：暂未开通

### 🏆 开源协议

- MIT [LICENSE](./LICENSE)

<!-- Badges -->

[github-stars-src]: https://img.shields.io/github/stars/xiaohe0601/xiaohe-transition?style=flat&colorA=080f12&colorB=1fa669&logo=GitHub
[github-stars-href]: https://github.com/xiaohe0601/xiaohe-transition
[npm-version-src]: https://img.shields.io/npm/v/xiaohe-transition?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/xiaohe-transition
[npm-downloads-src]: https://img.shields.io/npm/dm/xiaohe-transition?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/xiaohe-transition
[bundle-src]: https://img.shields.io/bundlephobia/minzip/xiaohe-transition?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=xiaohe-transition
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/xiaohe-transition
[license-src]: https://img.shields.io/github/license/xiaohe0601/xiaohe-transition.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/xiaohe0601/xiaohe-transition/blob/main/LICENSE