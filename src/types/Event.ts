import { ClientEvents } from 'discord.js';

/**
 * Any valid Discord client event name.
 */
export type EventName = keyof ClientEvents;

/**
 * Any event config regardless of the specific event name.
 */
export type AnyEventConfig = EventConfig<EventName>;

type EventExecuteFunc<T extends EventName> = (
    ...args: ClientEvents[T]
) => void | Promise<void>;

interface EventOptions<T extends EventName> {
    once?: boolean;
    execute: EventExecuteFunc<T>;
}

/**
 * Represents a fully resolved event listener definition.
 */
export interface EventConfig<T extends EventName> {
    name: T;
    once: boolean;
    execute: EventExecuteFunc<T>;
}

/**
 * Creates an event listener.
 * If once is not provided, it defaults to false.
 *
 * @example
 * const ping = defineEvent('clientReady', {
 *     once: true,
 *     execute: (client) => { ... }
 * });
 */
export function defineEvent<T extends EventName>(
    name: T,
    options: EventOptions<T>
): EventConfig<T> {
    return {
        name,
        once: options.once ?? false,
        execute: options.execute,
    };
}
