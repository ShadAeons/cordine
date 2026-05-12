import { describe, expect, it } from 'vitest';
import {
    AttachmentOption,
    StringOption,
    UserOption,
} from '../src/types/options';

describe('Options', () => {
    it('should use provided description', () => {
        const option = StringOption({ description: 'Test description' });
        expect(option.description).toBe('Test description');
    });

    it('should fall back to default description', () => {
        const option = StringOption();
        expect(option.description).toBe('Default string option description');
    });

    it('should set the correct type', () => {
        expect(StringOption().type).toBe('string');
        expect(UserOption().type).toBe('user');
        expect(AttachmentOption().type).toBe('attachment');
    });
});
