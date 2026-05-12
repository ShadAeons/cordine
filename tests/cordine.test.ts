import { describe, expect, it, Mock, vi } from 'vitest';
import { createClient } from '../src/types/cordine';
import { Client, GatewayIntentBits } from 'discord.js';

vi.mock('discord.js', async (importOriginal) => {
    const original = await importOriginal();

    return {
        ...(original as object),
        Client: vi.fn().mockImplementation(function (this: {
            on: Mock;
            once: Mock;
        }) {
            this.on = vi.fn();
            this.once = vi.fn();
        }),
    };
});

describe('Cordine', () => {
    it('should create a client and register the command handler', () => {
        const client = createClient({ intents: [GatewayIntentBits.Guilds] });

        expect(Client).toHaveBeenCalledWith({
            intents: [GatewayIntentBits.Guilds],
        });
        expect(client).toBeDefined();
        expect(client.on).toHaveBeenCalledWith(
            'interactionCreate',
            expect.any(Function)
        );
    });

    it('should register all events', () => {
        const client = createClient({
            intents: [],
            events: [
                { name: 'clientReady', once: true, execute: vi.fn() },
                { name: 'channelCreate', once: false, execute: vi.fn() },
                { name: 'messageDelete', once: false, execute: vi.fn() },
            ],
        });

        expect(client.once).toHaveBeenCalledWith(
            'clientReady',
            expect.any(Function)
        );
        expect(client.on).toHaveBeenCalledWith(
            'channelCreate',
            expect.any(Function)
        );
        expect(client.on).toHaveBeenCalledWith(
            'messageDelete',
            expect.any(Function)
        );
    });

    it('should handle commands on interactionCreate', async () => {
        const execute = vi.fn();
        const client = createClient({
            intents: [],
            commands: [
                {
                    name: 'ping',
                    description: '',
                    options: {},
                    execute,
                },
            ],
        });

        const calls = (client.on as Mock).mock.calls;
        const interactionCallback = calls.find(
            ([event]) => event === 'interactionCreate'
        )?.[1];

        const interaction = {
            isChatInputCommand: vi.fn().mockReturnValue(true),
            commandName: 'ping',
            options: {},
        };

        await interactionCallback(interaction);
        expect(execute).toHaveBeenCalled();
    });
});
