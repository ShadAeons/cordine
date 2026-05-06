import { ChatInputCommandInteraction } from 'discord.js';
import { Options, ResolveOptions } from './Options.js';

type CommandOptionParams = Record<string, Options>;

/**
 * Any valid slash command definition regardless of the specific option parameters.
 */
export type AnyCommandConfig = CommandConfig<CommandOptionParams>;

type CommandExecuteFunc<T extends CommandOptionParams> = (
    interaction: ChatInputCommandInteraction,
    options: ResolveOptions<T>
) => Promise<void>;

interface CommandOptions<T extends CommandOptionParams> {
    description?: string;
    options?: T;
    execute: CommandExecuteFunc<T>;
}

/**
 * Represents a fully resolved slash command definition.
 */
export interface CommandConfig<T extends CommandOptionParams> {
    name: string;
    description: string;
    options: T;
    execute: CommandExecuteFunc<T>;
}

/**
 * Creates a slash command with typed options.
 * If no description is provided, it defaults to 'Default command description'.
 *
 * @example
 * const ping = defineCommand('ping', {
 *     description: 'Pings a user!',
 *     options: { target: UserOption({ description: 'Target user to be pinged' }) },
 *     execute: async (interaction, { target }) => { ... }
 * });
 */
export function defineCommand<T extends CommandOptionParams>(
    name: string,
    options: CommandOptions<T>
): CommandConfig<T> {
    return {
        name,
        description: options.description ?? 'Default command description',
        options: options.options ?? ({} as T),
        execute: options.execute,
    };
}
