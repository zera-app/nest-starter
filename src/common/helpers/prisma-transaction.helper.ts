import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaTransactionHelper {
  private static client: PrismaClient | null = null;

  static async beginTransaction() {
    this.client = prisma;
    await this.client.$executeRawUnsafe('BEGIN');
  }

  static async commit() {
    if (!this.client) throw new Error('No active transaction');
    await this.client.$executeRawUnsafe('COMMIT');
    this.releaseClient();
  }

  static async rollback() {
    if (!this.client) throw new Error('No active transaction');
    await this.client.$executeRawUnsafe('ROLLBACK');
    this.releaseClient();
  }

  static closeConnection() {
    this.releaseClient();
  }

  protected static releaseClient() {
    if (this.client) {
      this.client.$disconnect();
      this.client = null;
    }
  }
}
