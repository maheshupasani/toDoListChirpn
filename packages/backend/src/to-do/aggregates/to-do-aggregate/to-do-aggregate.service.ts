import { Injectable } from '@nestjs/common';
import { from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/auth/entities/user/user.service';
import { ToDoList } from 'src/entities/to-do-list-entity';
import {
  AddNewToDoDto,
  UpdateToDoDto,
} from 'src/to-do/entities/to-do/to-do-dto';
import { ToDoService } from 'src/to-do/entities/to-do/to-do.service';

@Injectable()
export class ToDoAggregateService {
  constructor(
    private readonly toDoService: ToDoService,
    private readonly userService: UserService,
  ) {}

  getAll(clientRequest: any) {
    return from(
      this.userService.findOne({
        uuid: clientRequest.token.userUuid,
      }),
    ).pipe(
      switchMap((user) => {
        return from(
          this.toDoService.find({
            user: user,
          }),
        );
      }),
    );
  }

  create(payload: AddNewToDoDto, clientRequest: any) {
    return from(
      this.userService.findOne({
        uuid: clientRequest.token.userUuid,
      }),
    ).pipe(
      switchMap((user) => {
        const toDo = new ToDoList();
        Object.assign(toDo, payload);
        toDo.user = user;
        return from(toDo.save());
      }),
    );
  }

  update(payload: UpdateToDoDto, clientRequest: any) {
    return from(
      this.toDoService.findOne({
        uuid: payload.uuid,
      }),
    ).pipe(
      switchMap((toDo) => {
        Object.assign(toDo, payload);
        return from(toDo.save());
      }),
    );
  }

  delete(uuid: string) {
    return from(this.toDoService.delete(uuid));
  }
}
