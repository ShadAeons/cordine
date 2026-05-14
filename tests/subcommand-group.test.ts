import { describe, expect, it, vi } from 'vitest';
import { SubcommandGroup } from '../src/types/subcommand-group';

describe('SubcommandGroup', () => {
    it('should create a SubcommandGroupConfig', () => {
        const execute = vi.fn();
        const group = SubcommandGroup({
            description: 'Subcommand group description',
            subcommands: {
                sub: {
                    description: 'Subcommand description',
                    options: {},
                    execute,
                },
            },
        });

        expect(group.description).toBe('Subcommand group description');
        expect(group.subcommands.sub).toMatchObject({
            description: 'Subcommand description',
            options: {},
            execute,
        });
    });
});
