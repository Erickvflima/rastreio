import { HttpException, HttpStatus } from '@nestjs/common';
import { IApiResponse } from '@interface/baseResponse';

export function handleError(
  error: unknown,
  defaultMessage = 'Erro interno',
): HttpException {
  if (error instanceof HttpException) {
    const response: IApiResponse = {
      status: 'error',
      message: error.message,
    };

    return new HttpException(response, error.getStatus());
  }

  const response: IApiResponse = {
    status: 'error',
    message: defaultMessage,
  };

  return new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
}
