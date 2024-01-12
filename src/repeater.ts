import type Transition from "./transition";
import type { RepeatOptions, RepeaterEvents } from "./types";
import { RepeatMode, TransitionWorkStatus } from "./types";
import Emitter from "./emitter";
import { DEFAULT_REPEAT_COUNT, DEFAULT_REPEAT_MODE } from "./config";

export default class Repeater extends Emitter<RepeaterEvents> {

  /**
   * 过渡动画实例
   *
   * @private
   */
  private readonly _transition: Transition;

  /**
   * 配置项
   *
   * @private
   */
  private _options: RepeatOptions;

  /**
   * 运行状态
   *
   * @private
   */
  private _status: TransitionWorkStatus = TransitionWorkStatus.FREE;

  /**
   * 已播放次数
   *
   * @private
   */
  private _counts: number = 0;

  /**
   * 当前播放方向是否为正向
   *
   * @private
   */
  private _forward: boolean = true;

  /**
   * 构造函数
   *
   * @param transition    过渡动画实例
   * @param [options]     配置项
   */
  constructor(transition: Transition, options?: RepeatOptions) {
    super();

    this._transition = transition;
    this._options = options ?? {};
  }

  /**
   * 获取或更新配置项
   *
   * @param [options]   配置项
   * @returns           配置项
   */
  public options(options?: RepeatOptions): RepeatOptions {
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
   * 获取已播放次数
   *
   * @returns   已播放次数
   */
  public counts(): number {
    return this._counts;
  }

  /**
   * 获取当前播放方向是否为正向
   *
   * @returns   当前播放方向是否为正向
   */
  public isForward(): boolean {
    return this._forward;
  }

  /**
   * 启动重复器
   *
   * @param [options]   配置项
   * @returns           重复器实例
   */
  public start(options?: RepeatOptions): Repeater {
    if (this.status() !== TransitionWorkStatus.FREE) {
      this.stop();
    }

    const {
      count = DEFAULT_REPEAT_COUNT,
      mode = DEFAULT_REPEAT_MODE
    } = this.options(options);

    const completer = (transition: Transition) => {
      this._counts += 1;

      this._options.repeated?.(this.counts(), this, transition);
      this.emit("repeated", this.counts(), this, transition);

      if (count > 0 && this.counts() >= count) {
        this._options.completed?.(this, this._transition);
        this.emit("completed", this, this._transition);
        return;
      }

      const { start, target } = transition.options();

      switch (mode) {
        case RepeatMode.NORMAL: {
          transition.start({
            start,
            target,
            completed: completer
          });
          this._forward = true;
          break;
        }
        case RepeatMode.ALTERNATE: {
          transition.start({
            start: target,
            target: start,
            completed: completer
          });
          this._forward = !this.isForward();
          break;
        }
      }
    };

    this._transition.start({
      completed: completer
    });

    this._status = TransitionWorkStatus.WORKING;

    this._options.started?.(this, this._transition);
    this.emit("started", this, this._transition);

    return this;
  }

  /**
   * 暂停重复动画
   *
   * @returns   重复器实例
   */
  public pause(): Repeater {
    if (this.status() !== TransitionWorkStatus.WORKING) {
      return this;
    }

    this._transition.pause();

    this._status = TransitionWorkStatus.PAUSED;

    this._options.paused?.(this, this._transition);
    this.emit("paused", this, this._transition);

    return this;
  }

  /**
   * 继续重复动画
   *
   * @returns   重复器实例
   */
  public resume(): Repeater {
    if (this.status() !== TransitionWorkStatus.PAUSED) {
      return this;
    }

    this._transition.resume();

    this._status = TransitionWorkStatus.WORKING;

    this._options.resumed?.(this, this._transition);
    this.emit("resumed", this, this._transition);

    return this;
  }

  /**
   * 停止重复器
   *
   * @returns   重复器实例
   */
  public stop(): Repeater {
    this._transition.stop();

    this.reset();

    this._options.stopped?.(this, this._transition);
    this.emit("stopped", this, this._transition);

    return this;
  }

  /**
   * 销毁重复器实例
   */
  public destroy(): void {
    if (this.status() !== TransitionWorkStatus.FREE) {
      this.stop();
    }

    this.clearEvents();

    this._transition.destroy();
  }

  /**
   * 重置重复器数据
   *
   * @private
   */
  private reset(): void {
    this._status = TransitionWorkStatus.FREE;

    this._counts = 0;
    this._forward = true;
  }

}