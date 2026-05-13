import { BaseConfig } from './base.js';
import { AnySubcommandConfig } from './subcommand.js';

export interface SubcommandGroupConfig extends BaseConfig {
    subcommands: Record<string, AnySubcommandConfig>;
}

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
    options: SubcommandGroupConfig
): SubcommandGroupConfig {
    return options;
}
