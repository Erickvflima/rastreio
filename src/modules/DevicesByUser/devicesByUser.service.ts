import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BindDeviceDto } from './dto/bind-device.dto';
import { handleError } from '@common/errors/handle-error.util';
import { IApiResponse } from '@interface/baseResponse';
import { DevicesByUser } from './devicesByUser.entity';
import { User } from '@modules/User/user.entity';
import { Device } from '@modules/Device/device.entity';

@Injectable()
export class DevicesByUserService {
  constructor(
    @InjectRepository(DevicesByUser)
    private readonly repo: Repository<DevicesByUser>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  async bind(dto: BindDeviceDto): Promise<IApiResponse<DevicesByUser>> {
    try {
      const user = await this.userRepo.findOne({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('Usuário não encontrado');

      const device = await this.deviceRepo.findOne({
        where: { id: dto.deviceId },
      });
      if (!device) throw new NotFoundException('Dispositivo não encontrado');

      const relation = this.repo.create({ user, device });
      const saved = await this.repo.save(relation);

      return {
        status: 'success',
        message: 'Dispositivo vinculado ao usuário',
        data: saved,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao vincular dispositivo');
    }
  }

  async existsByUserAndDevice(
    userId: number,
    serial: string,
  ): Promise<boolean> {
    const exists = await this.repo.exists({
      where: {
        user: { id: userId },
        device: { serial: serial },
      },
    });

    return exists;
  }
}
