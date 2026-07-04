import { BaseConfig, Executable } from './base.js';
import { Options } from './options.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySubcommandConfig = SubcommandConfig<any>;

export interface SubcommandConfig<T extends Record<string, Options>>
    extends BaseConfig, Executable<T> {
    type: 'subcommand';
}

type SubcommandOptions<T extends Record<string, Options>> = Omit<
    SubcommandConfig<T>,
    'type' | 'options'
> & {
    options?: T;
};

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
    options: SubcommandOptions<T>
): SubcommandConfig<T> {
    return {
        type: 'subcommand',
        description: options.description,
        options: options.options ?? ({} as T),
        execute: options.execute,
    };
}
