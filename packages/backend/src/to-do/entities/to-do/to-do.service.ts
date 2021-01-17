import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoList } from '../../../entities/to-do-list-entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoList)
    private readonly todoListRepository: Repository<ToDoList>,
  ) {}

  find(query) {
    return this.todoListRepository.find(query);
  }

  findOne(query) {
    return this.todoListRepository.findOne(query);
  }

  delete(uuid: string) {
    return this.todoListRepository.delete(uuid);
  }
}
