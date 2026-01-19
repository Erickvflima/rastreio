import { IApiResponse } from '@interface/baseResponse';
import { Controller, Get } from '@nestjs/common';

@Controller('validation')
export class ValidationController {
  @Get('')
  getValidation(): IApiResponse {
    return {
      status: 'success',
      message: 'Bem vindo a API Rastreio',
      document: {
        environment: process.env.NODE_ENV,
      },
    };
  }
}
