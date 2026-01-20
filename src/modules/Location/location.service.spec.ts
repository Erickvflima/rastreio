/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { TelemetryService } from '@modules/Telemetry/telemetry.service';
import { NotFoundException } from '@nestjs/common';

jest.mock('@common/errors/handle-error.util', () => ({
  handleError: jest.fn((err) => err),
}));

describe('LocationService', () => {
  let service: LocationService;
  let telemetryService: Partial<Record<keyof TelemetryService, jest.Mock>>;

  beforeEach(async () => {
    telemetryService = {
      findLastByDeviceId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        { provide: TelemetryService, useValue: telemetryService },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should return location if telemetry exists', async () => {
    const mockData = { deviceId: 123, latitude: -23, longitude: -46 };
    telemetryService.findLastByDeviceId?.mockResolvedValue({
      status: 'success',
      message: 'Telemetria encontrada',
      data: mockData,
    });

    const result = await service.findByDeviceId(123);

    expect(result).toEqual({
      status: 'success',
      message: 'Localização encontrada',
      data: mockData,
    });
    expect(telemetryService.findLastByDeviceId).toHaveBeenCalledWith(123);
  });

  it('should throw NotFoundException if telemetry does not exist', async () => {
    telemetryService.findLastByDeviceId?.mockResolvedValue({
      status: 'success',
      message: 'Nenhuma telemetria encontrada',
      data: null,
    });

    await expect(service.findByDeviceId(999)).rejects.toThrow(
      NotFoundException,
    );
    expect(telemetryService.findLastByDeviceId).toHaveBeenCalledWith(999);
  });

  it('should throw handleError if telemetryService throws', async () => {
    const error = new Error('DB error');
    telemetryService.findLastByDeviceId?.mockRejectedValue(error);

    await expect(service.findByDeviceId(123)).rejects.toThrow(error);
  });
});
