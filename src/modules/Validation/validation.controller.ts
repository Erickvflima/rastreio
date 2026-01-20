import { Public } from '@common/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Validation')
@Controller('validation')
export class ValidationController {
  @Public()
  @Get()
  @ApiOperation({
    summary: 'Validação da API',
    description: 'Endpoint para validar se a API Rastreio está ativa',
  })
  @ApiResponse({
    status: 200,
    description: 'API ativa',
    schema: {
      example: {
        status: 'success',
        message: 'Bem vindo a API Rastreio',
        document: {
          environment: 'development',
        },
      },
    },
  })
  getValidation() {
    return {
      status: 'success',
      message: 'Bem vindo a API Rastreio',
      document: {
        environment: process.env.NODE_ENV,
      },
    };
  }
}
