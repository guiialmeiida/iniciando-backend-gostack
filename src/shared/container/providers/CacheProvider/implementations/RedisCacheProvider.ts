import { String } from 'aws-sdk/clients/cloudsearchdomain';
import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';
import cache from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async recover(key: string): Promise<String | null> {
    const data = await this.client.get(key);

    return data;
  }

  public async invalidate(key: string): Promise<void> {}
}
