import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ResponseHelper } from './common/helpers/response.helper';
import { Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';

class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getAppName(@Res() res: Response): Response {
    try {
      const appName = this.configService.get<string>('APP_NAME');
      return res
        .status(200)
        .json(ResponseHelper.success(appName, `Welcome to the API ${appName}`));
    } catch (error) {
      return ResponseHelper.responseError(error, res);
    }
  }

  @Get('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() loginDto: LoginDto, @Res() res: Response): Response {
    try {
      const { email, password } = loginDto;
      // Perform login logic here
      return res
        .status(200)
        .json(ResponseHelper.success({ email }, 'Login successful'));
    } catch (error) {
      return ResponseHelper.responseError(error, res);
    }
  }
}
