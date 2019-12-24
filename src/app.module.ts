import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { join } from 'path';

@Module({
  imports: [
    ClientModule.forRoot({
      webpackPath: join(process.cwd(), 'webpack.config.client.js'),
      renderPath: '/',
      rootPath: join(process.cwd(), 'dist', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
