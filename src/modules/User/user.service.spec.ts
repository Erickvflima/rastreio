import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({ email: 'test@email.com' });
      mockRepository.save.mockResolvedValue({
        id: 1,
        email: 'test@email.com',
      });

      const result = await service.create('test@email.com');

      expect(result.status).toBe('success');
      expect(result.data?.email).toBe('test@email.com');
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      mockRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'test@email.com',
      });

      await expect(service.create('test@email.com')).rejects.toThrow(
        HttpException,
      );

      await expect(service.create('test@email.com')).rejects.toMatchObject({
        response: {
          status: 'error',
          message: 'Usuário já existe',
        },
        status: 400,
      });
    });
  });

  describe('findByEmail', () => {
    it('should return user when found', async () => {
      mockRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'test@email.com',
      });

      const result = await service.findByEmail('test@email.com');

      expect(result.status).toBe('success');
      expect(result.data?.email).toBe('test@email.com');
    });

    it('should return null when user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('notfound@email.com');

      expect(result.status).toBe('success');
      expect(result.data).toBeNull();
    });
  });
});
