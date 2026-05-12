import { ChatInputCommandInteraction } from 'discord.js';
import { Options, ResolveOptions } from '../types/options.js';

export function fetchInteractionOptions<T extends Record<string, Options>>(
    interaction: ChatInputCommandInteraction,
    cmdOptions: T
): ResolveOptions<T> {
    const resolved = Object.entries(cmdOptions).map(([name, opt]) => {
        switch (opt.type) {
            case 'string':
                return [name, interaction.options.getString(name)];

            case 'number':
                return [name, interaction.options.getNumber(name)];

            case 'integer':
                return [name, interaction.options.getInteger(name)];

            case 'boolean':
                return [name, interaction.options.getBoolean(name)];

            case 'user':
                return [
                    name,
                    interaction.options.getMember(name) ||
                        interaction.options.getUser(name),
                ];

            case 'role':
                return [name, interaction.options.getRole(name)];

            case 'mentionable':
                return [name, interaction.options.getMentionable(name)];

            case 'channel':
                return [name, interaction.options.getChannel(name)];

            case 'attachment':
                return [name, interaction.options.getAttachment(name)];
        }
    });

    return Object.fromEntries(resolved) as ResolveOptions<T>;
}
