import { handleError } from '@common/errors/handle-error.util';
import { IApiResponse } from '@interface/baseResponse';
import { User } from '@modules/User/user.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(email: string): Promise<IApiResponse> {
    try {
      const exists = await this.userRepo.findOne({ where: { email } });
      if (exists) {
        throw new BadRequestException('Usuário já existe');
      }

      const user = this.userRepo.create({ email });
      await this.userRepo.save(user);

      return this.generateToken(user);
    } catch (error) {
      throw handleError(error, 'Erro ao realizar cadastro');
    }
  }

  async signin(email: string): Promise<IApiResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      return this.generateToken(user);
    } catch (error) {
      throw handleError(error, 'Erro ao realizar login');
    }
  }

  private generateToken(user: User): IApiResponse {
    try {
      const payload = { sub: user.id, email: user.email };

      return {
        status: 'success',
        message: 'Usuário autenticado com sucesso',
        data: {
          accessToken: this.jwtService.sign(payload),
        },
      };
    } catch {
      throw new UnauthorizedException('Erro ao gerar token JWT');
    }
  }
}
