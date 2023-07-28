import type { IXhTransitionRepeaterOptions } from "./types";
import { XhTransitionRepeatDirection, XhTransitionRepeatMode, XhTransitionWorkStatus } from "./types";

import { XhDefaultTransitionRepeatCount, XhDefaultTransitionRepeatMode } from "./config";

import XhTransition from "./transition";

/**
 * 过渡动画重复器
 *
 * @since 0.0.11
 * @author 小何同学
 */
export default class XhTransitionRepeater {

  /**
   * 过渡动画实例
   *
   * @private
   */
  private readonly _transition: XhTransition;

  /**
   * 配置项
   *
   * @private
   */
  private _options: IXhTransitionRepeaterOptions;

  /**
   * 运行状态
   *
   * @private
   */
  private _status: XhTransitionWorkStatus = XhTransitionWorkStatus.free;

  /**
   * 已播放次数
   *
   * @private
   */
  private _counts: number = 0;

  /**
   * 当前播放方向
   *
   * @private
   */
  private _direction: XhTransitionRepeatDirection = XhTransitionRepeatDirection.forward;

  /**
   * 构造函数
   *
   * @param transition    过渡动画实例
   * @param [options]     配置项
   */
  constructor(transition: XhTransition, options?: IXhTransitionRepeaterOptions) {
    this._transition = transition;
    this._options = options ?? {};
  }

  /**
   * 获取或更新配置项
   *
   * @param [options]   配置项
   * @returns           配置项
   */
  public options(options?: IXhTransitionRepeaterOptions): IXhTransitionRepeaterOptions {
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
  public status(): XhTransitionWorkStatus {
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
   * 获取当前播放方向
   *
   * @returns   当前播放方向
   */
  public direction(): XhTransitionRepeatDirection {
    return this._direction;
  }

  /**
   * 启动重复器
   *
   * @param [options]   配置项
   * @returns           重复器实例
   */
  public start(options?: IXhTransitionRepeaterOptions): XhTransitionRepeater {
    if (this.status() !== XhTransitionWorkStatus.free) {
      this.stop();
    }

    const {
      count = XhDefaultTransitionRepeatCount,
      mode = XhDefaultTransitionRepeatMode
    } = this.options(options);

    const completer = (transition: XhTransition) => {
      this._counts += 1;

      this._options.repeated?.(this.counts(), this, transition);

      if (count > 0 && this.counts() >= count) {
        return;
      }

      const { start, target } = transition.options();

      switch (mode) {
        case XhTransitionRepeatMode.normal: {
          transition.start({
            start,
            target,
            completed: completer
          });
          this._direction = XhTransitionRepeatDirection.forward;
          break;
        }
        case XhTransitionRepeatMode.alternate: {
          const direction = this.direction();

          transition.start({
            start: target,
            target: start,
            completed: completer
          });

          switch (direction) {
            case XhTransitionRepeatDirection.forward: {
              this._direction = XhTransitionRepeatDirection.backward;
              break;
            }
            case XhTransitionRepeatDirection.backward: {
              this._direction = XhTransitionRepeatDirection.forward;
              break;
            }
          }

          break;
        }
      }
    };

    this._transition.start({
      completed: completer
    });

    this._status = XhTransitionWorkStatus.working;

    this._options.started?.(this, this._transition);

    return this;
  }

  /**
   * 暂停重复动画
   *
   * @returns   重复器实例
   */
  public pause(): XhTransitionRepeater {
    if (this.status() !== XhTransitionWorkStatus.working) {
      return this;
    }

    this._transition.pause();

    this._status = XhTransitionWorkStatus.paused;

    this._options.paused?.(this, this._transition);

    return this;
  }

  /**
   * 继续重复动画
   *
   * @returns   重复器实例
   */
  public resume(): XhTransitionRepeater {
    if (this.status() !== XhTransitionWorkStatus.paused) {
      return this;
    }

    this._transition.resume();

    this._status = XhTransitionWorkStatus.working;

    this._options.resumed?.(this, this._transition);

    return this;
  }

  /**
   * 停止重复器
   *
   * @returns   重复器实例
   */
  public stop(): XhTransitionRepeater {
    this._transition.stop();

    this.reset();

    this._options.stopped?.(this, this._transition);

    return this;
  }

  /**
   * 重置重复器数据
   *
   * @private
   */
  private reset(): void {
    this._status = XhTransitionWorkStatus.free;

    this._counts = 0;
    this._direction = XhTransitionRepeatDirection.forward;
  }

}