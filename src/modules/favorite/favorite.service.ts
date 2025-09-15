import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

import { CreateFavouriteDto } from './dto/request';

@Injectable()
export class FavouriteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: string, { movieId }: CreateFavouriteDto) {
    try {
      const isFavourited = await this.prisma.favorite.findFirst({
        where: { userId: id, movieId },
      });
      if (isFavourited)
        throw new ConflictException('This movie already favourited');
      await this.prisma.favorite.create({ data: { userId: id, movieId } });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Movie favourited successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, FavouriteService.name, 'create');
    }
  }

  async removeFromFavourite(userId: string, movieId: string) {
    try {
      const data = await this.prisma.favorite.findFirst({
        where: { movieId, userId },
      });
      if (!data)
        throw new NotFoundException(
          'Movie not favourited or already removed from favourites',
        );
      await this.prisma.favorite.delete({
        where: {
          userId_movieId: {
            userId,
            movieId,
          },
        },
      });
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Movie removed from favourite',
      };
    } catch (error) {
      ServiceExceptions.handle(
        error,
        FavouriteService.name,
        'removeFromFavourite',
      );
    }
  }
}
