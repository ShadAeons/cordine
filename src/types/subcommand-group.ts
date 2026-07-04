import { BaseConfig } from './base.js';
import { AnySubcommandConfig } from './subcommand.js';

export interface SubcommandGroupConfig extends BaseConfig {
    type: 'group';
    subcommands: Record<string, AnySubcommandConfig>;
}

type SubcommandGroupOptions = Omit<SubcommandGroupConfig, 'type'>;

/**
 * Creates a slash command subcommand group.
 *
 * @example
 * SubcommandGroup('settings', {
 *     description: 'Group of subcommands related to settings',
 *     subcommands: { subname: Subcommand({ ... }) },
 *     execute: async (interaction, { value }) => { ... }
 * });
 */
export function SubcommandGroup(
    options: SubcommandGroupOptions
): SubcommandGroupConfig {
    return { type: 'group', ...options };
}
