import { Module, DynamicModule, OnModuleInit, Inject } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { join } from 'path';
import { CLIENT_MODULE_OPTIONS } from './client-options.constant';
import { ClientOptions } from './client-options.interface';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({})
export class ClientModule implements OnModuleInit {
  constructor(
    @Inject(CLIENT_MODULE_OPTIONS)
    private readonly clientOptions: ClientOptions,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  static forRoot(options: ClientOptions = {}): DynamicModule {
    options.webpackPath =
      options.webpackPath || join(process.cwd(), 'webpack.config.js');

    return process.env.NODE_ENV !== 'development'
      ? ServeStaticModule.forRoot(options)
      : {
          module: ClientModule,
          providers: [
            {
              provide: CLIENT_MODULE_OPTIONS,
              useValue: options,
            },
          ],
        };
  }

  public async onModuleInit() {
    if (process.env.NODE_ENV !== 'development') return;

    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const webpackConfig = (await import(this.clientOptions.webpackPath))
      .default;

    const compiler = webpack({
      ...webpackConfig,
      entry: [
        ...webpackConfig.entry,
        'webpack-hot-middleware/client?reload=true&timeout=1000',
      ],
      plugins: [
        ...webpackConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ],
    });

    httpAdapter.use(webpackDevMiddleware(compiler));
    httpAdapter.use(webpackHotMiddleware(compiler));
  }
}
