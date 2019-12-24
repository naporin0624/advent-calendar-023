import { ServeStaticModuleOptions } from '@nestjs/serve-static';

export interface ClientOptions extends ServeStaticModuleOptions {
  webpackPath?: string;
}
