export interface NanoEvents {
  [event: string]: any;
}

export interface DefaultNanoEvents extends NanoEvents {
  [event: string]: (...args: any[]) => void;
}

export interface NanoUnsubscribe {
  (): void;
}

export interface NanoEmitter<T extends NanoEvents = DefaultNanoEvents> {

  events: Partial<{ [E in keyof T]: T[E][] }>;

  on<K extends keyof T>(this: this, event: K, cb: T[K]): NanoUnsubscribe;

  emit<K extends keyof T>(this: this, event: K, ...args: Parameters<T[K]>): void;

}

export function createNanoEmitter<T extends NanoEvents = DefaultNanoEvents>(): NanoEmitter<T> {
  return {
    events: {},
    on(event, cb) {
      const es = this.events[event];

      if (es === undefined) {
        this.events[event] = [cb];
      } else {
        es.push(cb);
      }

      return () => {
        this.events[event] = this.events[event]?.filter((it) => cb !== it);
      };
    },
    emit(event, ...args) {
      const callbacks = this.events[event] ?? [];

      for (const callback of callbacks) {
        callback(...args);
      }
    }
  };
}