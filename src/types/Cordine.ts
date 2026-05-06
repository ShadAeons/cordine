import { Client, Collection, GatewayIntentBits, Interaction } from 'discord.js';
import { AnyEventConfig } from './Event.js';
import { AnyCommandConfig } from './Command.js';
import { fetchInteractionOptions } from '../core/context.js';
import { registerEvent } from '../core/registry.js';

interface CordineOptions {
    intents: GatewayIntentBits[];
    events?: AnyEventConfig[];
    commands?: AnyCommandConfig[];
}

/**
 * Creates a Discord.js Client instance with registered events and a command
 * handler.
 *
 * @example
 * const client = createClient({
 *     intents: [GatewayIntentBits.Guilds],
 *     events: [readyEvent],
 *     commands: [pingCommand]
 * });
 */
export function createClient(options: CordineOptions) {
    const client = new Client({
        intents: options.intents,
    });

    // Setup command handler
    const commands = new Collection<string, AnyCommandConfig>();
    options.commands?.forEach((cmd) => commands.set(cmd.name, cmd));

    client.on('interactionCreate', (interaction) =>
        handleCommand(interaction, commands)
    );

    // Register events
    options.events?.forEach((event) => {
        registerEvent(client, event);
    });

    return client;
}

async function handleCommand(
    interaction: Interaction,
    commands: Collection<string, AnyCommandConfig>
) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) {
        console.error(`${interaction.commandName} not a valid command`);
        return;
    }

    try {
        const options = fetchInteractionOptions(interaction, command.options);
        await command.execute(interaction, options);
    } catch (err) {
        console.error(err);
    }
}
