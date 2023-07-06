import XhTransition from "./transition";

export type NullableBoolean = boolean | null;
export type NullableNumber = number | null;
export type NullableString = string | null;

/**
 * 过渡动画曲线配置
 */
export type XhTransitionBezier = [x1: number, y1: number, x2: number, y2: number];

/**
 * 过渡动画预设曲线
 */
export enum XhTransitionPresetBezier {
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

/**
 * 过渡动画预设曲线配置
 */
export type XhTransitionPresetBezierConfigType = { readonly [key in XhTransitionPresetBezier]: XhTransitionBezier };

/**
 * 过渡动画配置项
 */
export interface IXhTransitionOptions {
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
  readonly duration?: number;
  /**
   * 预设曲线
   */
  readonly preset?: XhTransitionPresetBezier;
  /**
   * 自定义曲线 (优先级高于 preset)
   */
  readonly bezier?: XhTransitionBezier;
  /**
   * 延迟开始时间 (单位: ms)
   */
  readonly delay?: number;
  /**
   * 帧率 (即每秒回调多少次, 若为-1则使用requestAnimationFrame自动处理)
   */
  readonly fps?: number;
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

/**
 * 过渡动画通用回调函数
 */
export type XhTransitionCommonCallback = (instance: XhTransition) => void;

/**
 * 过渡动画值变化回调函数
 */
export type XhTransitionValueCallback = (value: number, instance: XhTransition) => void;

/**
 * 过渡动画运行状态
 */
export enum XhTransitionWorkStatus {
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

/**
 * 过渡动画定时器回调函数
 */
export type XhTransitionTimerCallback = () => void;