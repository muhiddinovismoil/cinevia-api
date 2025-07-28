import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import type { Redis } from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    ttlSeconds
      ? await this.redis.set(key, data, 'EX', ttlSeconds)
      : await this.redis.set(key, data);
  }

  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return data as unknown as T;
    }
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async has(key: string): Promise<boolean> {
    return (await this.redis.exists(key)) === 1;
  }

  async flush(): Promise<string> {
    return this.redis.flushall();
  }
}
