import { BaseConfig, Executable } from './base.js';
import { Options } from './options.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySubcommandConfig = SubcommandConfig<any>;

export interface SubcommandConfig<T extends Record<string, Options>>
    extends BaseConfig, Executable<T> {}

/**
 * Creates a slash command subcommand with typed options.
 *
 * @example
 * Subcommand('set', {
 *     description: 'Set a value',
 *     options: { value: NumberOption({ description: 'Numerical value' }) },
 *     execute: async (interaction, { value }) => { ... }
 * });
 */
export function Subcommand<T extends Record<string, Options>>(
    options: Omit<SubcommandConfig<T>, 'options'> & { options?: T }
): SubcommandConfig<T> {
    return {
        description: options.description,
        options: options.options ?? ({} as T),
        execute: options.execute,
    };
}
