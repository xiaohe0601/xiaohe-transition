import type { NullableNumber, TimerCallback } from "./types";
import { TRANSITION_FALLBACK_FPS } from "./config";
import { fps2ms } from "./helpers";

export default class Timer {

  /**
   * 定时器id
   *
   * @private
   */
  private _id: NullableNumber = null;

  /**
   * 定时器是否正在运行
   *
   * @private
   */
  private _timing: boolean = false;

  /**
   * 帧率
   *
   * @private
   */
  private readonly _fps: number;

  /**
   * 回调函数
   *
   * @private
   */
  private readonly _callback: TimerCallback;

  /**
   * 构造函数
   *
   * @param fps         帧率
   * @param callback    回调函数
   */
  constructor(fps: number, callback: TimerCallback) {
    this._fps = fps > 0 ? fps : (this.supportAnimationFrame() ? -1 : TRANSITION_FALLBACK_FPS);
    this._callback = callback;
  }

  /**
   * 获取定时器id
   *
   * @returns   定时器id
   */
  public id(): NullableNumber {
    return this._id;
  }

  /**
   * 启动定时器
   *
   * @returns   定时器实例
   */
  public start(): Timer {
    this.stop();

    if (this.useAnimationFrame()) {
      this._id = requestAnimationFrame(() => {
        this.animate();
      });
    } else {
      // @ts-ignore
      this._id = setInterval(() => {
        this._callback();
      }, fps2ms(this._fps));
    }
    this._timing = true;

    return this;
  }

  /**
   * 停止定时器
   *
   * @returns   定时器实例
   */
  public stop(): Timer {
    if (this._id == null) {
      return this;
    }

    if (this.useAnimationFrame()) {
      cancelAnimationFrame(this._id);
    } else {
      clearInterval(this._id);
    }
    this._timing = false;
    this._id = null;

    return this;
  }

  /**
   * 用于AF的回调函数包装方法
   *
   * @private
   */
  private animate(): void {
    if (!this._timing) {
      return;
    }

    this._callback();

    this._id = requestAnimationFrame(() => {
      this.animate();
    });
  }

  /**
   * 当前环境是否支持AF
   *
   * @private
   * @returns   是否支持AF
   */
  private supportAnimationFrame(): boolean {
    return typeof requestAnimationFrame === "function";
  }

  /**
   * 是否使用AF实现定时器
   *
   * @private
   * @returns   是否使用AF
   */
  private useAnimationFrame(): boolean {
    return this.supportAnimationFrame() && this._fps <= 0;
  }

}