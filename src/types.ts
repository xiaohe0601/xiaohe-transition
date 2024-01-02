import type Transition from "./transition";
import type Repeater from "./repeater";

export type OptionalObject<T> = T | undefined;
export type OptionalNumber = OptionalObject<number>;
export type OptionalString = OptionalObject<string>;
export type OptionalBoolean = OptionalObject<boolean>;

export type NullableObject<T> = T | null;
export type NullableNumber = NullableObject<number>;
export type NullableString = NullableObject<string>;
export type NullableBoolean = NullableObject<boolean>;

export type Arrayable<T> = T | T[];

/**
 * 贝塞尔曲线配置
 */
export type BezierCurve = [x1: number, y1: number, x2: number, y2: number];

/**
 * 贝塞尔曲线预设
 */
export enum BezierCurvePreset {
  /**
   * 以相同速度开始至结束
   */
  LINEAR = "linear",
  /**
   * 慢速开始，然后变快，然后慢速结束
   */
  EASE = "ease",
  /**
   * 慢速开始
   */
  EASE_IN = "ease-in",
  /**
   * 慢速结束
   */
  EASE_OUT = "ease-out",
  /**
   * 慢速开始和结束
   */
  EASE_IN_OUT = "ease-in-out"
}

/**
 * 贝塞尔曲线预设配置
 */
export type BezierCurvePresetConfig = { readonly [key in BezierCurvePreset]: BezierCurve };

/**
 * 过渡动画回调函数（仅实例）
 */
export interface TransitionNakedCallback {
  (instance: Transition): void;
}

/**
 * 过渡动画回调函数（值+实例）
 */
export interface TransitionValueCallback {
  (value: number, instance: Transition): void;
}

/**
 * 过渡动画事件
 */
export interface TransitionEvents {
  /**
   * 动画开始
   */
  readonly started: TransitionNakedCallback;
  /**
   * 动画暂停
   */
  readonly paused: TransitionNakedCallback;
  /**
   * 动画继续
   */
  readonly resumed: TransitionNakedCallback;
  /**
   * 动画停止
   */
  readonly stopped: TransitionNakedCallback;
  /**
   * 动画完成
   */
  readonly completed: TransitionNakedCallback;
}

/**
 * 过渡动画配置项
 */
export interface TransitionOptions extends Partial<TransitionEvents> {
  /**
   * 起始值
   */
  readonly start?: number;
  /**
   * 目标值
   */
  readonly target?: number;
  /**
   * 动画时长（单位: ms）
   */
  readonly duration?: number;
  /**
   * 预设曲线
   */
  readonly preset?: BezierCurvePreset;
  /**
   * 自定义曲线（优先级高于preset）
   */
  readonly bezier?: BezierCurve;
  /**
   * 延迟开始时间（单位: ms）
   */
  readonly delay?: number;
  /**
   * 帧率（即每秒回调多少次，若小于或等于0则使用requestAnimationFrame自动处理）
   */
  readonly fps?: number;
}

/**
 * 过渡动画运行状态
 */
export enum TransitionWorkStatus {
  /**
   * 空闲（未开始或已停止）
   */
  FREE = "free",
  /**
   * 运行中
   */
  WORKING = "working",
  /**
   * 已暂停
   */
  PAUSED = "paused"
}

/**
 * 定时器回调函数
 */
export interface TimerCallback {
  (): void;
}

/**
 * 重复器回调函数（仅实例）
 */
export interface RepeaterNakedCallback {
  (instance: Repeater, transition: Transition): void;
}

/**
 * 重复器回调函数（次数+实例）
 */
export interface RepeaterCountCallback {
  (count: number, instance: Repeater, transition: Transition): void;
}

/**
 * 重复器事件
 */
export interface RepeaterEvents {
  /**
   * 动画开始
   */
  readonly started: RepeaterNakedCallback;
  /**
   * 动画暂停
   */
  readonly paused: RepeaterNakedCallback;
  /**
   * 动画继续
   */
  readonly resumed: RepeaterNakedCallback;
  /**
   * 动画停止
   */
  readonly stopped: RepeaterNakedCallback;
  /**
   * 动画重复
   */
  readonly repeated: RepeaterCountCallback;
  /**
   * 动画完成
   */
  readonly completed: RepeaterNakedCallback;
}

/**
 * 重复模式
 */
export enum RepeatMode {
  /**
   * 正常播放
   */
  NORMAL = "normal",
  /**
   * 轮流反向播放
   */
  ALTERNATE = "alternate"
}

/**
 * 重复器配置项
 */
export interface RepeatOptions extends Partial<RepeaterEvents> {
  /**
   * 重复次数（若小于或等于0则表示无限重复）
   */
  readonly count?: number;
  /**
   * 重复模式
   */
  readonly mode?: RepeatMode;
}

export {};