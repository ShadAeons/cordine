import { describe, expect, it, vi } from 'vitest';
import { SubcommandGroup } from '../src/types/subcommand-group';

describe('SubcommandGroup', () => {
    it('should create a SubcommandGroupConfig', () => {
        const execute = vi.fn();
        const group = SubcommandGroup({
            description: 'Subcommand group description',
            subcommands: {
                sub: {
                    type: 'subcommand',
                    description: 'Subcommand description',
                    options: {},
                    execute,
                },
            },
        });

        expect(group.type).toBe('group');
        expect(group.description).toBe('Subcommand group description');
        expect(group.subcommands.sub).toMatchObject({
            type: 'subcommand',
            description: 'Subcommand description',
            options: {},
            execute,
        });
    });
});
