import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions, slugify } from '@utils';

import {
  CreateEpisodeDto,
  CreateMovieDto,
  CreateSeasonDto,
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

  async findAll() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'findAll');
    }
  }

  async findOne() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'findOne');
    }
  }

  async update() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'update');
    }
  }

  async updateEpisode() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'updateEpisode');
    }
  }

  async updateSeason() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'updateSeason');
    }
  }

  async delete() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'delete');
    }
  }

  async deleteEpisode() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'deleteEpisode');
    }
  }

  async deleteSeason() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, MovieService.name, 'deleteSeason');
    }
  }
}
