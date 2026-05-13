import { BaseConfig } from './base.js';
import { AnySubcommandConfig } from './subcommand.js';

export interface SubcommandGroupConfig extends BaseConfig {
    subcommands: Record<string, AnySubcommandConfig>;
}

export function SubcommandGroup(
    options: SubcommandGroupConfig
): SubcommandGroupConfig {
    return options;
}
