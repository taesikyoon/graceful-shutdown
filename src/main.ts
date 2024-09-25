import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable graceful shutdown hooks
  app.enableShutdownHooks();

  console.log('Hello World!');

  // Graceful shutdown handling
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await shutdown(app);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    await shutdown(app);
  });

  await app.listen(3000);

  // For testing, manually trigger SIGTERM after 5 seconds
}

async function shutdown(app: INestApplication) {
  try {
    // Perform any cleanup operations here, like closing database connections
    console.log('Graceful shutdown completed');
    await app.close();
  } catch (error) {
    console.error('Error during graceful shutdown', error);
    process.exit(1); // Exit the process with an error code if shutdown fails
  }
}

bootstrap();
