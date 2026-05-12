import {
    Attachment,
    ChannelType,
    GuildChannel,
    GuildMember,
    Role,
    User,
} from 'discord.js';

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
    | StringOption
    | NumberOption
    | IntegerOption
    | BooleanOption
    | UserOption
    | RoleOption
    | MentionableOption
    | ChannelOption
    | AttachmentOption;

/**
 * Represents a string option for a slash command.
 * Use {@link StringOption} to create one.
 */
export type StringOption = {
    type: 'string';
    required?: boolean;
    description: string;
    autocomplete?: boolean;
    minLength?: number;
    maxLength?: number;
    choices?: { name: string; value: string }[];
};

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
export function StringOption(
    config?: Omit<StringOption, 'type'>
): StringOption {
    return {
        type: 'string',
        ...config,
        description: config?.description ?? 'Default string option description',
    };
}

/**
 * Represents a number option for a slash command.
 * Use {@link NumberOption} to create one.
 */
export type NumberOption = {
    type: 'number';
    required?: boolean;
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
export function NumberOption(
    config?: Omit<NumberOption, 'type'>
): NumberOption {
    return {
        type: 'number',
        ...config,
        description: config?.description ?? 'Default number option description',
    };
}

/**
 * Represents a integer option for a slash command.
 * Use {@link IntegerOption} to create one.
 */
export type IntegerOption = {
    type: 'integer';
    required?: boolean;
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
    config?: Omit<IntegerOption, 'type'>
): IntegerOption {
    return {
        type: 'integer',
        ...config,
        description:
            config?.description ?? 'Default integer option description',
    };
}

/**
 * Represents a boolean option for a slash command.
 * Use {@link BooleanOption} to create one.
 */
export type BooleanOption = {
    type: 'boolean';
    required?: boolean;
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
    config?: Omit<BooleanOption, 'type'>
): BooleanOption {
    return {
        type: 'boolean',
        ...config,
        description:
            config?.description ?? 'Default boolean option description',
    };
}

/**
 * Represents a user option for a slash command.
 * Use {@link UserOption} to create one.
 */
export type UserOption = {
    type: 'user';
    required?: boolean;
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
export function UserOption(config?: Omit<UserOption, 'type'>): UserOption {
    return {
        type: 'user',
        ...config,
        description: config?.description ?? 'Default user option description',
    };
}

/**
 * Represents a role option for a slash command.
 * Use {@link RoleOption} to create one.
 */
export type RoleOption = {
    type: 'role';
    required?: boolean;
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
export function RoleOption(config?: Omit<RoleOption, 'type'>): RoleOption {
    return {
        type: 'role',
        ...config,
        description: config?.description ?? 'Default role option description',
    };
}

/**
 * Represents a mentionable option for a slash command.
 * Use {@link MentionableOption} to create one.
 */
export type MentionableOption = {
    type: 'mentionable';
    required?: boolean;
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
    config?: Omit<MentionableOption, 'type'>
): MentionableOption {
    return {
        type: 'mentionable',
        ...config,
        description:
            config?.description ?? 'Default mentionable option description',
    };
}

/**
 * Represents a channel option for a slash command.
 * Use {@link ChannelOption} to create one.
 */
export type ChannelOption = {
    type: 'channel';
    required?: boolean;
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
    config?: Omit<ChannelOption, 'type'>
): ChannelOption {
    return {
        type: 'channel',
        ...config,
        description:
            config?.description ?? 'Default channel option description',
    };
}

/**
 * Represents a attachment option for a slash command.
 * Use {@link AttachmentOption} to create one.
 */
export type AttachmentOption = {
    type: 'attachment';
    required?: boolean;
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
    config?: Omit<AttachmentOption, 'type'>
): AttachmentOption {
    return {
        type: 'attachment',
        ...config,
        description:
            config?.description ?? 'Default attachment option description',
    };
}
