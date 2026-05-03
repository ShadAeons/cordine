import { describe, expect, it } from 'vitest';
// import { Cordine } from '../src/core/Cordine';
// import { GatewayIntentBits } from 'discord.js';
import { defineEvent } from '../src/types/Event';
import { Client } from 'discord.js';

// const token =
//     'Nzc0OTM2Njc3OTg1ODEyNDkx.GRgPk-.djChZ3cqgCLsHd-J5sAtJ62DOdVthbLzNnv_iY';

describe('Cordine', () => {
    it('should create an EventConfig', () => {
        const listener = (client: Client) => {
            console.log(client);
        };

        const event = defineEvent('clientReady', {
            execute: listener,
        });

        expect(event.name).toBe('clientReady');
        expect(event.once).toBeUndefined();
        expect(event.execute).toBe(listener);
    });
});
