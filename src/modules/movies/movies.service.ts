import { BaseFindDto } from '@dtos';
import { SortEnum } from '@enums';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { MovieTypes, Prisma } from '@prisma/client';
import { ServiceExceptions, slugify } from '@utils';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';

import {
  CreateEpisodeDto,
  CreateMovieDto,
  CreateSeasonDto,
  FetchMovieDto,
  FindRecommendedsDto,
  UpdateEpisodeDto,
  UpdateMovieDto,
  UpdateSeasonDto,
} from './dto/request';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovie(payload: CreateMovieDto) {
    try {
      const slug = slugify(payload.title);
      const findCategoryExists = await this.prisma.category.findFirst({
        where: { id: payload.categoryId },
      });
      if (!findCategoryExists)
        throw new NotFoundException('Category not found');

      const findWithSlug = await this.prisma.movie.findFirst({
        where: { slug: slug },
      });
      if (findWithSlug)
        throw new ConflictException('Movie exists with this slug');

      await this.prisma.movie.create({ data: { slug: slug, ...payload } });
      return {
        statusCode: HttpStatus.OK,
        message: 'Movie created successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'createMovie');
    }
  }

  async createEpisode(payload: CreateEpisodeDto) {
    try {
      const seasonExists = await this.prisma.season.findFirst({
        where: {
          id: payload.seasonId,
          movie: {
            type: { in: ['SERIES', 'CARTOON_SERIES'] },
          },
        },
      });

      if (!seasonExists) {
        throw new NotFoundException(
          'Season does not exist or movie type is not series/cartoon series',
        );
      }

      const episodeExists = await this.prisma.episode.findFirst({
        where: { number: payload.number, seasonId: payload.seasonId },
      });

      if (episodeExists) {
        throw new ConflictException(
          'Episode number already exists in this season',
        );
      }

      await this.prisma.episode.create({ data: { ...payload } });

      return {
        statusCode: HttpStatus.OK,
        message: 'Episode successfully created',
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'createEpisode');
    }
  }

  async createSeason(payload: CreateSeasonDto) {
    try {
      const movie = await this.prisma.movie.findFirst({
        where: {
          id: payload.movieId,
          type: { in: ['SERIES', 'CARTOON_SERIES'] },
        },
      });

      if (!movie) {
        throw new NotFoundException(
          'Movie does not exist or is not a series/cartoon series',
        );
      }

      const seasonExists = await this.prisma.season.findFirst({
        where: { movieId: payload.movieId, number: payload.number },
      });

      if (seasonExists) {
        throw new ConflictException(
          'Season already exists with this number on movie',
        );
      }

      await this.prisma.season.create({ data: { ...payload } });

      return {
        statusCode: HttpStatus.OK,
        message: 'Season successfully created',
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'createSeason');
    }
  }

  async findAll(query: FetchMovieDto) {
    try {
      const skip = query.pageNumber
        ? (query.pageNumber - 1) * query.pageSize
        : undefined;
      const take = query.pageSize ? query.pageSize : undefined;
      const where: Prisma.MovieWhereInput = {
        categoryId: query.categoryId || undefined,
        releaseYear: query.releaseYear
          ? {
              equals: Number(query.releaseYear),
            }
          : undefined,
        title: query.search
          ? { contains: query.search, mode: 'insensitive' }
          : undefined,
        OR: !query.movieType
          ? undefined
          : query.movieType === MovieTypes.CARTOON
            ? [
                { type: MovieTypes.CARTOON },
                { type: MovieTypes.CARTOON_SERIES },
              ]
            : [{ type: query.movieType }],
      };

      const orderBy = this.setOrder(query.sort);
      const [movies, total] = await Promise.all([
        await this.prisma.movie.findMany({
          skip,
          take,
          where,
          orderBy,
          include: { favorites: true },
        }),
        await this.prisma.movie.count({ where }),
      ]);
      return {
        statusCode: HttpStatus.OK,
        message: 'Movie successfully fetched',
        data: movies || [],
        meta: {
          total,
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
          totalPages: Math.ceil(total / query.pageSize),
        },
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'findAll');
    }
  }
  private setOrder(
    sort: SortEnum,
  ): Prisma.MovieOrderByWithRelationInput | undefined {
    let orderBy: Prisma.MovieOrderByWithRelationInput | undefined;
    switch (sort) {
      case SortEnum.TITLE_ASC:
        orderBy = { title: 'asc' };
        break;
      case SortEnum.TITLE_DESC:
        orderBy = { title: 'desc' };
        break;
      case SortEnum.DATE_ASC:
        orderBy = { releaseYear: 'asc' };
        break;
      case SortEnum.DATE_DESC:
        orderBy = { releaseYear: 'desc' };
        break;
      default:
        orderBy = undefined;
    }
    return orderBy;
  }

  async getMovies(search: string) {
    try {
      return {
        statusCode: HttpStatus.OK,
        message: 'Movies fetched successfully',
        data:
          (await this.prisma.movie.findMany({
            where: {
              type: MovieTypes.SERIES,
              title: { contains: search, mode: 'insensitive' },
            },
            select: { id: true, title: true, favorites: true },
          })) ?? [],
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'findAll');
    }
  }

  async getSeasons(movieId: string, query: BaseFindDto) {
    try {
      const skip = (query.pageNumber - 1) * query.pageSize;
      const take = query.pageSize;
      const [seasons, total] = await Promise.all([
        await this.prisma.season.findMany({
          where: { movieId },
          skip,
          take,
          orderBy: {
            number: 'asc',
          },
        }),
        await this.prisma.season.count({ where: { movieId } }),
      ]);
      return {
        statusCode: HttpStatus.OK,
        message: 'Season fetched successfully',
        data: seasons ?? [],
        meta: {
          total,
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
          totalPages: Math.ceil(total / query.pageSize),
        },
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'findAll');
    }
  }
  async getEpisodes(seasonId: string, query: BaseFindDto) {
    try {
      const skip = (query.pageNumber - 1) * query.pageSize;
      const take = query.pageSize;
      const [episodes, total] = await Promise.all([
        await this.prisma.episode.findMany({
          where: { seasonId },
          skip,
          take,
          orderBy: {
            number: 'asc',
          },
        }),
        await this.prisma.episode.count({ where: { seasonId } }),
      ]);
      return {
        statusCode: HttpStatus.OK,
        message: 'Episode fetched successfully',
        data: episodes ?? [],
        meta: {
          total,
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
          totalPages: Math.ceil(total / query.pageSize),
        },
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'findAll');
    }
  }

  async getMainMoviesTvSeriesCartoons() {
    try {
      const [movies, cartoons, tvseries] = await Promise.all([
        this.prisma.movie.findMany({
          where: { type: MovieTypes.MOVIE, imdbRating: { gte: 6 } },
          include: { category: true, favorites: true },
          take: 16,
        }),
        this.prisma.movie.findMany({
          where: {
            type: { in: [MovieTypes.CARTOON, MovieTypes.CARTOON_SERIES] },
            imdbRating: { gte: 6 },
          },
          include: { category: true, favorites: true },
          take: 16,
        }),
        this.prisma.movie.findMany({
          where: { type: MovieTypes.SERIES, imdbRating: { gte: 6 } },
          include: { category: true, favorites: true },
          take: 16,
        }),
      ]);
      return {
        statusCode: HttpStatus.OK,
        message: 'Main movies cartoons tvseries fetched successfully',
        data: {
          movies: movies ?? [],
          cartoons: cartoons ?? [],
          tvseries: tvseries ?? [],
        },
      };
    } catch (error) {
      ServiceExceptions.handle(
        error,
        MovieService.name,
        'getMainMoviesTvSeriesCartoons',
      );
    }
  }

  async getRecomendeds({
    categoryId,
    imdbRating,
    movieType,
    movieId,
  }: FindRecommendedsDto) {
    try {
      if (typeof imdbRating === 'number' && !isNaN(imdbRating)) {
        const data = await this.prisma.movie.findMany({
          where: {
            id: {
              not: {
                equals: movieId,
              },
            },
            categoryId,
            imdbRating: {
              gte: imdbRating - 1,
              lte: imdbRating,
            },
            type: movieType,
          },
          take: 16,
          include: { favorites: true },
        });
        return {
          statusCode: HttpStatus.OK,
          message: `Recommended ${movieType[0].toUpperCase() + movieType.slice(1).toLowerCase()}`,
          data: data ?? [],
        };
      }
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'getRecomendeds');
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.chechExists(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Movie data fetched successfully',
        data: data,
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'findOne');
    }
  }

  async streamMedia(filename: string, req: Request, res: Response) {
    try {
      const filePath = join(__dirname, '..', '..', '..', '/uploads', filename);

      if (!fs.existsSync(filePath)) {
        throw new NotFoundException('Media not found');
      }

      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': `bytes`,
          'Content-Length': chunkSize,
          'Content-Type': 'video/mp4',
        });

        file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        });
        fs.createReadStream(filePath).pipe(res);
      }
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'streamMedia');
    }
  }

  async update(movieId: string, payload: UpdateMovieDto) {
    try {
      const data = await this.chechExists(movieId);
      const slug = slugify(payload.title);
      await this.prisma.movie.update({
        where: { id: movieId },
        data: { ...payload, slug },
      });
      return {
        message: 'Movie updated successfully',
        statusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'update');
    }
  }

  async updateEpisode(episodeId: string, payload: UpdateEpisodeDto) {
    try {
      const episodeExists = await this.prisma.episode.findFirst({
        where: { id: episodeId },
      });
      if (!episodeExists) throw new NotFoundException('Episode not found');
      await this.prisma.episode.update({
        where: { id: episodeId },
        data: { ...payload },
      });
      return {
        message: 'Episode updated successfully',
        statusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'updateEpisode');
    }
  }

  async updateSeason(seasonId: string, payload: UpdateSeasonDto) {
    try {
      const seasonExists = await this.prisma.season.findFirst({
        where: {
          id: seasonId,
          movieId: payload.movieId,
        },
      });
      if (!seasonExists) throw new NotFoundException('Season not found');
      await this.prisma.season.update({
        where: { id: seasonId },
        data: { ...payload },
      });
      return {
        message: 'Season updated successfully',
        statusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'updateSeason');
    }
  }

  async delete(id: string) {
    try {
      const data = await this.chechExists(id);
      await this.prisma.movie.delete({ where: { id } });
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Movie deleted successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'delete');
    }
  }

  async deleteEpisode(episodeId: string) {
    try {
      const episodeExists = await this.prisma.episode.findFirst({
        where: { id: episodeId },
      });
      if (!episodeExists) throw new NotFoundException();
      await this.prisma.episode.delete({ where: { id: episodeId } });
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Episode deleted successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'deleteEpisode');
    }
  }

  async deleteSeason(seasonId: string) {
    try {
      const seasonExists = await this.prisma.season.findFirst({
        where: { id: seasonId },
      });
      if (!seasonExists) throw new NotFoundException('Season not found');
      await this.prisma.season.delete({
        where: { id: seasonId },
      });
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Season deleted successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'deleteSeason');
    }
  }

  private async chechExists(id: string) {
    const data = await this.prisma.movie.findFirst({
      where: { id },
      include: {
        seasons: {
          orderBy: { title: 'asc' },
          include: {
            episodes: {
              orderBy: { title: 'asc' },
            },
          },
        },
        favorites: true,
      },
    });

    if (!data) throw new NotFoundException();
    return data;
  }
}
