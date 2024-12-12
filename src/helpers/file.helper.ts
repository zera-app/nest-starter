import { join } from 'path';
import { existsSync, createReadStream } from 'fs';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { Response } from 'express';

/**
 * Retrieves a file from the specified path.
 *
 * This function constructs the file path by joining the directory name with the 'uploads' directory
 * and replacing the '$' character in the provided path with '/'.
 * If the file does not exist at the constructed path, a `NotFoundException` is thrown.
 * Otherwise, a readable stream of the file is returned.
 *
 * @param path - The path to the file, with segments separated by the '$' character.
 * @returns A readable stream of the file.
 * @throws NotFoundException if the file does not exist at the constructed path.
 */
export async function getFile(filename: string, res: Response) {
  filename = filename.replace(/\$/g, '/');
  const filePath = join(process.cwd(), 'uploads', filename);

  try {
    await fs.promises.access(filePath);
    return res.sendFile(filePath);
  } catch (err) {
    return res.status(404).json({
      code: 404,
      status: 'error',
      message: 'File not found.',
    });
  }
}

/**
 * Generates a URL for the file response.
 * @param filename
 * @returns
 */
export function generateFileUrl(filename: string | null): string | null {
  return filename
    ? `${process.env.APP_URL}/response/${filename.replace(/[\\/]/g, '$')}`
    : null;
}

/**
 * Generates a public URL for the file response.
 * @param filename
 * @returns
 */
export function generatePublicFileUrl(filename: string | null): string | null {
  return filename
    ? `${process.env.APP_URL}/response/${filename.replace(/[\\/]/g, '$')}`
    : null;
}

/**
 * Generates a download URL for the file response.
 * @param filename
 * @returns
 */
export function generateDownloadUrl(filename: string | null): string | null {
  return filename
    ? `${process.env.APP_URL}/response/download/${filename.replace(/[\\/]/g, '$')}`
    : null;
}
