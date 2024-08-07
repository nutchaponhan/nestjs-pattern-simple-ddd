import { defineConfig } from 'drizzle-kit';
import appConfig from './src/core/config/app-config';

export default defineConfig({
  schema: './src/drizzle/schema/*',
  dialect: 'postgresql',
  out: './src/drizzle/migrations',
  dbCredentials: {
    url: appConfig.dbConfigUrl,
  },
  verbose: true,
  strict: true,
});
