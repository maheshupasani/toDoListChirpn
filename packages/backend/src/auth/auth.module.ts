import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthEntitiesModule } from './entities/entities.module';
import { AuthAggregatesManager } from './aggregates';
import { TokenGuard } from './guards/token.guard';

@Module({
  controllers: [AuthController],
  imports: [AuthEntitiesModule],
  providers: [...AuthAggregatesManager, TokenGuard],
  exports: [...AuthAggregatesManager, AuthEntitiesModule, TokenGuard],
})
export class AuthModule {}
