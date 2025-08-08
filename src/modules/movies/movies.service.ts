import { SearchDto } from '@dtos';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { MovieTypes, Prisma } from '@prisma/client';
import { ServiceExceptions, slugify } from '@utils';

import {
  CreateEpisodeDto,
  CreateMovieDto,
  CreateSeasonDto,
  FetchMovieDto,
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
        where: { id: payload.seasonId },
      });
      if (!seasonExists) throw new NotFoundException('Season does not exists');
      const data = await this.prisma.episode.findFirst({
        where: { number: payload.number, seasonId: payload.seasonId },
      });
      if (data)
        throw new ConflictException(
          'Episode number already exists on this season',
        );
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
      const seasonExists = await this.prisma.season.findFirst({
        where: { movieId: payload.movieId, number: payload.number },
      });
      if (seasonExists)
        throw new ConflictException(
          'Season already exists with this number on movie',
        );
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
      const skip = (query.pageNumber - 1) * query.pageSize;
      const take = query.pageSize;
      const where: Prisma.MovieWhereInput = {
        country: !query.country ? undefined : query.country,
        type: !query.movieType ? undefined : query.movieType,
        category: !query.category ? undefined : { name: query.category },
        title: !query.search
          ? undefined
          : {
              contains: query.search,
              mode: 'insensitive',
            },
      };
      const [movies, total] = await Promise.all([
        await this.prisma.movie.findMany({ skip, take, where }),
        await this.prisma.movie.count({ where }),
      ]);
      return {
        statusCode: HttpStatus.OK,
        message: 'Movie successfully fetched',
        data: movies,
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
            select: { id: true, title: true },
          })) ?? [],
      };
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'findAll');
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

  async update(movieId: string, payload: UpdateMovieDto) {
    try {
      const data = await this.chechExists(movieId);
      await this.prisma.movie.update({
        where: { id: movieId },
        data: { ...payload },
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

  async deleteSeason(movieId: string, seasonId: string) {
    try {
      const seasonExists = await this.prisma.season.findFirst({
        where: { id: seasonId, movieId },
      });
      if (!seasonExists) throw new NotFoundException('Season not found');
      await this.prisma.season.delete({
        where: { id: seasonId, movieId: movieId },
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
    const data = await this.prisma.movie.findFirst({ where: { id } });
    if (!data) throw new NotFoundException();
    return data;
  }
}
