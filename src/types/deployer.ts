import { APIApplicationCommand, REST, Routes } from 'discord.js';
import { AnyCommandConfig } from './command.js';
import { Registry } from '../core/registry.js';

/**
 * Provides methods for deploying slash commands to Discord.
 */
export interface DeployerConfig {
    deployToGuild: (
        guildId: string,
        commands: AnyCommandConfig[]
    ) => Promise<number>;
    deployToGlobal: (commands: AnyCommandConfig[]) => Promise<number>;
}

/**
 * Initialises a DeployerConfig.
 *
 * @example
 * const deployer = Deployer(token, clientId);
 * const n = await deployer.deployToGuild(guildId, commands);
 */
export function Deployer(token: string, clientId: string): DeployerConfig {
    const rest = new REST().setToken(token);

    const registry = new Registry();

    const buildCommands = (commands: AnyCommandConfig[]) =>
        commands.map((cmd) => registry.build(cmd));

    return {
        async deployToGuild(guildId, commands) {
            const body = buildCommands(commands);

            const data = (await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body }
            )) as APIApplicationCommand[];

            return data.length;
        },

        async deployToGlobal(commands) {
            const body = buildCommands(commands);

            const data = (await rest.put(Routes.applicationCommands(clientId), {
                body,
            })) as APIApplicationCommand[];

            return data.length;
        },
    };
}
