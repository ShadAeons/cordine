import {
    Attachment,
    ChannelType,
    GuildChannel,
    GuildMember,
    Role,
    User,
} from 'discord.js';
import { BaseConfig } from './base.js';

interface OptionTypeMap {
    string: string;
    number: number;
    integer: number;
    boolean: boolean;
    user: GuildMember | User;
    role: Role;
    mentionable: User | Role | GuildMember;
    channel: GuildChannel;
    attachment: Attachment;
}

export type ResolveOption<T extends Options> = T['required'] extends true
    ? OptionTypeMap[T['type']]
    : OptionTypeMap[T['type']] | null;

export type ResolveOptions<T extends Record<string, Options>> = {
    [K in keyof T]: ResolveOption<T[K]>;
};

export type Options =
    | StringOptionConfig
    | NumberOptionConfig
    | IntegerOptionConfig
    | BooleanOptionConfig
    | UserOptionConfig
    | RoleOptionConfig
    | MentionableOptionConfig
    | ChannelOptionConfig
    | AttachmentOptionConfig;

type StringOptionOptions = Omit<StringOptionConfig, 'type' | 'required'> & {
    required?: boolean;
};

/**
 * Represents a string option for a slash command.
 * Use {@link StringOption} to create one.
 */
export interface StringOptionConfig extends BaseConfig {
    type: 'string';
    required: boolean;
    autocomplete?: boolean;
    minLength?: number;
    maxLength?: number;
    choices?: { name: string; value: string }[];
}

/**
 * Defines a string option for a slash command.
 * If description is not provided, it defaults to 'Default string option description'.
 *
 * @example
 * StringOption({
 *     required: true,
 *     description: 'A colour',
 *     autocomplete: false,
 *     minLength: 2,
 *     maxLength: 32,
 *     choices: [{ name: 'Red', value: 'red' }, { name: 'Blue', value: 'blue' }],
 * });
 */
export function StringOption(options: StringOptionOptions): StringOptionConfig {
    return {
        type: 'string',
        ...options,
        required: options.required ?? false,
    };
}

type NumberOptionOptions = Omit<NumberOptionConfig, 'type' | 'required'> & {
    required?: boolean;
};

/**
 * Represents a number option for a slash command.
 * Use {@link NumberOptionConfig} to create one.
 */
export type NumberOptionConfig = {
    type: 'number';
    required: boolean;
    description: string;
    autocomplete?: boolean;
    minValue?: number;
    maxValue?: number;
    choices?: { name: string; value: number }[];
};

/**
 * Defines a number option for a slash command.
 * If description is not provided, it defaults to 'Default number option description'.
 *
 * @example
 * NumberOption({
 *     required: true,
 *     description: 'A percentage',
 *     minValue: 0,
 *     maxValue: 100
 * });
 */
export function NumberOption(options: NumberOptionOptions): NumberOptionConfig {
    return {
        type: 'number',
        ...options,
        required: options.required ?? false,
    };
}

type IntegerOptionOptions = Omit<IntegerOptionConfig, 'type' | 'required'> & {
    required?: boolean;
};

/**
 * Represents a integer option for a slash command.
 * Use {@link IntegerOptionConfig} to create one.
 */
export type IntegerOptionConfig = {
    type: 'integer';
    required: boolean;
    description: string;
    autocomplete?: boolean;
    minValue?: number;
    maxValue?: number;
    choices?: { name: string; value: number }[];
};

/**
 * Defines an integer option for a slash command.
 * If description is not provided, it defaults to 'Default integer option description'.
 *
 * @example
 * IntegerOption({
 *     required: true,
 *     description: 'A count',
 *     minValue: 1,
 *     maxValue: 10
 * });
 */
export function IntegerOption(
    options: IntegerOptionOptions
): IntegerOptionConfig {
    return {
        type: 'integer',
        ...options,
        required: options.required ?? false,
    };
}

type BooleanOptionOptions = Omit<BooleanOptionConfig, 'type' | 'required'> & {
    required?: boolean;
};

/**
 * Represents a boolean option for a slash command.
 * Use {@link BooleanOptionConfig} to create one.
 */
export type BooleanOptionConfig = {
    type: 'boolean';
    required: boolean;
    description: string;
};

/**
 * Defines a boolean option for a slash command.
 * If description is not provided, it defaults to 'Default boolean option description'.
 *
 * @example
 * BooleanOption({
 *     required: true,
 *     description: 'Yes or no'
 * });
 */
export function BooleanOption(
    options: BooleanOptionOptions
): BooleanOptionConfig {
    return {
        type: 'boolean',
        ...options,
        required: options.required ?? false,
    };
}

type UserOptionOptions = Omit<UserOptionConfig, 'type' | 'required'> & {
    required?: boolean;
};

/**
 * Represents a user option for a slash command.
 * Use {@link UserOptionConfig} to create one.
 */
export type UserOptionConfig = {
    type: 'user';
    required: boolean;
    description: string;
};

/**
 * Defines a user option for a slash command.
 * If description is not provided, it defaults to 'Default user option description'.
 *
 * @example
 * UserOption({
 *     required: true,
 *     description: 'Target user'
 * });
 */
export function UserOption(options: UserOptionOptions): UserOptionConfig {
    return {
        type: 'user',
        ...options,
        required: options.required ?? false,
    };
}

type RoleOptionOptions = Omit<RoleOptionConfig, 'type' | 'required'> & {
    required?: boolean;
};

/**
 * Represents a role option for a slash command.
 * Use {@link RoleOptionConfig} to create one.
 */
export type RoleOptionConfig = {
    type: 'role';
    required: boolean;
    description: string;
};

/**
 * Defines a role option for a slash command.
 * If description is not provided, it defaults to 'Default role option description'.
 *
 * @example
 * RoleOption({
 *     required: true,
 *     description: 'Target role'
 * });
 */
export function RoleOption(options: RoleOptionOptions): RoleOptionConfig {
    return {
        type: 'role',
        ...options,
        required: options.required ?? false,
    };
}

type MentionableOptionOptions = Omit<
    MentionableOptionConfig,
    'type' | 'required'
> & {
    required?: boolean;
};

/**
 * Represents a mentionable option for a slash command.
 * Use {@link MentionableOptionConfig} to create one.
 */
export type MentionableOptionConfig = {
    type: 'mentionable';
    required: boolean;
    description: string;
};

/**
 * Defines a mentionable option for a slash command.
 * If description is not provided, it defaults to 'Default mentionable option description'.
 *
 * @example
 * MentionableOption({
 *     required: true,
 *     description: 'Target mentionable'
 * });
 */
export function MentionableOption(
    options: MentionableOptionOptions
): MentionableOptionConfig {
    return {
        type: 'mentionable',
        ...options,
        required: options.required ?? false,
    };
}

type ChannelOptionOptions = Omit<ChannelOptionConfig, 'type' | 'required'> & {
    required?: boolean;
};

/**
 * Represents a channel option for a slash command.
 * Use {@link ChannelOptionConfig} to create one.
 */
export type ChannelOptionConfig = {
    type: 'channel';
    required: boolean;
    description: string;
    channelTypes?: (
        | ChannelType.GuildText
        | ChannelType.GuildVoice
        | ChannelType.GuildCategory
        | ChannelType.GuildAnnouncement
        | ChannelType.AnnouncementThread
        | ChannelType.PublicThread
        | ChannelType.PrivateThread
        | ChannelType.GuildStageVoice
        | ChannelType.GuildForum
        | ChannelType.GuildMedia
    )[];
};

/**
 * Defines a channel option for a slash command.
 * If description is not provided, it defaults to 'Default channel option description'.
 *
 * @example
 * ChannelOption({
 *     required: true,
 *     description: 'Target channel',
 *     channelTypes: [ ChannelType.GuildText ]
 * });
 */
export function ChannelOption(
    options: ChannelOptionOptions
): ChannelOptionConfig {
    return {
        type: 'channel',
        ...options,
        required: options.required ?? false,
    };
}

type AttachmentOptionOptions = Omit<
    AttachmentOptionConfig,
    'type' | 'required'
> & {
    required?: boolean;
};

/**
 * Represents a attachment option for a slash command.
 * Use {@link AttachmentOptionConfig} to create one.
 */
export type AttachmentOptionConfig = {
    type: 'attachment';
    required: boolean;
    description: string;
};

/**
 * Defines a attachment option for a slash command.
 * If description is not provided, it defaults to 'Default attachment option description'.
 *
 * @example
 * AttachmentOption({
 *     required: true,
 *     description: 'Image file'
 * });
 */
export function AttachmentOption(
    options: AttachmentOptionOptions
): AttachmentOptionConfig {
    return {
        type: 'attachment',
        ...options,
        required: options.required ?? false,
    };
}
