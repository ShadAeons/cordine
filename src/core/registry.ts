import {
    Client,
    ClientEvents,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder,
} from 'discord.js';
import { CommandConfig } from '../types/command.js';
import { Options } from '../types/Options.js';
import { EventConfig, EventName } from '../types/Event.js';

export function buildSlashCommand<T extends Record<string, Options>>(
    config: CommandConfig<T>
) {
    let builder: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder =
        new SlashCommandBuilder()
            .setName(config.name)
            .setDescription(config.description);

    // register all option in the slash command builder
    for (const [name, option] of Object.entries(config.options)) {
        switch (option.type) {
            case 'string':
                builder = builder.addStringOption((opt) => {
                    opt = opt
                        .setName(name)
                        .setDescription(option.description)
                        .setRequired(option.required ?? false);

                    if (option.autocomplete)
                        opt = opt.setAutocomplete(option.autocomplete);
                    if (option.minLength)
                        opt = opt.setMinLength(option.minLength);
                    if (option.maxLength)
                        opt = opt.setMaxLength(option.maxLength);
                    if (option.choices) opt = opt.addChoices(...option.choices);

                    return opt;
                });
                break;

            case 'number':
                builder = builder.addNumberOption((opt) => {
                    opt = opt
                        .setName(name)
                        .setDescription(option.description)
                        .setRequired(option.required ?? false);

                    if (option.autocomplete)
                        opt = opt.setAutocomplete(option.autocomplete);
                    if (option.minValue) opt = opt.setMinValue(option.minValue);
                    if (option.maxValue) opt = opt.setMaxValue(option.maxValue);
                    if (option.choices) opt = opt.addChoices(...option.choices);

                    return opt;
                });
                break;

            case 'integer':
                builder = builder.addIntegerOption((opt) => {
                    opt = opt
                        .setName(name)
                        .setDescription(option.description)
                        .setRequired(option.required ?? false);

                    if (option.autocomplete)
                        opt = opt.setAutocomplete(option.autocomplete);
                    if (option.minValue) opt = opt.setMinValue(option.minValue);
                    if (option.maxValue) opt = opt.setMaxValue(option.maxValue);
                    if (option.choices) opt = opt.addChoices(...option.choices);

                    return opt;
                });
                break;

            case 'boolean':
                builder = builder.addBooleanOption((opt) =>
                    opt
                        .setName(name)
                        .setDescription(option.description)
                        .setRequired(option.required ?? false)
                );
                break;

            case 'user':
                builder = builder.addUserOption((opt) =>
                    opt
                        .setName(name)
                        .setDescription(option.description)
                        .setRequired(option.required ?? false)
                );
                break;

            case 'role':
                builder = builder.addRoleOption((opt) =>
                    opt
                        .setName(name)
                        .setDescription(option.description)
                        .setRequired(option.required ?? false)
                );
                break;

            case 'mentionable':
                builder = builder.addMentionableOption((opt) =>
                    opt
                        .setName(name)
                        .setDescription(option.description)
                        .setRequired(option.required ?? false)
                );
                break;

            case 'channel':
                builder = builder.addChannelOption((opt) => {
                    opt = opt
                        .setName(name)
                        .setDescription(option.description)
                        .setRequired(opt.required ?? false);

                    if (option.channelTypes)
                        opt = opt.addChannelTypes(...option.channelTypes);

                    return opt;
                });
                break;
        }
    }

    return builder.toJSON();
}

export function registerEvent<T extends EventName>(
    client: Client,
    event: EventConfig<T>
) {
    const listener = (...args: ClientEvents[T]) => {
        event.execute(...args);
    };

    if (event.once) client.once(event.name, listener);
    else client.on(event.name, listener);
}
