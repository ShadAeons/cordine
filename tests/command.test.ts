import { describe, expect, it, vi } from 'vitest';
import { defineCommand } from '../src/types/command';

describe('Command', () => {
    it('should create a CommandConfig', () => {
        const execute = vi.fn();
        const event = defineCommand('ping', {
            description: 'Ping command',
            options: {
                target: { type: 'user', description: 'Target user' },
            },
            execute,
        });

        expect(event.name).toBe('ping');
        expect(event.description).toBe('Ping command');
        expect(event.options.target).toMatchObject({
            type: 'user',
            description: 'Target user',
        });
        expect(event.execute).toBe(execute);
    });

    it('should fall back to default values', () => {
        const event = defineCommand('ping', {
            execute: vi.fn(),
        });

        expect(event.description).toBe('Default command description');
        expect(event.options).toMatchObject({});
    });
});
