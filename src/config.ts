import type { XhTransitionPresetBezierConfigType } from "./types";
import { XhTransitionPresetBezier, XhTransitionRepeatMode } from "./types";

/**
 * 过渡动画默认动画时长
 */
export const XhDefaultTransitionDuration = 300;

/**
 * 过渡动画默认预设曲线
 */
export const XhDefaultTransitionPreset = XhTransitionPresetBezier.linear;

/**
 * 过渡动画默认延迟开始时间
 */
export const XhDefaultTransitionDelay = 0;

/**
 * 过渡动画默认帧率
 */
export const XhDefaultTransitionFps = -1;

/**
 * 过渡动画默认帧率 (兼容)
 */
export const XhDefaultTransitionCompatibleFps = 30;

/**
 * 过渡动画预设曲线配置
 */
export const XhTransitionPresetBezierConfig: XhTransitionPresetBezierConfigType = {
  [XhTransitionPresetBezier.linear]: [0, 0, 1, 1],
  [XhTransitionPresetBezier.ease]: [0.25, 0.1, 0.25, 1],
  [XhTransitionPresetBezier.easeIn]: [0.42, 0, 1, 1],
  [XhTransitionPresetBezier.easeOut]: [0, 0, 0.58, 1],
  [XhTransitionPresetBezier.easeInOut]: [0.42, 0, 0.58, 1]
};

/**
 * 过渡动画重复器默认重复次数
 *
 * @since 0.0.11
 */
export const XhDefaultTransitionRepeatCount = -1;

/**
 * 过渡动画重复器默认重复模式
 *
 * @since 0.0.11
 */
export const XhDefaultTransitionRepeatMode = XhTransitionRepeatMode.normal;