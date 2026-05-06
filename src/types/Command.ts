import { ChatInputCommandInteraction } from 'discord.js';
import { Options, ResolveOptions } from './Options.js';

type CommandOptionParams = Record<string, Options>;
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

export interface CommandConfig<T extends CommandOptionParams> {
    name: string;
    description: string;
    options: T;
    execute: CommandExecuteFunc<T>;
}

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
