import { BaseCommandConfig, Executable } from './base.js';
import { Options } from './options.js';
import { SubcommandGroupConfig } from './subcommand-group.js';
import { AnySubcommandConfig } from './subcommand.js';

/**
 * Any valid slash command definition regardless of the specific option parameters.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyCommandConfig = CommandConfig<any>;

interface FlatCommandConfig<T extends Record<string, Options>>
    extends BaseCommandConfig, Executable<T> {
    type: 'flat';
}

interface SubcommandCommandConfig extends BaseCommandConfig {
    type: 'subs';
    subcommands: Record<string, AnySubcommandConfig>;
    groups: Record<string, SubcommandGroupConfig>;
}

/**
 * Represents a fully resolved slash command definition.
 */
export type CommandConfig<T extends Record<string, Options>> =
    | FlatCommandConfig<T>
    | SubcommandCommandConfig;

/**
 * Represents a fully resolved flat slash command definition with no subcommands.
 */
type FlatCommandOptions<T extends Record<string, Options>> = Omit<
    FlatCommandConfig<T>,
    'name' | 'options' | 'type'
> & { options?: T };

/**
 * Represents a fully resolved slash command definition with subcommands.
 */
type SubcommandCommandOptions = Omit<
    SubcommandCommandConfig,
    'name' | 'groups' | 'type'
> & { groups?: Record<string, SubcommandGroupConfig> };

type CommandOptions<T extends Record<string, Options>> =
    | FlatCommandOptions<T>
    | SubcommandCommandOptions;

// Overload defineCommand function
export function defineCommand<T extends Record<string, Options>>(
    name: string,
    options: FlatCommandOptions<T>
): FlatCommandConfig<T>;

export function defineCommand(
    name: string,
    options: SubcommandCommandOptions
): SubcommandCommandConfig;

/**
 * Creates a slash command with typed options.
 *
 * @example
 * const ping = defineCommand('ping', {
 *     description: 'Pings a user!',
 *     options: { target: UserOption({ description: 'Target user to be pinged' }) },
 *     execute: async (interaction, { target }) => { ... }
 * });
 */
export function defineCommand<T extends Record<string, Options>>(
    name: string,
    options: CommandOptions<T>
): CommandConfig<T> {
    const config = {
        name,
        description: options.description,
    };

    // SubcommandCommandConfig
    if ('subcommands' in options) {
        const subOptions = options as SubcommandCommandOptions;
        return {
            type: 'subs',
            ...config,
            subcommands: subOptions.subcommands,
            groups: subOptions.groups ?? {},
        };
    }

    // FlatCommandConfig
    const flatOptions = options as FlatCommandOptions<T>;
    return {
        type: 'flat',
        ...config,
        options: flatOptions.options ?? ({} as T),
        execute: flatOptions.execute,
    };
}
