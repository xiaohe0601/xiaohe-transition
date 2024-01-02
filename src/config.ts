import type { BezierCurvePresetConfig } from "./types";
import { BezierCurvePreset, RepeatMode } from "./types";

/**
 * 贝塞尔曲线预设配置
 */
export const BEZIER_CURVE_PRESET_CONFIG: BezierCurvePresetConfig = {
  [BezierCurvePreset.LINEAR]: [0, 0, 1, 1],
  [BezierCurvePreset.EASE]: [0.25, 0.1, 0.25, 1],
  [BezierCurvePreset.EASE_IN]: [0.42, 0, 1, 1],
  [BezierCurvePreset.EASE_OUT]: [0, 0, 0.58, 1],
  [BezierCurvePreset.EASE_IN_OUT]: [0.42, 0, 0.58, 1]
};

/**
 * 过渡动画默认动画时长（单位: ms）
 */
export const DEFAULT_TRANSITION_DURATION: number = 300;

/**
 * 过渡动画默认预设曲线
 */
export const DEFAULT_TRANSITION_PRESET: BezierCurvePreset = BezierCurvePreset.LINEAR;

/**
 * 过渡动画默认延迟开始时间（单位: ms）
 */
export const DEFAULT_TRANSITION_DELAY: number = 0;

/**
 * 过渡动画默认帧率
 */
export const DEFAULT_TRANSITION_FPS: number = -1;

/**
 * 过渡动画回退帧率
 */
export const TRANSITION_FALLBACK_FPS: number = 30;

/**
 * 重复器默认重复次数
 */
export const DEFAULT_REPEAT_COUNT: number = -1;

/**
 * 重复器默认重复模式
 */
export const DEFAULT_REPEAT_MODE: RepeatMode = RepeatMode.NORMAL;