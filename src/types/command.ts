import { BaseCommandConfig, Executable } from './base.js';
import { Options } from './options.js';
import { SubcommandGroupConfig } from './subcommand-group.js';
import { AnySubcommandConfig } from './subcommand.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyCommandConfig = CommandConfig<any>;

export interface FlatCommandConfig<T extends Record<string, Options>>
    extends BaseCommandConfig, Executable<T> {
    type: 'flat';
}

export interface SubcommandCommandConfig extends BaseCommandConfig {
    type: 'subs';
    subcommands: Record<string, AnySubcommandConfig>;
    groups: Record<string, SubcommandGroupConfig>;
}

export type CommandConfig<T extends Record<string, Options>> =
    | FlatCommandConfig<T>
    | SubcommandCommandConfig;

type FlatCommandOptions<T extends Record<string, Options>> = Omit<
    FlatCommandConfig<T>,
    'name' | 'options' | 'type'
> & { options?: T };

type SubcommandCommandOptions = Omit<
    SubcommandCommandConfig,
    'name' | 'groups' | 'type'
> & { groups?: Record<string, SubcommandGroupConfig> };

type CommandOptions<T extends Record<string, Options>> =
    | FlatCommandOptions<T>
    | SubcommandCommandOptions;

export function defineCommand<T extends Record<string, Options>>(
    name: string,
    options: FlatCommandOptions<T>
): FlatCommandConfig<T>;

export function defineCommand(
    name: string,
    options: SubcommandCommandOptions
): SubcommandCommandConfig;

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

// import { ChatInputCommandInteraction } from 'discord.js';
// import { Options, ResolveOptions } from './options.js';

// type CommandOptionParams = Record<string, Options>;

// /**
//  * Any valid slash command definition regardless of the specific option parameters.
//  */
// export type AnyCommandConfig = CommandConfig<CommandOptionParams>;

// type CommandExecuteFunc<T extends CommandOptionParams> = (
//     interaction: ChatInputCommandInteraction,
//     options: ResolveOptions<T>
// ) => Promise<void>;

// interface CommandOptions<T extends CommandOptionParams> {
//     description?: string;
//     options?: T;
//     execute: CommandExecuteFunc<T>;
// }

// /**
//  * Represents a fully resolved slash command definition.
//  */
// export interface CommandConfig<T extends CommandOptionParams> {
//     name: string;
//     description: string;
//     options: T;
//     execute: CommandExecuteFunc<T>;
// }

// /**
//  * Creates a slash command with typed options.
//  * If no description is provided, it defaults to 'Default command description'.
//  *
//  * @example
//  * const ping = defineCommand('ping', {
//  *     description: 'Pings a user!',
//  *     options: { target: UserOption({ description: 'Target user to be pinged' }) },
//  *     execute: async (interaction, { target }) => { ... }
//  * });
//  */
// export function defineCommand<T extends CommandOptionParams>(
//     name: string,
//     options: CommandOptions<T>
// ): CommandConfig<T> {
//     return {
//         name,
//         description: options.description ?? 'Default command description',
//         options: options.options ?? ({} as T),
//         execute: options.execute,
//     };
// }
