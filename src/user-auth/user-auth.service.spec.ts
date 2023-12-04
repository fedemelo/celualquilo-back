import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthService } from './user-auth.service';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';

describe('UserAuthService', () => {
    let authService: UserAuthService;
    let roleGuard: RoleGuard;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserAuthService, RoleGuard],
        }).compile();

        authService = module.get<UserAuthService>(UserAuthService);
        roleGuard = module.get<RoleGuard>(RoleGuard);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
        expect(roleGuard).toBeDefined();
    });

    describe('findOne', () => {
        it('should return a user when a valid username is provided', async () => {
            const username = 'admin';
            const user = await authService.findOne(username);
            expect(user).toBeDefined();
            expect(user?.username).toEqual(username);
        });

        it('should return undefined when an invalid username is provided', async () => {
            const username = 'invalidUser';
            const user = await authService.findOne(username);
            expect(user).toBeUndefined();
        });
    });


    describe('RoleGuard', () => {
        it('should allow access when roles match', () => {
            const reflectorMock = {
                get: jest.fn(() => ['admin']),
            };

            const contextMock = {
                getHandler: jest.fn(),
                switchToHttp: jest.fn(() => ({
                    getRequest: jest.fn(() => ({
                        user: { roles: ['admin'] },
                    })),
                })),
            };

            const guard = new RoleGuard(reflectorMock as any);
            const canActivate = guard.canActivate(contextMock as any);
            expect(canActivate).toBeTruthy();
        });

        it('should deny access when roles do not match', () => {
            const reflectorMock = {
                get: jest.fn(() => ['admin']),
            };

            const contextMock = {
                getHandler: jest.fn(),
                switchToHttp: jest.fn(() => ({
                    getRequest: jest.fn(() => ({
                        user: { roles: ['user'] },
                    })),
                })),
            };

            const guard = new RoleGuard(reflectorMock as any);
            const canActivate = guard.canActivate(contextMock as any);
            expect(canActivate).toBeFalsy();
        });

        it('should allow access when no roles are specified', () => {
            const reflectorMock = {
                get: jest.fn(() => undefined),
            };

            const contextMock = {
                getHandler: jest.fn(),
                switchToHttp: jest.fn(() => ({
                    getRequest: jest.fn(() => ({
                        user: { roles: ['user'] },
                    })),
                })),
            };

            const guard = new RoleGuard(reflectorMock as any);
            const canActivate = guard.canActivate(contextMock as any);
            expect(canActivate).toBeTruthy();
        });

    });
});
