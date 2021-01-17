import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  imports: [HttpModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
