import { handleError } from '@common/errors/handle-error.util';
import { IApiResponse } from '@interface/baseResponse';
import { User } from '@modules/User/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(email: string): Promise<IApiResponse<User>> {
    try {
      const exists = await this.userRepo.findOne({ where: { email } });
      if (exists) {
        throw new BadRequestException('Usuário já existe');
      }

      const user = this.userRepo.create({ email });
      const saved = await this.userRepo.save(user);

      return {
        status: 'success',
        message: 'Usuário criado com sucesso',
        data: saved,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao criar usuário');
    }
  }

  async findByEmail(email: string): Promise<IApiResponse<User | null>> {
    try {
      const user = await this.userRepo.findOne({ where: { email } });

      return {
        status: 'success',
        message: user ? 'Usuário encontrado' : 'Usuário não encontrado',
        data: user,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao buscar usuário');
    }
  }
}
