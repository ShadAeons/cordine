import {
    Client,
    ClientEvents,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder,
<<<<<<< HEAD
} from 'discord.js';
import { CommandConfig } from '../types/Command.js';
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
=======
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { CommandConfig, CommandEntry } from '../types/command.js';
import { Options } from '../types/options.js';
import { EventConfig } from '../types/event.js';
import { AnySubcommandConfig } from '../types/subcommand.js';
import { SubcommandGroupConfig } from '../types/subcommand-group.js';

export class Registry {
    public build<T extends Record<string, Options>>(config: CommandConfig<T>) {
        let builder:
            | SlashCommandBuilder
            | SlashCommandOptionsOnlyBuilder
            | SlashCommandSubcommandsOnlyBuilder = new SlashCommandBuilder()
            .setName(config.name)
            .setDescription(config.description);

        switch (config.type) {
            case 'flat':
                builder = this.registerOptions(
                    builder as
                        | SlashCommandBuilder
                        | SlashCommandOptionsOnlyBuilder,
                    config.options
                ) as SlashCommandOptionsOnlyBuilder;
                break;

            case 'subs':
                builder = this.registerEntries(
                    builder as
                        | SlashCommandBuilder
                        | SlashCommandSubcommandsOnlyBuilder,
                    config.entries
                ) as SlashCommandSubcommandsOnlyBuilder;
                break;
        }

        return builder.toJSON();
    }

    private registerEntries(
        builder:
            | SlashCommandBuilder
            | SlashCommandSubcommandsOnlyBuilder
            | SlashCommandSubcommandGroupBuilder,
        entries: Record<string, CommandEntry>
    ) {
        for (const [name, entry] of Object.entries(entries)) {
            if (entry.type === 'group')
                builder = this.registerGroup(
                    builder as
                        | SlashCommandBuilder
                        | SlashCommandSubcommandsOnlyBuilder,
                    name,
                    entry
                );
            else builder = this.registerSubcommand(builder, name, entry);
        }

        return builder;
    }

    private registerGroup(
        builder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder,
        name: string,
        group: SubcommandGroupConfig
    ) {
        return builder.addSubcommandGroup(
            (g) =>
                this.registerSubcommands(
                    g.setName(name).setDescription(group.description),
                    group.subcommands
                ) as SlashCommandSubcommandGroupBuilder
        );
    }

    private registerSubcommands(
        builder:
            | SlashCommandBuilder
            | SlashCommandSubcommandsOnlyBuilder
            | SlashCommandSubcommandGroupBuilder,
        subcommands: Record<string, AnySubcommandConfig>
    ) {
        for (const [name, entry] of Object.entries(subcommands)) {
            builder = this.registerSubcommand(builder, name, entry);
        }

        return builder;
    }

    private registerSubcommand(
        builder:
            | SlashCommandBuilder
            | SlashCommandSubcommandsOnlyBuilder
            | SlashCommandSubcommandGroupBuilder,
        name: string,
        subcommand: AnySubcommandConfig
    ) {
        return builder.addSubcommand(
            (sub) =>
                this.registerOptions(
                    sub.setName(name).setDescription(subcommand.description),
                    subcommand.options
                ) as SlashCommandSubcommandBuilder
        );
    }

    private registerOptions(
        builder:
            | SlashCommandBuilder
            | SlashCommandOptionsOnlyBuilder
            | SlashCommandSubcommandBuilder,
        options: Record<string, Options>
    ) {
        for (const [name, option] of Object.entries(options)) {
            builder = this.registerOption(builder, name, option);
        }

        return builder;
    }

    private registerOption(
        builder:
            | SlashCommandBuilder
            | SlashCommandOptionsOnlyBuilder
            | SlashCommandSubcommandBuilder,
        name: string,
        option: Options
    ) {
>>>>>>> develop
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
<<<<<<< HEAD
    }

    return builder.toJSON();
}

export function registerEvent<T extends EventName>(
=======

        return builder;
    }
}

export function registerEvent<T extends keyof ClientEvents>(
>>>>>>> develop
    client: Client,
    event: EventConfig<T>
) {
    const listener = (...args: ClientEvents[T]) => {
        event.execute(...args);
    };

    if (event.once) client.once(event.name, listener);
    else client.on(event.name, listener);
}
