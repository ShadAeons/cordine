import { APIApplicationCommand, REST, Routes } from 'discord.js';
import { AnyCommandConfig } from './Command.js';
import { buildSlashCommand } from '../core/registry.js';

interface DeployerConfig {
    deployToGuild: (
        guildId: string,
        commands: AnyCommandConfig[]
    ) => Promise<number>;
}

export function Deployer(token: string, clientId: string): DeployerConfig {
    const rest = new REST().setToken(token);

    return {
        async deployToGuild(guildId: string, commands: AnyCommandConfig[]) {
            const body = commands.map((cmd) => buildSlashCommand(cmd));

            const data = (await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body }
            )) as APIApplicationCommand[];

            return data.length;
        },
    };
}
