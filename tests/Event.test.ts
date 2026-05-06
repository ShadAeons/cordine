import { describe, expect, it, vi } from 'vitest';
import { defineEvent } from '../src/types/Event';

describe('Event', () => {
    it('should create an EventConfig', () => {
        const execute = vi.fn();

        const event = defineEvent('clientReady', {
            once: true,
            execute,
        });

        expect(event.name).toBe('clientReady');
        expect(event.once).toBeTruthy();
        expect(event.execute).toBe(execute);
    });

    it('should fall back to default values', () => {
        const event = defineEvent('clientReady', {
            execute: vi.fn(),
        });

        expect(event.once).toBeFalsy();
    });
});
