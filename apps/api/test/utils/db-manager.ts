import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

export class DBManager {
  private container: StartedPostgreSqlContainer | null = null;
  private prisma: PrismaClient | null = null;

  async start() {
    console.log('Starting Testcontainers PostgreSQL...');
    this.container = await new PostgreSqlContainer('postgres:15-alpine')
      .withDatabase('suetogether_test')
      .withUsername('test')
      .withPassword('test')
      .start();

    const dbUrl = this.container.getConnectionUri();
    
    // Override environment variables for the test process
    process.env.DATABASE_URL = dbUrl;
    process.env.TEST_DATABASE_URL = dbUrl;

    console.log(`Test DB started: ${dbUrl}. Pushing schema...`);

    // We must push the Prisma Schema to the temporary test DB.
    try {
      execSync('npx prisma db push --skip-generate', {
        env: { ...process.env, DATABASE_URL: dbUrl },
        stdio: 'inherit',
      });
      console.log('Prisma schema pushed successfully.');
    } catch (err) {
      console.error('Failed to push prisma schema to testcontainer', err);
      throw err;
    }

    this.prisma = new PrismaClient({
      datasources: { db: { url: dbUrl } },
    });
    
    await this.prisma.$connect();
    return this.prisma;
  }

  async stop() {
    if (this.prisma) {
      await this.prisma.$disconnect();
    }
    if (this.container) {
      console.log('Stopping Testcontainers PostgreSQL...');
      await this.container.stop();
    }
  }

  getPrisma(): PrismaClient {
    if (!this.prisma) throw new Error('DBManager.start() must be called first.');
    return this.prisma;
  }
}
