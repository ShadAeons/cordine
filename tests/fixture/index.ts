import { Cordine } from '../../src/core/Cordine';
import { GatewayIntentBits } from 'discord.js';
import ready from './events/ready';

const token =
    'Nzc0OTM2Njc3OTg1ODEyNDkx.GRgPk-.djChZ3cqgCLsHd-J5sAtJ62DOdVthbLzNnv_iY';
const client = Cordine({
    token,
    intents: [GatewayIntentBits.Guilds],
    events: [ready],
});

(async () => {
    await client.login(token);
})();
