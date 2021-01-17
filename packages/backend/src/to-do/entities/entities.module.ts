import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoList } from 'src/entities/to-do-list-entity';
import { ToDoService } from './to-do/to-do.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoList])],
  providers: [ToDoService],
  exports: [ToDoService],
})
export class ToDoEntitiesModule {}
