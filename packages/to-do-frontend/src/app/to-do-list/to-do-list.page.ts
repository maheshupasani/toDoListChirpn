import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import {
  AddNewTodoList,
  ToDoListResponse,
} from "../core/model/To-do-list.model";
import { ToDoListService } from "../services/to-do-list/to-do-list.service";
import { AuthService } from "../services/auth/auth.service";

@Component({
  selector: "app-to-do-list",
  templateUrl: "./to-do-list.page.html",
  styleUrls: ["./to-do-list.page.scss"],
})
export class ToDoListPage implements OnInit {
  addNewForm: FormGroup;
  todoLists: ToDoListResponse[];
  isEdit: boolean = false;

  constructor(
    private readonly loadingController: LoadingController,
    private readonly toDoListService: ToDoListService,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly alertController: AlertController,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
    this.fetchToDoLists();
  }

  createForm() {
    this.addNewForm = new FormGroup({
      uuid: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    });
  }

  fetchToDoLists() {
    this.toDoListService.fetchAllTodo().subscribe({
      next: async (res: any) => {
        this.todoLists = res;
      },
      error: async (err: any) => {
        if (err.error.statusCode === 403) {
          const toast = await this.toastController.create({
            message: "Session Expired.Please login",
            duration: 2000,
          });
          toast.present();
          this.router.navigateByUrl("/");
        }
      },
    });
  }

  async addNewTodo() {
    this.addNewForm.markAllAsTouched();
    if (this.addNewForm.invalid) return;

    const payload = {} as AddNewTodoList;
    payload.name = this.addNewForm.controls.name.value;
    payload.description = this.addNewForm.controls.description.value;

    const loading = await this.loadingController.create({
      message: "Please wait,adding",
    });
    await loading.present();

    this.toDoListService.create(payload).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: "created",
          duration: 2000,
        });
        toast.present();
        this.fetchToDoLists();
        return;
      },
      error: async (err: any) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: "Error while registering your account",
          duration: 2000,
        });
        toast.present();
        return;
      },
    });
  }

  async updateNewTodo() {
    this.addNewForm.markAllAsTouched();
    if (this.addNewForm.invalid) return;

    const payload = {} as AddNewTodoList;
    payload.uuid = this.addNewForm.controls.uuid.value;
    payload.name = this.addNewForm.controls.name.value;
    payload.description = this.addNewForm.controls.description.value;

    const loading = await this.loadingController.create({
      message: "Please wait,adding",
    });
    await loading.present();

    this.toDoListService.update(payload).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: "Updated",
          duration: 2000,
        });
        toast.present();
        this.addNewForm.reset();
        this.fetchToDoLists();
        return;
      },
      error: async (err: any) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: "Error while updating",
          duration: 2000,
        });
        toast.present();
        return;
      },
    });
  }

  async delete(uuid: string) {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: `Are you sure you want to delete Todo ?`,
      buttons: [
        {
          text: "No",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: async () => {
            const loading = await this.loadingController.create({
              message: "Please wait,deleting",
            });
            await loading.present();
            this.toDoListService.delete(uuid).subscribe({
              next: async (res: any) => {
                await loading.dismiss();
                this.fetchToDoLists();
                const toast = await this.toastController.create({
                  message: "Deleted",
                  duration: 2000,
                });
                toast.present();
                return;
              },
              error: async (err: any) => {
                await loading.dismiss();
                const toast = await this.toastController.create({
                  message: "Error while deleting",
                  duration: 2000,
                });
                toast.present();
                return;
              },
            });
          },
        },
      ],
    });
    await alert.present();
  }

  edit(toDo: ToDoListResponse) {
    this.addNewForm.controls.name.setValue(toDo.name);
    this.addNewForm.controls.uuid.setValue(toDo.uuid);
    this.addNewForm.controls.description.setValue(toDo.description);
    this.isEdit = true;
  }

  cancel() {
    this.addNewForm.reset();
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: "Logging out",
    });
    await loading.present();

    this.authService.logout().subscribe({
      next: async (res) => {
        await loading.dismiss();
        localStorage.clear();
        this.router.navigateByUrl("/");
      },
      error: async (err) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: "Something went wrong.",
          duration: 2000,
        });
        toast.present();
      },
    });
  }
}
