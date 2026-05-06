import { ClientEvents } from 'discord.js';

export type EventName = keyof ClientEvents;
export type AnyEventConfig = EventConfig<EventName>;

type EventExecuteFunc<T extends EventName> = (
    ...args: ClientEvents[T]
) => void | Promise<void>;

interface EventOptions<T extends EventName> {
    once?: boolean;
    execute: EventExecuteFunc<T>;
}

export interface EventConfig<T extends EventName> {
    name: T;
    once?: boolean;
    execute: EventExecuteFunc<T>;
}

export function defineEvent<T extends EventName>(
    name: T,
    options: EventOptions<T>
): EventConfig<T> {
    return {
        name,
        once: options.once,
        execute: options.execute,
    };
}
