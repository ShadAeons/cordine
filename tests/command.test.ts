import { describe, expect, it, vi } from 'vitest';
import { defineCommand } from '../src/types/command';

describe('Command', () => {
    it('should create a FlatCommandConfig', () => {
        const execute = vi.fn();
        const cmd = defineCommand('ping', {
            description: 'Ping command',
            options: {
                target: { type: 'user', description: 'Target user' },
            },
            execute,
        });

        expect(cmd.type).toBe('flat');
        expect(cmd.name).toBe('ping');
        expect(cmd.description).toBe('Ping command');
        expect(cmd.options.target).toMatchObject({
            type: 'user',
            description: 'Target user',
        });
        expect(cmd.execute).toBe(execute);
    });

    it('should create a SubcommandCommandConfig', () => {
        const execute = vi.fn();
        const cmd = defineCommand('ping', {
            description: 'Ping command',
            subcommands: {
                sub: { description: '', options: {}, execute },
            },
        });

        expect(cmd.type).toBe('subs');
        expect(cmd.name).toBe('ping');
        expect(cmd.description).toBe('Ping command');
        expect(cmd.subcommands.sub).toMatchObject({
            description: '',
            options: {},
            execute,
        });
    });
});
