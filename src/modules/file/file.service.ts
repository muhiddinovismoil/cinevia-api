import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class FileService {
  static generateStorage(prefix: 'photo' | 'media') {
    return diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const hash = randomBytes(16).toString('hex');
        const ext = extname(file.originalname);
        const filename = `${prefix}-${hash}${ext}`;
        cb(null, filename);
      },
    });
  }

  static photoUploadOptions() {
    return {
      storage: this.generateStorage('photo'),
      fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only image files allowed'), false);
      },
    };
  }

  static mediaUploadOptions() {
    return {
      storage: this.generateStorage('media'),
      fileFilter: (req, file, cb) => {
        const allowed = ['video/mp4', 'video/webm', 'video/x-matroska'];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only video files allowed'), false);
      },
    };
  }

  async uploadPhoto(file: Express.Multer.File) {
    return {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
    };
  }

  async uploadMedia(file: Express.Multer.File) {
    return {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
    };
  }
}
