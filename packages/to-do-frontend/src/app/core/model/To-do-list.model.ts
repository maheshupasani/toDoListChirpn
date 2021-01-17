export interface AddNewTodoList {
  uuid?: string;
  name: string;
  description: string;
}

export interface ToDoListResponse {
  createdOn: boolean;
  description: string;
  isActive: boolean;
  modifiedOn: string;
  name: string;
  uuid: string;
}
