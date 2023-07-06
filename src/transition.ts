import { IXhTransitionOptions, XhTransitionValueCallback, XhTransitionWorkStatus } from "./types";

import { XhDefaultTransitionDelay, XhDefaultTransitionDuration, XhDefaultTransitionFps, XhDefaultTransitionPreset, XhTransitionPresetBezierConfig } from "./config";

import { XhTransitionTimer } from "./timer";

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
   * 运行状态
   *
   * @private
   */
  private _status: XhTransitionWorkStatus = XhTransitionWorkStatus.free;

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
   * 动画值变化回调函数
   *
   * @private
   */
  private readonly _callback: XhTransitionValueCallback;

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
   * @param options     配置项
   * @param callback    动画值变化回调函数
   */
  constructor(options: IXhTransitionOptions, callback: XhTransitionValueCallback);
  constructor(callback: XhTransitionValueCallback);
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
   * 获取运行状态
   *
   * @returns {XhTransitionWorkStatus}    运行状态
   */
  public status(): XhTransitionWorkStatus {
    return this._status;
  }

  /**
   * 启动动画
   *
   * @param options   配置项
   */
  public start(options: IXhTransitionOptions): void {
    if (this.status() !== XhTransitionWorkStatus.free) {
      this.stop();
    }

    const {
      start = 0,
      target = 0,
      duration = XhDefaultTransitionDuration,
      preset = XhDefaultTransitionPreset,
      bezier,
      delay = XhDefaultTransitionDelay,
      fps = XhDefaultTransitionFps
    } = this._options = Object.assign({}, this._options, options);

    this._bezier = BezierEasing(...(bezier ?? XhTransitionPresetBezierConfig[preset]));

    const currentTime = Date.now();
    const startTime = currentTime + delay;

    this._timer = new XhTransitionTimer(fps, () => {
      // 当前时间进度 = (当前时间 - 开始时间 - 暂停累计时间) / 动画时长
      const time = Math.max(0, Math.min(1, (Date.now() - startTime - this._pauses) / duration));

      // 当前曲线进度 = bezier(当前时间进度)
      // 当前值 = 当前曲线进度 * (目标值 - 起始值) + 起始值
      const value = this._bezier!!(time) * (target - start) + start;

      this._callback(value, this);

      if (time >= 1) {
        this.stop();
      }
    }).start();

    this._status = XhTransitionWorkStatus.working;

    this._options.started?.(this);
  };

  /**
   * 暂停动画
   */
  public pause(): void {
    if (this.status() !== XhTransitionWorkStatus.working || this._timer == null) {
      return;
    }

    this._timer.stop();

    this._last = Date.now();

    this._status = XhTransitionWorkStatus.paused;

    this._options.paused?.(this);
  };

  /**
   * 继续动画
   */
  public resume(): void {
    if (this.status() !== XhTransitionWorkStatus.paused || this._timer == null) {
      return;
    }

    if (this._last > 0) {
      this._pauses += Date.now() - this._last;
    }

    this._timer.start();

    this._status = XhTransitionWorkStatus.working;

    this._options.resumed?.(this);
  };

  /**
   * 停止动画
   */
  public stop(): void {
    if (this._timer != null) {
      this._timer.stop();
      this._timer = null;
    }

    this._bezier = null;

    this._last = 0;
    this._pauses = 0;

    this._status = XhTransitionWorkStatus.free;

    this._options.stopped?.(this);
  };

}