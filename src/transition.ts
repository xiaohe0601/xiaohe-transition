import BezierEasing from "bezier-easing";
import Emitter from "./emitter";
import type { TransitionEvents, TransitionOptions, TransitionValueCallback } from "./types";
import { TransitionWorkStatus } from "./types";
import Timer from "./timer";
import { BEZIER_CURVE_PRESET_CONFIG, DEFAULT_TRANSITION_DELAY, DEFAULT_TRANSITION_DURATION, DEFAULT_TRANSITION_FPS, DEFAULT_TRANSITION_PRESET } from "./config";

export default class Transition extends Emitter<TransitionEvents> {

  /**
   * 配置项
   *
   * @private
   */
  private _options: TransitionOptions;

  /**
   * 回调函数
   *
   * @private
   */
  private readonly _callback: TransitionValueCallback;

  /**
   * 运行状态
   *
   * @private
   */
  private _status: TransitionWorkStatus = TransitionWorkStatus.FREE;

  /**
   * 当前时间进度（取值范围: 0 ~ 1）
   *
   * @private
   */
  private _progress: number = 0;

  /**
   * 贝塞尔曲线
   *
   * @private
   */
  private _bezier: NullableObject<BezierEasing.EasingFunction> = null;

  /**
   * 定时器
   *
   * @private
   */
  private _timer: NullableObject<Timer> = null;

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
   * @param callback    回调函数
   */
  constructor(callback: TransitionValueCallback);
  /**
   * 构造函数
   *
   * @param options     配置项
   * @param callback    回调函数
   */
  constructor(options: TransitionOptions, callback: TransitionValueCallback);
  constructor(optionsOrCallback: TransitionOptions | TransitionValueCallback, callback?: TransitionValueCallback) {
    super();

    if (typeof optionsOrCallback === "function") {
      this._options = {};
      this._callback = optionsOrCallback;
    } else {
      this._options = optionsOrCallback;
      this._callback = callback!;
    }
  }

  /**
   * 获取或更新配置项
   *
   * @param [options]   配置项
   * @returns           配置项
   */
  public options(options?: TransitionOptions): TransitionOptions {
    if (options != null) {
      this._options = Object.assign({}, this._options, options);
    }

    return this._options;
  }

  /**
   * 获取运行状态
   *
   * @returns   运行状态
   */
  public status(): TransitionWorkStatus {
    return this._status;
  }

  /**
   * 获取当前时间进度
   *
   * @returns   当前时间进度
   */
  public progress(): number {
    return this._progress;
  }

  /**
   * 获取当前值
   *
   * @returns   当前值
   */
  public value(): number {
    const { start = 0, target = 0 } = this._options;

    if (this._bezier == null) {
      throw new Error("需要先调用Transition#start方法以创建BezierEasing实例！");
    }

    // 当前曲线进度 = bezier(当前时间进度)
    // 当前值 = 当前曲线进度 * (目标值 - 起始值) + 起始值
    return this._bezier(this.progress()) * (target - start) + start;
  }

  /**
   * 启动动画
   *
   * @param [options]   配置项
   * @returns           过渡动画实例
   */
  public start(options?: TransitionOptions): Transition {
    if (this.status() !== TransitionWorkStatus.FREE) {
      this.stop();
    }

    const {
      duration = DEFAULT_TRANSITION_DURATION,
      preset = DEFAULT_TRANSITION_PRESET,
      bezier,
      delay = DEFAULT_TRANSITION_DELAY,
      fps = DEFAULT_TRANSITION_FPS
    } = this.options(options);

    this._bezier = BezierEasing(...(bezier ?? BEZIER_CURVE_PRESET_CONFIG[preset]));

    const startTime = Date.now() + delay;

    this._timer = new Timer(fps, () => {
      // 当前时间进度 = (当前时间 - 开始时间 - 暂停累计时间) / 动画时长
      const progress = (Date.now() - startTime - this._pauses) / duration;
      this._progress = Math.max(0, Math.min(1, progress));

      this._callback(this.value(), this);

      if (this.progress() >= 1) {
        this.stop();

        this._options.completed?.(this);
        this.emit("completed", this);
      }
    }).start();

    this._status = TransitionWorkStatus.WORKING;

    this._options.started?.(this);
    this.emit("started", this);

    return this;
  }

  /**
   * 暂停动画
   *
   * @returns   过渡动画实例
   */
  public pause(): Transition {
    if (this.status() !== TransitionWorkStatus.WORKING || this._timer == null) {
      return this;
    }

    this._timer.stop();

    this._last = Date.now();

    this._status = TransitionWorkStatus.PAUSED;

    this._options.paused?.(this);
    this.emit("paused", this);

    return this;
  }

  /**
   * 继续动画
   *
   * @returns   过渡动画实例
   */
  public resume(): Transition {
    if (this.status() !== TransitionWorkStatus.PAUSED || this._timer == null) {
      return this;
    }

    if (this._last > 0) {
      this._pauses += Date.now() - this._last;
    }

    this._timer.start();

    this._status = TransitionWorkStatus.WORKING;

    this._options.resumed?.(this);
    this.emit("resumed", this);

    return this;
  }

  /**
   * 停止动画
   *
   * @returns   过渡动画实例
   */
  public stop(): Transition {
    if (this._timer != null) {
      this._timer.stop();
      this._timer = null;
    }

    this.reset();

    this._options.stopped?.(this);
    this.emit("stopped", this);

    return this;
  }

  /**
   * 销毁动画实例
   */
  public destroy(): void {
    if (this.status() !== TransitionWorkStatus.FREE) {
      this.stop();
    }

    this.clearEvents();
  }

  /**
   * 重置动画数据
   *
   * @private
   */
  private reset(): void {
    this._status = TransitionWorkStatus.FREE;
    this._progress = 0;

    this._bezier = null;

    this._last = 0;
    this._pauses = 0;
  }

}