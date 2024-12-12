import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message: any = exception.getResponse();

    const validationErrors = Array.isArray(message.message)
      ? message.message
      : [message.message];

    const formattedErrors: Record<string, string[]> = {};

    validationErrors.forEach((error: string) => {
      const matches = error.match(/^([a-zA-Z]+)/);
      if (matches) {
        const field = matches[1].toLowerCase();
        if (!formattedErrors[field]) {
          formattedErrors[field] = [];
        }
        formattedErrors[field].push(error);
      }
    });

    response.status(422).json({
      code: 422,
      status: 'error',
      message: '',
      errors: formattedErrors,
    });
  }
}
