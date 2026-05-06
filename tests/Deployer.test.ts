import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { Deployer, DeployerConfig } from '../src/types/Deployer';

const { mockPut } = vi.hoisted(() => ({
    mockPut: vi.fn(),
}));

vi.mock('discord.js', async (importOriginal) => {
    const actual = await importOriginal();

    return {
        ...(actual as object),
        REST: vi.fn().mockImplementation(function (this: {
            setToken: Mock;
            put: Mock;
        }) {
            this.setToken = vi.fn().mockReturnThis();
            this.put = mockPut;
        }),
    };
});

describe('Deployer', () => {
    let deployer: DeployerConfig;

    beforeEach(() => {
        deployer = Deployer('token', 'clientId');
        mockPut.mockReset();
    });

    it('returns the number of deployed commands', async () => {
        mockPut.mockResolvedValue([{ id: '1' }]);

        const result = await deployer.deployToGuild('guildId', [
            {
                name: 'ping',
                description: 'Ping!',
                execute: vi.fn(),
                options: {},
            },
        ]);

        expect(result).toBe(1);
    });

    it('calls the correct REST endpoint', async () => {
        mockPut.mockResolvedValue([{ id: '1' }]);

        await deployer.deployToGuild('guildId', [
            {
                name: 'ping',
                description: 'Ping!',
                execute: vi.fn(),
                options: {},
            },
        ]);

        expect(mockPut).toHaveBeenCalledWith(
            expect.stringContaining('guildId'),
            expect.objectContaining({ body: expect.any(Array) })
        );
    });

    it('returns 0 when no commands are deployed', async () => {
        mockPut.mockResolvedValue([]);

        const result = await deployer.deployToGuild('guildId', []);

        expect(result).toBe(0);
    });
});
