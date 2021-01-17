import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";
import { ACCESS_TOKEN } from "../core/constants/app-strings";
import { LoginUser, RegisterUser } from "../core/model/Auth.model";
import { Errors } from "../core/model/error.model";
import { AuthService } from "../services/auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  errors = Errors;
  emailError = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private readonly authService: AuthService,
    private readonly loadingController: LoadingController,
    private readonly toastController: ToastController,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.createLoginForm();
  }

  createForm() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl("", [Validators.required]),
        email: new FormControl("", [
          Validators.required,
          Validators.pattern(this.emailError),
        ]),
        mobile: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        confirmPassword: new FormControl("", [Validators.required]),
      },
      {
        validators: [this.confirmPassword],
      }
    );
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  confirmPassword(abstractControl: AbstractControl) {
    if (
      abstractControl.get("password").value !==
      abstractControl.get("confirmPassword").value
    ) {
      return abstractControl["controls"].confirmPassword.setErrors({
        passwordNotMatch: true,
      });
    }
    return null;
  }

  async registerSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    const payload = this.mapRegisterUserPayload();
    const loading = await this.loadingController.create({
      message: "Please wait,we are creating your account",
    });
    await loading.present();
    console.log(this.authService);

    this.authService.registerUser(payload).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: "You have been successfuly registered.Please login",
          duration: 2000,
        });
        toast.present();
        this.registerForm.reset();
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

  mapRegisterUserPayload() {
    const body = {} as RegisterUser;

    Object.assign(body, this.registerForm.value);
    return body;
  }

  async login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    const payload = {} as LoginUser;
    payload.email = email;
    payload.password = password;

    const loading = await this.loadingController.create({
      message: "Please wait,we are checking our records...",
    });
    await loading.present();

    this.authService.loginUser(payload).subscribe({
      next: async (res: any) => {
        await loading.dismiss();

        localStorage.setItem(ACCESS_TOKEN, res.token);
        this.router.navigateByUrl(`/to-do-list`);
      },
      error: async (err: any) => {
        console.log("err", err);

        await loading.dismiss();
        const toast = await this.toastController.create({
          message: "Error while login into your account",
          duration: 2000,
        });
        toast.present();
        return;
      },
    });
  }
}
