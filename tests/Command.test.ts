import { describe, expect, it, vi } from 'vitest';
import { defineCommand } from '../src/types/Command';

describe('Command', () => {
    it('should create a CommandConfig', () => {
        const execute = vi.fn();
        const event = defineCommand('ping', {
            execute,
        });

        expect(event.name).toBe('ping');
        expect(event.description).toBe('Default command description');
        expect(event.execute).toBe(execute);
    });
});
