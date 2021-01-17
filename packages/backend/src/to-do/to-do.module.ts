import { Module } from '@nestjs/common';
import { ToDoController } from './controllers/to-do/to-do.controller';
import { ToDoEntitiesModule } from './entities/entities.module';
import { ToDoAggregatesManager } from './aggregates';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ToDoController],
  imports: [ToDoEntitiesModule, AuthModule],
  providers: [...ToDoAggregatesManager],
  exports: [...ToDoAggregatesManager, ToDoEntitiesModule],
})
export class ToDoModule {}
