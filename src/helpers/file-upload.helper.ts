import { extname } from 'path';
import { unlink } from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Allowed file extensions for images
export let allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

// Allowed file extensions for documents
export let allowedDocumentExtensions = ['.pdf', '.doc', '.docx', '.txt'];

// Maximum file size limit (5MB)
export let fileSizeLimit = 5 * 1024 * 1024; // 5MB

/**
 * File filter function to validate file extensions.
 * @param req - The request object.
 * @param file - The file object.
 * @param callback - The callback function.
 */
export const fileFilter = (req, file, callback) => {
  const fileExtension = extname(file.originalname).toLowerCase();
  const allowedExtensions = [
    ...allowedImageExtensions,
    ...allowedDocumentExtensions,
  ];

  if (!allowedExtensions.includes(fileExtension)) {
    return callback(new Error('Invalid file type'), false);
  }
  callback(null, true);
};

/**
 * Generates a default file name with a random UUID.
 * @param req - The request object.
 * @param file - The file object.
 * @param callback - The callback function.
 */
export const defaultFileName = (req, file, callback) => {
  const fileExtension = extname(file.originalname).toLowerCase();
  const randomName = `${uuidv4()}${fileExtension}`;
  callback(null, randomName);
};

/**
 * Deletes a file from the file system.
 * @param filePath - The path to the file to be deleted.
 * @param callback - The callback function.
 */
export const deleteFile = (filePath: string, callback) => {
  unlink(filePath, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};
