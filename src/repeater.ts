import { IXhTransitionRepeaterOptions, XhTransitionRepeatDirection } from "./types";

import XhTransition from "./transition";

/**
 * 过渡动画重复器
 *
 * @since 0.0.11
 * @author 小何同学
 */
export class XhTransitionRepeater {

  /**
   * 过渡动画实例
   *
   * @private
   */
  private _transition: XhTransition;

  /**
   * 配置项
   *
   * @private
   */
  private _options: IXhTransitionRepeaterOptions;

  /**
   * 已播放次数
   *
   * @private
   */
  private _count: number = 0;

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
   * @returns {IXhTransitionRepeaterOptions}    配置项
   */
  public options(options?: IXhTransitionRepeaterOptions): IXhTransitionRepeaterOptions {
    if (options != null) {
      this._options = Object.assign({}, this._options, options);
    }

    return this._options;
  }

  /**
   * 启动重复器
   *
   * @param [options]   配置项
   */
  public start(options?: IXhTransitionRepeaterOptions): void {

  }

  /**
   * 暂停重复动画
   */
  public pause(): void {

  }

  /**
   * 继续重复动画
   */
  public resume(): void {

  }

  /**
   * 停止重复器
   */
  public stop(): void {

  }

  /**
   * 重置重复器数据
   *
   * @private
   */
  private reset(): void {

  }

}