import { describe, expect, it, vi } from 'vitest';
import { Subcommand } from '../src/types/subcommand';

describe('Subcommand', () => {
    it('should create a SubcommandConfig', () => {
        const execute = vi.fn();
        const subcommand = Subcommand({
            description: 'Subcommand description',
            options: {
                opt: {
                    type: 'string',
                    required: false,
                    description: 'String option',
                },
            },
            execute,
        });

        expect(subcommand.type).toBe('subcommand');
        expect(subcommand.description).toBe('Subcommand description');
        expect(subcommand.options.opt).toMatchObject({
            type: 'string',
            required: false,
            description: 'String option',
        });
        expect(subcommand.execute).toBe(execute);
    });

    it('should fall back to default values', () => {
        const subcommand = Subcommand({
            description: 'Subcommand description',
            execute: vi.fn(),
        });

        expect(subcommand.options).toMatchObject({});
    });
});
