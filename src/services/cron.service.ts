import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanUnusedUploads() {
    try {
      const [movies, episodes, users] = await Promise.all([
        this.prisma.movie.findMany({ select: { source: true } }),
        this.prisma.episode.findMany({ select: { source: true } }),
        this.prisma.user.findMany({ select: { photo: true } }),
      ]);

      const usedFileNames = new Set<string>();

      for (const movie of movies) {
        if (movie.source) usedFileNames.add(path.basename(movie.source));
      }

      for (const episode of episodes) {
        if (episode.source) usedFileNames.add(path.basename(episode.source));
      }

      for (const user of users) {
        if (user.photo) usedFileNames.add(path.basename(user.photo));
      }

      const uploadsDir = path.resolve('uploads');
      if (!fs.existsSync(uploadsDir)) return;

      const uploadFiles = fs.readdirSync(uploadsDir);

      for (const file of uploadFiles) {
        if (!usedFileNames.has(file)) {
          const filePath = path.join(uploadsDir, file);
          try {
            fs.unlinkSync(filePath);
            this.logger.warn(`🗑️ Deleted unused file: ${file}`);
          } catch (error) {
            this.logger.error(
              `❌ Failed to delete file ${file}: ${error.message}`,
            );
          }
        }
      }
    } catch (error) {
      ServiceExceptions.handle(error, CronService.name, 'cleanUnusedUploads');
    }
  }
}
