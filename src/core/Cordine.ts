import {
    Client,
    ClientEvents,
    Collection,
    GatewayIntentBits,
    Interaction,
} from 'discord.js';
import { EventConfig } from '../types/Event.js';
import { AnyCommandConfig, fetchInteractionOptions } from '../types/Command.js';

interface CordineOptions {
    token: string;
    intents: GatewayIntentBits[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events?: EventConfig<any>[];

    commands?: AnyCommandConfig[];
}

export function Cordine(options: CordineOptions) {
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

function registerEvent<T extends keyof ClientEvents>(
    client: Client,
    event: EventConfig<T>
) {
    const listener = (...args: ClientEvents[T]) => {
        event.execute(...args);
    };

    if (event.once) client.once(event.name, listener);
    else client.on(event.name, listener);
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
        console.log(options);
        await command.execute(interaction, options);
    } catch (err) {
        console.error(err);
    }
}
