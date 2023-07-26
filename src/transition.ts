import type { IXhTransitionOptions, XhTransitionValueCallback } from "./types";
import { XhTransitionWorkStatus } from "./types";

import { XhDefaultTransitionDelay, XhDefaultTransitionDuration, XhDefaultTransitionFps, XhDefaultTransitionPreset, XhTransitionPresetBezierConfig } from "./config";

import XhTransitionTimer from "./timer";

import BezierEasing from "bezier-easing";

/**
 * 贝塞尔曲线过渡动画
 *
 * @author 小何同学
 */
export default class XhTransition {

  /**
   * 配置项
   *
   * @private
   */
  private _options: IXhTransitionOptions;

  /**
   * 动画值变化回调函数
   *
   * @private
   */
  private readonly _callback: XhTransitionValueCallback;

  /**
   * 运行状态
   *
   * @private
   */
  private _status: XhTransitionWorkStatus = XhTransitionWorkStatus.free;

  /**
   * 当前时间进度 (取值范围: 0 ~ 1)
   *
   * @since 0.0.10
   * @private
   */
  private _progress: number = 0;

  /**
   * 贝塞尔曲线
   *
   * @private
   */
  private _bezier: BezierEasing.EasingFunction | null = null;

  /**
   * 定时器
   *
   * @private
   */
  private _timer: XhTransitionTimer | null = null;

  /**
   * 上次暂停时间戳
   *
   * @private
   */
  private _last: number = 0;

  /**
   * 累计暂停时间 (单位: ms)
   *
   * @private
   */
  private _pauses: number = 0;

  /**
   * 构造函数
   *
   * @param callback    动画值变化回调函数
   */
  constructor(callback: XhTransitionValueCallback)
  /**
   * 构造函数
   *
   * @param options     配置项
   * @param callback    动画值变化回调函数
   */
  constructor(options: IXhTransitionOptions, callback: XhTransitionValueCallback)
  constructor(optionsOrCallback: IXhTransitionOptions | XhTransitionValueCallback, callback?: XhTransitionValueCallback) {
    if (typeof optionsOrCallback === "function") {
      this._options = {};
      this._callback = optionsOrCallback;
    } else {
      this._options = optionsOrCallback;
      this._callback = callback!!;
    }
  }

  /**
   * 获取或更新配置项
   *
   * @since 0.0.11
   * @param [options]   配置项
   * @returns {IXhTransitionOptions}    配置项
   */
  public options(options?: IXhTransitionOptions): IXhTransitionOptions {
    if (options != null) {
      this._options = Object.assign({}, this._options, options);
    }

    return this._options;
  }

  /**
   * 获取运行状态
   *
   * @returns {XhTransitionWorkStatus}    运行状态
   */
  public status(): XhTransitionWorkStatus {
    return this._status;
  }

  /**
   * 获取当前时间进度
   *
   * @since 0.0.10
   * @returns {number}    当前时间进度
   */
  public progress(): number {
    return this._progress;
  }

  /**
   * 获取当前值
   *
   * @since 0.0.10
   * @returns {number}    当前值
   */
  public value(): number {
    const { start = 0, target = 0 } = this._options;

    if (this._bezier == null) {
      throw new Error("需要先调用XhTransition#start方法以创建BezierEasing实例！");
    }

    // 当前曲线进度 = bezier(当前时间进度)
    // 当前值 = 当前曲线进度 * (目标值 - 起始值) + 起始值
    return this._bezier(this.progress()) * (target - start) + start;
  }

  /**
   * 启动动画
   *
   * @param [options]           配置项
   * @returns {XhTransition}    过渡动画实例
   */
  public start(options?: IXhTransitionOptions): XhTransition {
    if (this.status() !== XhTransitionWorkStatus.free) {
      this.stop();
    }

    const {
      duration = XhDefaultTransitionDuration,
      preset = XhDefaultTransitionPreset,
      bezier,
      delay = XhDefaultTransitionDelay,
      fps = XhDefaultTransitionFps
    } = this.options(options);

    this._bezier = BezierEasing(...(bezier ?? XhTransitionPresetBezierConfig[preset]));

    const startTime = Date.now() + delay;

    this._timer = new XhTransitionTimer(fps, () => {
      // 当前时间进度 = (当前时间 - 开始时间 - 暂停累计时间) / 动画时长
      const progress = (Date.now() - startTime - this._pauses) / duration;
      this._progress = Math.max(0, Math.min(1, progress));

      this._callback(this.value(), this);

      if (this.progress() >= 1) {
        this.stop();

        this._options.completed?.(this);
      }
    }).start();

    this._status = XhTransitionWorkStatus.working;

    this._options.started?.(this);

    return this;
  }

  /**
   * 暂停动画
   *
   * @returns {XhTransition}    过渡动画实例
   */
  public pause(): XhTransition {
    if (this.status() !== XhTransitionWorkStatus.working || this._timer == null) {
      return this;
    }

    this._timer.stop();

    this._last = Date.now();

    this._status = XhTransitionWorkStatus.paused;

    this._options.paused?.(this);

    return this;
  }

  /**
   * 继续动画
   *
   * @returns {XhTransition}    过渡动画实例
   */
  public resume(): XhTransition {
    if (this.status() !== XhTransitionWorkStatus.paused || this._timer == null) {
      return this;
    }

    if (this._last > 0) {
      this._pauses += Date.now() - this._last;
    }

    this._timer.start();

    this._status = XhTransitionWorkStatus.working;

    this._options.resumed?.(this);

    return this;
  }

  /**
   * 停止动画
   *
   * @returns {XhTransition}    过渡动画实例
   */
  public stop(): XhTransition {
    if (this._timer != null) {
      this._timer.stop();
      this._timer = null;
    }

    this.reset();

    this._options.stopped?.(this);

    return this;
  }

  /**
   * 重置动画数据
   *
   * @since 0.0.10
   * @private
   */
  private reset(): void {
    this._status = XhTransitionWorkStatus.free;
    this._progress = 0;

    this._bezier = null;

    this._last = 0;
    this._pauses = 0;
  }

}