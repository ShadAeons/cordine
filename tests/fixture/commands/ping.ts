import { defineCommand } from '../../../src/types/Command';

export default defineCommand('ping', {
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
});
