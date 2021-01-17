import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TO_DO_LIST } from "src/app/core/constants/api-endpoint";
import {
  ACCESS_TOKEN,
  AUTHORIZATION,
  BEARER_TOKEN_PREFIX,
} from "src/app/core/constants/app-strings";
import {
  AddNewTodoList,
  ToDoListResponse,
} from "src/app/core/model/To-do-list.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ToDoListService {
  constructor(private readonly http: HttpClient) {}

  create(payload: AddNewTodoList) {
    const url = environment.APIURL + TO_DO_LIST;

    let headers = {} as any;
    headers[AUTHORIZATION] =
      BEARER_TOKEN_PREFIX + localStorage.getItem(ACCESS_TOKEN);

    return this.http.post(url, payload, { headers });
  }

  update(payload: AddNewTodoList) {
    const url = environment.APIURL + TO_DO_LIST;

    let headers = {} as any;
    headers[AUTHORIZATION] =
      BEARER_TOKEN_PREFIX + localStorage.getItem(ACCESS_TOKEN);

    return this.http.put(url, payload, { headers });
  }

  delete(uuid: string) {
    const url = environment.APIURL + TO_DO_LIST + uuid;

    let headers = {} as any;
    headers[AUTHORIZATION] =
      BEARER_TOKEN_PREFIX + localStorage.getItem(ACCESS_TOKEN);

    return this.http.delete(url, { headers });
  }

  fetchAllTodo() {
    const url = environment.APIURL + TO_DO_LIST;

    let headers = {} as any;
    headers[AUTHORIZATION] =
      BEARER_TOKEN_PREFIX + localStorage.getItem(ACCESS_TOKEN);

    return this.http.get<ToDoListResponse[]>(url, { headers });
  }
}
