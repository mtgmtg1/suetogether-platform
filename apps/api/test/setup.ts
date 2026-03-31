import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../.env.test') });

jest.mock('bull', () => {
  return jest.fn().mockImplementation(() => ({
    add: jest.fn().mockResolvedValue({ id: 'job-id' }),
    process: jest.fn(),
    on: jest.fn(),
    close: jest.fn(),
    isReady: jest.fn().mockResolvedValue(true),
    resume: jest.fn(),
    pause: jest.fn(),
  }));
});

jest.mock('ioredis', () => require('ioredis-mock'));
