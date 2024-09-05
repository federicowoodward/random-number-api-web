import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { RandomModule } from './random/random.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [RandomModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
