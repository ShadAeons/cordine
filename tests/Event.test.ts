import { describe, expect, it, vi } from 'vitest';
import { defineEvent } from '../src/types/Event';

describe('Event', () => {
    it('should create an EventConfig', () => {
        const execute = vi.fn();

        const event = defineEvent('clientReady', {
            execute,
        });

        expect(event.name).toBe('clientReady');
        expect(event.once).toBeUndefined();
        expect(event.execute).toBe(execute);
    });
});
