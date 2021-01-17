import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { ToDoAggregateService } from 'src/to-do/aggregates/to-do-aggregate/to-do-aggregate.service';
import {
  AddNewToDoDto,
  UpdateToDoDto,
} from 'src/to-do/entities/to-do/to-do-dto';

@Controller('to-do')
export class ToDoController {
  constructor(private readonly toDoAggregateService: ToDoAggregateService) {}

  @Get('')
  @UseGuards(TokenGuard)
  async getAll(@Req() req) {
    return this.toDoAggregateService.getAll(req).toPromise();
  }

  @Post('')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(TokenGuard)
  async create(@Body() payload: AddNewToDoDto, @Req() req) {
    req;
    return this.toDoAggregateService.create(payload, req).toPromise();
  }

  @Put('')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(TokenGuard)
  async update(@Body() payload: UpdateToDoDto, @Req() req) {
    return this.toDoAggregateService.update(payload, req).toPromise();
  }

  @Delete(':uuid')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(TokenGuard)
  async delete(@Param('uuid') uuid: string) {
    return this.toDoAggregateService.delete(uuid).toPromise();
  }
}
