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

export type StringOption = {
    type: 'string';
    required?: boolean;
    description: string;
    autocomplete?: boolean;
    minLength?: number;
    maxLength?: number;
    choices?: { name: string; value: string }[];
};

export function StringOption(
    config?: Omit<StringOption, 'type'>
): StringOption {
    return {
        type: 'string',
        ...config,
        description: config?.description ?? 'Default string option description',
    };
}

export type NumberOption = {
    type: 'number';
    required?: boolean;
    description: string;
    autocomplete?: boolean;
    minValue?: number;
    maxValue?: number;
    choices?: { name: string; value: number }[];
};

export function NumberOption(
    config?: Omit<NumberOption, 'type'>
): NumberOption {
    return {
        type: 'number',
        ...config,
        description: config?.description ?? 'Default number option description',
    };
}

export type IntegerOption = {
    type: 'integer';
    required?: boolean;
    description: string;
    autocomplete?: boolean;
    minValue?: number;
    maxValue?: number;
    choices?: { name: string; value: number }[];
};

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

export type BooleanOption = {
    type: 'boolean';
    required?: boolean;
    description: string;
};

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

export type UserOption = {
    type: 'user';
    required?: boolean;
    description: string;
};

export function UserOption(config?: Omit<UserOption, 'type'>): UserOption {
    return {
        type: 'user',
        ...config,
        description: config?.description ?? 'Default user option description',
    };
}

export type RoleOption = {
    type: 'role';
    required?: boolean;
    description: string;
};

export function RoleOption(config?: Omit<RoleOption, 'type'>): RoleOption {
    return {
        type: 'role',
        ...config,
        description: config?.description ?? 'Default role option description',
    };
}

export type MentionableOption = {
    type: 'mentionable';
    required?: boolean;
    description: string;
};

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

export type AttachmentOption = {
    type: 'attachment';
    required?: boolean;
    description: string;
};

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
