export type NullableBoolean = boolean | null;
export type NullableNumber = number | null;
export type NullableString = string | null;

/**
 * 过渡动画曲线配置
 *
 * @since 0.0.1
 */
export type XhTransitionBezier = [x1: number, y1: number, x2: number, y2: number];

/**
 * 过渡动画预设曲线
 *
 * @since 0.0.1
 */
export type XhTransitionPresetBezier = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";

/**
 * 过渡动画回调函数
 *
 * @since 0.0.1
 */
export type XhTransitionCallback = (value: number) => void;

/**
 * 过渡动画配置项
 *
 * @since 0.0.1
 */
export interface IXhTransitionOptions {
  /**
   * 开始值
   */
  readonly start: number;
  /**
   * 目标值
   */
  readonly target: number;
  /**
   * 动画时长
   */
  readonly duration: number;
  /**
   * 预设曲线
   */
  readonly preset?: XhTransitionPresetBezier;
  /**
   * 自定义曲线 (优先级高于 preset)
   */
  readonly bezier?: XhTransitionBezier;
  /**
   * 延迟开始时间
   */
  readonly delay?: number;
}

/**
 * 过渡动画状态
 *
 * @since 0.0.1
 */
export enum XhTransitionStatus {
  /**
   * 未开始或已结束
   */
  none,
  /**
   * 动画进行中
   */
  playing,
  /**
   * 已暂停
   */
  paused
}