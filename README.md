# cordine

A lightweight framework for discord.js that simplifies command and
event handling so you can focus on building your bot.

## Installation

```bash
npm install cordine
```

## Usage

### Creating a client

`createClient` creates a Discord.js Client instance with a command handler
already implemented. All events and commands will be registered and handled
automatically if passed in the `events` and `commands` fields respectively.

```typescript
import { createClient } from 'cordine';
import { GatewayIntentBits } from 'discord.js';

// createClient returns a regular Discord.js client
const client = createClient({
    intents: [GatewayIntentBits.Guilds],
    commands: [ping],
    events: [ready],
});

client.login('token');
```

### Defining a command

Slash commands are defined using `defineCommand`. The option types are inferred
automatically, so your `execute` function knows exactly what it receives.

```typescript
import { defineCommand, StringOption, UserOption } from 'cordine';

const ping = defineCommand('ping', {
    description: 'Ping a user!',
    options: {
        target: UserOption({ description: 'User to ping', required: true }),
        message: StringOption({ description: 'Optional message' }),
    },
    async execute(interaction, { target, message }) {
        await interaction.reply(`<@${target.id}> ${message ?? ''}`);
    },
});
```

### Defining an event

Use `defineEvent` to create an event listener for the Discord.js client.
Set `once: true` to only handle the event the first time it fires.

```typescript
import { defineEvent } from 'cordine';

const ready = defineEvent('clientReady', {
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is now online!`);
    },
});
```

### Deploying commands

The `Deployer` handles registering the slash commands with Discord's API.
Calling `deployToGuild` will register the commands in one specific server.

```typescript
import { Deployer } from 'cordine';

const deployer = Deployer('bot-token', 'client-id');
await deployer.deployToGuild('guild-id', [pingCommand]);
```

## Roadmap

### Commands

- Command permissions
- Subcommand and subcommand group support
- Message components
    - Buttons
    - Select menus
    - Modals

### Deployer

- Global command deployment

## License

This project is licensed under the [MIT License](LICENSE).
