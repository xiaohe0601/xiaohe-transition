import type { DefaultNanoEvents, NanoEmitter, NanoEvents, NanoUnsubscribe } from "./plugins/nano-events";
import { createNanoEmitter } from "./plugins/nano-events";

export default class Emitter<T extends NanoEvents = DefaultNanoEvents> {

  protected _emitter: NanoEmitter<T>;

  constructor() {
    this._emitter = createNanoEmitter<T>();
  }

  public events(): Partial<{ [E in keyof T]: T[E][] }> {
    return this._emitter.events;
  }

  public emit<E extends keyof T>(event: E, ...args: Parameters<T[E]>): Emitter<T> {
    this._emitter.emit(event, ...args);

    return this;
  }

  public on<E extends keyof T>(event: E, callback: T[E]): NanoUnsubscribe {
    return this._emitter.on(event, callback);
  }

  public once<E extends keyof T>(event: E, callback: T[E]): NanoUnsubscribe {
    const unbind = this.on(event, ((...args: Parameters<T[E]>) => {
      unbind();
      callback(...args);
    }) as T[E]);

    return unbind;
  }

  public clearEvents(): Emitter<T> {
    this._emitter.events = {};

    return this;
  }

}