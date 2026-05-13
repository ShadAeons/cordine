import { BaseConfig, Executable } from './base.js';
import { Options } from './options.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySubcommandConfig = SubcommandConfig<any>;

export interface SubcommandConfig<T extends Record<string, Options>>
    extends BaseConfig, Executable<T> {}

export function Subcommand<T extends Record<string, Options>>(
    options: Omit<SubcommandConfig<T>, 'options'> & { options?: T }
): SubcommandConfig<T> {
    return {
        description: options.description,
        options: options.options ?? ({} as T),
        execute: options.execute,
    };
}
