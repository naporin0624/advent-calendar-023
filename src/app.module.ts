import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import config from '../webpack.config.client.js';
import { Configuration } from 'webpack';

@Module({
  imports: [
    ClientModule.forRoot({
      renderPath: '/',
      rootPath: 'public',
      webpackConfig: config as Configuration,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
