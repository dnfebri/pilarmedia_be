import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppsLoadConfig } from 'src/shared/config/apps-load.config';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { AllConfigType } from 'src/shared/config/config.type';
import { AppAdminModule } from 'src/app-admin/module';
import { AppUserModule } from 'src/app-user/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: AppsLoadConfig,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        isGlobal: true,
        store: require('cache-manager-redis-store'),
        host: configService.get('cache.host', { infer: true }),
        max: Number(configService.get('cache.max', { infer: true })),
        ttl: Number(configService.get('cache.ttl', { infer: true })),
        port: Number(configService.get('cache.port', { infer: true })),
        auth_pass: process.env.CACHE_PASS,
        db: Number(configService.get('cache.db', { infer: true })),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ...AppAdminModule,
    ...AppUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
