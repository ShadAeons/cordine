import { defineEvent } from '../../../src/types/Event';

export default defineEvent('clientReady', {
    execute(client) {
        console.log(client.user);
    },
});
