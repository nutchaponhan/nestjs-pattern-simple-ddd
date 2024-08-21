import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import mainConfig from './main.config';
import { generateOpenApi } from '@ts-rest/open-api';
import { C } from 'api-spec';
import { SecurityRequirementObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const hasSecurity = (
  metadata: unknown,
): metadata is { openApiSecurity: SecurityRequirementObject[] } => {
  return !!metadata && typeof metadata === 'object' && 'security' in metadata;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.APP_URL],
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    },
  });

  mainConfig(app);

  const openApiDoc = generateOpenApi(
    C,
    {
      info: { title: 'Robert API', version: '0.1' },
      components: {
        securitySchemes: {
          bearer: {
            scheme: 'bearer',
            bearerFormat: 'JWT',
            type: 'http',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
        },
        persistAuthorization: true,
      },
    },
    {
      operationMapper: (operation, appRoute) => ({
        ...operation,
        ...(hasSecurity(appRoute.metadata)
          ? {
              security: [
                {
                  bearer: [],
                },
              ],
            }
          : {}),
      }),
    },
  );

  SwaggerModule.setup('api/documentation', app, openApiDoc);

  await app.listen(3000);
}
bootstrap();
