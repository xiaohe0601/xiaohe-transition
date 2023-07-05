import { IXhTransitionOptions, XhTransitionCallback, XhTransitionPresetBezier, XhTransitionStatus } from "./types";

import BezierEasing from "bezier-easing";

/**
 * 过渡动画
 *
 * @since 0.0.1
 * @author 小何同学
 */
export class XhTransition {

  /**
   * 默认预设曲线
   *
   * @since 0.0.1
   */
  public static readonly DefaultPresetBezier: XhTransitionPresetBezier = "linear";

  /**
   * 配置项
   *
   * @since 0.0.1
   * @private
   */
  private _options: IXhTransitionOptions;

  /**
   * 动画值变化回调函数
   *
   * @since 0.0.1
   * @private
   */
  private _callback: XhTransitionCallback;

  /**
   * 运行状态
   *
   * @since 0.0.1
   * @private
   */
  private _status: XhTransitionStatus = XhTransitionStatus.none;

  /**
   * 贝塞尔曲线
   *
   * @since 0.0.1
   * @private
   */
  private _bezier: BezierEasing.EasingFunction | null = null;

  constructor(options: IXhTransitionOptions, callback: XhTransitionCallback) {
    this._options = options;
    this._callback = callback;
  }

  /**
   * 启动动画
   *
   * @since 0.0.1
   */
  public start() {

  };

  /**
   * 暂停动画
   *
   * @since 0.0.1
   */
  public pause() {

  };

  /**
   * 继续动画
   *
   * @since 0.0.1
   */
  public resume() {

  };

  /**
   * 停止动画
   *
   * @since 0.0.1
   */
  public stop() {

  };

  /**
   * 当前运行状态
   *
   * @since 0.0.1
   */
  public status() {
    return this._status;
  }

}