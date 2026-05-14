import { describe, expect, it } from 'vitest';
import {
    AttachmentOption,
    MentionableOption,
    StringOption,
    UserOption,
} from '../src/types/options';

describe('Options', () => {
    it('should use provided description', () => {
        const option = StringOption({
            required: true,
            description: 'Test description',
        });

        expect(option.required).toBeTruthy();
        expect(option.description).toBe('Test description');
    });

    it('should fall back to default values', () => {
        const option = MentionableOption({ description: '' });

        expect(option.required).toBeFalsy();
    });

    it('should set the correct type', () => {
        expect(StringOption({ description: '' }).type).toBe('string');
        expect(UserOption({ description: '' }).type).toBe('user');
        expect(AttachmentOption({ description: '' }).type).toBe('attachment');
    });
});
