import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Controller('files')
export class FileController {
  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    filename = filename.replace(/\$/g, '/');
    const filePath = join(process.cwd(), 'uploads', filename);

    try {
      await fs.promises.access(filePath);
      return res.sendFile(filePath);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: 404,
        status: 'error',
        message: 'File not found.',
      });
    }
  }
}
