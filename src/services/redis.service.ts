import { InjectRedis } from '@nestjs-modules/ioredis';
import { BadRequestException, Injectable } from '@nestjs/common';
import { generateOTP } from 'common/utils/otp.randomizer';
import type { Redis } from 'ioredis';
import * as crypto from 'node:crypto';

interface OtpData {
  otp: string;
  attempts: number;
}

@Injectable()
export class RedisCacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async sendOtp(): Promise<{ keyHash: string; otp: string }> {
    const otp = generateOTP();
    const rawKey = crypto.randomBytes(32).toString('hex');
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    const data: OtpData = { otp, attempts: 5 };
    await this.set(keyHash, data, 300);

    return { keyHash, otp };
  }

  async verifyOtp(key: string, otpCode: string): Promise<boolean> {
    const otpData = await this.get<OtpData>(key);

    if (!otpData) {
      throw new BadRequestException(
        'Tasdiqlash kodi noto‘g‘ri yoki muddati o‘tgan.',
      );
    }

    const { otp, attempts } = otpData;

    if (otp !== otpCode) {
      const remainingAttempts = attempts - 1;

      if (remainingAttempts <= 0) {
        await this.del(key);
        throw new BadRequestException(
          '❌ Maksimal urinishlar soni tugadi. Qayta urinib ko‘ring.',
        );
      }

      await this.set(key, { otp, attempts: remainingAttempts }, 300);

      throw new BadRequestException(
        `❌ Kod noto‘g‘ri. Qolgan urinishlar: ${remainingAttempts}`,
      );
    }

    await this.del(key);
    return true;
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const data = JSON.stringify(value);
    if (ttlSeconds) {
      await this.redis.set(key, data, 'EX', ttlSeconds);
    } else {
      await this.redis.set(key, data);
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
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
