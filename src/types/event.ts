import { ClientEvents } from 'discord.js';

/**
 * Any event config regardless of the specific event name.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyEventConfig = EventConfig<any>;

type EventExecuteFunction<T extends keyof ClientEvents> = (
    ...args: ClientEvents[T]
) => void | Promise<void>;

type EventOptions<T extends keyof ClientEvents> = Omit<
    EventConfig<T>,
    'name' | 'once'
> & { once?: boolean };

/**
 * Represents a fully resolved event listener definition.
 */
export interface EventConfig<T extends keyof ClientEvents> {
    name: T;
    once: boolean;
    execute: EventExecuteFunction<T>;
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
export function defineEvent<T extends keyof ClientEvents>(
    name: T,
    options: EventOptions<T>
): EventConfig<T> {
    return {
        name,
        once: options.once ?? false,
        execute: options.execute,
    };
}
