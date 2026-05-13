import { ChatInputCommandInteraction } from 'discord.js';
import { Options, ResolveOptions } from './options.js';

export interface BaseConfig {
    description: string;
}

export interface BaseCommandConfig extends BaseConfig {
    name: string;
}

export type CommandExecuteFunction<T extends Record<string, Options>> = (
    interaction: ChatInputCommandInteraction,
    ...options: [ResolveOptions<T>]
) => Promise<void>;

export interface Executable<T extends Record<string, Options>> {
    options: T;
    execute: CommandExecuteFunction<T>;
}
