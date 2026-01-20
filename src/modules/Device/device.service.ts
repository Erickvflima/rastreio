import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

import { handleError } from '@common/errors/handle-error.util';
import { IApiResponse } from '@interface/baseResponse';
import { CreateDeviceDto } from './dbo/create-device.dto';
import { UpdateDeviceDto } from './dbo/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly repo: Repository<Device>,
  ) {}

  async create(dto: CreateDeviceDto): Promise<IApiResponse<Device>> {
    try {
      const device = this.repo.create(dto);
      const saved = await this.repo.save(device);

      return {
        status: 'success',
        message: 'Dispositivo criado com sucesso',
        data: saved,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao criar dispositivo');
    }
  }

  async findAll(): Promise<IApiResponse<Device[]>> {
    try {
      const devices = await this.repo.find();
      return {
        status: 'success',
        message: 'Lista de dispositivos',
        data: devices,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao listar dispositivos');
    }
  }

  async findById(id: number): Promise<IApiResponse<Device>> {
    try {
      const device = await this.repo.findOne({ where: { id } });
      if (!device) {
        throw new NotFoundException('Dispositivo não encontrado');
      }

      return {
        status: 'success',
        message: 'Dispositivo encontrado',
        data: device,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao buscar dispositivo');
    }
  }

  async update(
    id: number,
    dto: UpdateDeviceDto,
  ): Promise<IApiResponse<Device>> {
    try {
      const device = await this.repo.findOne({ where: { id } });
      if (!device) {
        throw new NotFoundException('Dispositivo não encontrado');
      }

      Object.assign(device, dto);
      const saved = await this.repo.save(device);

      return {
        status: 'success',
        message: 'Dispositivo atualizado',
        data: saved,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao atualizar dispositivo');
    }
  }
}
