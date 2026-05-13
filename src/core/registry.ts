import {
    Client,
    ClientEvents,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { CommandConfig } from '../types/command.js';
import { Options } from '../types/options.js';
import { EventConfig } from '../types/event.js';
import { AnySubcommandConfig } from '../types/subcommand.js';
import { SubcommandGroupConfig } from '../types/subcommand-group.js';

export function buildSlashCommand<T extends Record<string, Options>>(
    config: CommandConfig<T>
) {
    let builder:
        | SlashCommandBuilder
        | SlashCommandOptionsOnlyBuilder
        | SlashCommandSubcommandsOnlyBuilder = new SlashCommandBuilder()
        .setName(config.name)
        .setDescription(config.description);

    if (config.type === 'subs') {
        builder = registerAllSubcommandGroups(
            builder as SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder,
            config.groups
        );

        builder = registerAllSubcommands(
            builder as SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder,
            config.subcommands
        ) as SlashCommandSubcommandsOnlyBuilder;
    } else {
        builder = registerAllOptions(
            builder as SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
            config.options
        ) as SlashCommandOptionsOnlyBuilder;
    }

    return builder.toJSON();
}

function registerAllSubcommandGroups(
    builder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder,
    groups: Record<string, SubcommandGroupConfig>
) {
    for (const [name, group] of Object.entries(groups)) {
        builder = registerSubcommandGroup(builder, name, group);
    }
    return builder;
}

function registerSubcommandGroup(
    builder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder,
    name: string,
    group: SubcommandGroupConfig
) {
    return builder.addSubcommandGroup(
        (g) =>
            registerAllSubcommands(
                g.setName(name).setDescription(group.description),
                group.subcommands
            ) as SlashCommandSubcommandGroupBuilder
    );
}

function registerAllSubcommands(
    builder:
        | SlashCommandBuilder
        | SlashCommandSubcommandsOnlyBuilder
        | SlashCommandSubcommandGroupBuilder,
    subcommands: Record<string, AnySubcommandConfig>
) {
    for (const [name, subcommand] of Object.entries(subcommands)) {
        builder = registerSubcommand(builder, name, subcommand);
    }
    return builder;
}

function registerSubcommand(
    builder:
        | SlashCommandBuilder
        | SlashCommandSubcommandsOnlyBuilder
        | SlashCommandSubcommandGroupBuilder,
    name: string,
    subcommand: AnySubcommandConfig
) {
    return builder.addSubcommand(
        (sub) =>
            registerAllOptions(
                sub.setName(name).setDescription(subcommand.description),
                subcommand.options
            ) as SlashCommandSubcommandBuilder
    );
}

function registerAllOptions(
    builder:
        | SlashCommandBuilder
        | SlashCommandOptionsOnlyBuilder
        | SlashCommandSubcommandBuilder,
    options: Record<string, Options>
) {
    for (const [name, option] of Object.entries(options)) {
        builder = registerOption(builder, name, option);
    }
    return builder;
}

function registerOption(
    builder:
        | SlashCommandBuilder
        | SlashCommandOptionsOnlyBuilder
        | SlashCommandSubcommandBuilder,
    name: string,
    option: Options
) {
    switch (option.type) {
        case 'string':
            builder = builder.addStringOption((opt) => {
                opt = opt
                    .setName(name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? false);

                if (option.autocomplete)
                    opt = opt.setAutocomplete(option.autocomplete);
                if (option.minLength) opt = opt.setMinLength(option.minLength);
                if (option.maxLength) opt = opt.setMaxLength(option.maxLength);
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

    return builder;
}

export function registerEvent<T extends keyof ClientEvents>(
    client: Client,
    event: EventConfig<T>
) {
    const listener = (...args: ClientEvents[T]) => {
        event.execute(...args);
    };

    if (event.once) client.once(event.name, listener);
    else client.on(event.name, listener);
}
