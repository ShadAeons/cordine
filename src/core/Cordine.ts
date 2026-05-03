import { Client, ClientEvents, GatewayIntentBits } from 'discord.js';
import { EventConfig } from '../types/Event.js';

interface CordineOptions {
    token: string;
    intents: GatewayIntentBits[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events?: EventConfig<any>[];
}

export function Cordine(options: CordineOptions) {
    const client = new Client({
        intents: options.intents,
    });

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
