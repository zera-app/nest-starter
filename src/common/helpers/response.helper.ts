import {
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

export class ResponseHelper {
  static success(
    data: any,
    message = 'Success',
    statusCode = HttpStatus.OK,
    status = 'success',
  ) {
    return {
      code: statusCode,
      status: status,
      message: message,
      data: data,
    };
  }

  static error(
    message = 'An error occurred',
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    throw new HttpException(
      {
        statusCode,
        message,
      },
      statusCode,
    );
  }

  static notFound(message = 'Resource not found') {
    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  static badRequest(message = 'Bad request') {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static responseError(error: any, res: Response): Response {
    console.log('====================================');
    console.log(error);
    console.log('====================================');

    if (error instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: 404,
        status: 'error',
        message: 'Data not found',
        data: null,
      });
    }

    if (error instanceof BadRequestException) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: 400,
        status: 'error',
        message: error.message,
        data: null,
      });
    }

    if (error instanceof HttpException) {
      return res.status(error.getStatus()).json({
        code: error.getStatus(),
        status: 'error',
        message: error.message,
        data: null,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: 500,
      status: 'error',
      message: error.message || 'Internal server error',
      data: null,
    });
  }

  static isNeedLog(error: any): boolean {
    return !(error instanceof HttpException);
  }

  // Add more methods as needed
}
