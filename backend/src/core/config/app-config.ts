import { get } from 'env-var';
import { ClientConfig } from 'pg';
import * as path from 'path';
import { JwtModuleOptions } from '@nestjs/jwt';

import './dotenv';

class AppConfig {
  public nodeEnv: string;
  public dbConfig: ClientConfig;
  public dbConfigUrl: string;
  public migrationFolder: string;
  public jwtConfig: JwtModuleOptions;

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    this.nodeEnv = get('NODE_ENV').default('development').asString();
    this.dbConfig = this.getDbConfig();
    this.dbConfigUrl = this.getDbConfigUrl();
    this.migrationFolder = this.getMigrationFolder();
    this.jwtConfig = this.getJwtConfig();
  }

  private getDbConfig(): ClientConfig {
    return {
      host: get('POSTGRES_HOST').required().asString(),
      port: get('POSTGRES_PORT').required().asIntPositive(),
      user: get('POSTGRES_USER').required().asString(),
      password: get('POSTGRES_PASSWORD').required().asString(),
      database: get('POSTGRES_DB').required().asString(),
    };
  }

  private getDbConfigUrl(): string {
    return `postgresql://${this.dbConfig.user}:${this.dbConfig.password}@${this.dbConfig.host}:${this.dbConfig.port}/${this.dbConfig.database}`;
  }

  private getMigrationFolder(): string {
    return path.resolve(__dirname, '../../drizzle/migrations');
  }

  private getJwtConfig() {
    const nodeEnv = this.nodeEnv;
    const expiresIn = ['development', 'test'].includes(nodeEnv) ? '7d' : '1h';

    return {
      global: true,
      secret: get('JWT_SECRET').required().asString(),
      signOptions: { expiresIn },
    };
  }
}

const appConfig = new AppConfig();

export default appConfig;
