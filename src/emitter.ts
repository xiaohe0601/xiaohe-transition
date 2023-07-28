import type { DefaultEvents, Emitter, EventsMap, Unsubscribe } from "nanoevents";
import { createNanoEvents } from "nanoevents";

/**
 * 过渡动画事件触发器
 *
 * @since 0.0.17
 * @author 小何同学
 */
export default class XhTransitionEmitter<Events extends EventsMap = DefaultEvents> {

  protected _emitter: Emitter<Events>;

  constructor() {
    this._emitter = createNanoEvents<Events>();
  }

  public events(): Partial<{ [E in keyof Events]: Events[E][] }> {
    return this._emitter.events;
  }

  public emit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>): XhTransitionEmitter {
    this._emitter.emit(event, ...args);

    return this;
  }

  public on<E extends keyof Events>(event: E, callback: Events[E]): Unsubscribe {
    return this._emitter.on(event, callback);
  }

  public once<E extends keyof Events>(event: E, callback: Events[E]): Unsubscribe {
    const unbind = this.on(event, ((...args: Parameters<Events[E]>): void => {
      unbind();
      callback(...args);
    }) as Events[E]);

    return unbind;
  }

  public clearEvents(): XhTransitionEmitter {
    this._emitter.events = {};

    return this;
  }

}