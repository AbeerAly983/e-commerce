import { Component, inject, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  msgError: string = '';
  isLoading = false;
  msgSuccess = false;
  loginSubscribe!: Subscription;
  // create form group
  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.pattern(/^\w{6,}$/),
      Validators.required,
    ]),
  });

  loginForm() {
    if (this.login.valid) {
      this.isLoading = true;
      this.loginSubscribe = this._AuthService
        .loginForm(this.login.value)
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              this.msgSuccess = true;
              setTimeout(() => {
                //token
                localStorage.setItem('userToken', res.token);
                this._AuthService.saveData();
                this._Router.navigate(['/home']);
                this.msgSuccess = false;
              }, 2000);
            }

            console.log(res);
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.msgError = err.error.message;
            setTimeout(() => {
              this.msgError = '';
            }, 2000);
          },
        });
    } else {
      this.login.setErrors({ misMatch: true });
      this.login.markAllAsTouched();
    }
  }

  // confirm Password
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { misMatch: true };
    }
  }ngOnDestroy(): void {
    this.loginSubscribe?.unsubscribe()
  }
}
