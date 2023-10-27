// import * as path from 'node:path';

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

// import { UserEntity } from '../database/entities/user.entity';
import { CustomConfigModule } from './config.module';
import { CustomConfigService } from './config.service';

export class TypeOrmConfiguration {
  static get config(): TypeOrmModuleAsyncOptions {
    return {
      imports: [CustomConfigModule],
      useFactory: (customConfigService: CustomConfigService) => {
        return {
          type: 'postgres',
          host: customConfigService.db_host,
          port: customConfigService.db_port,
          username: customConfigService.db_username,
          password: customConfigService.db_password,
          database: customConfigService.db_database,
          synchronize: true,
          entities: [
            `${process.cwd()}/**/*.entity{.js, .ts}`,
            // UserEntity,
          ],
        };
      },
      inject: [CustomConfigService],
    };
  }
}
