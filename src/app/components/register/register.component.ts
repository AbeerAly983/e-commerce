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
  selector: 'app-register',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  msgError: string = '';
  isLoading = false;
  msgSuccess = false;
  regSubscribe: Subscription = new Subscription();

  // create form group
  register: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.pattern(/^\w{6,}$/),
        Validators.required,
      ]),
      rePassword: new FormControl(null),
      phone: new FormControl(null, [
        Validators.pattern(/^01[0125][0-9]{8}$/),
        Validators.required,
      ]),
    },
    this.confirmPassword
  );

  registerForm() {
    if (this.register.valid) {
      this.isLoading = true;
      this.regSubscribe = this._AuthService
        .registerForm(this.register.value)
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              this.msgSuccess = true;
              setTimeout(() => {
                this._Router.navigate(['/login']);
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
      this.register.setErrors({ misMatch: true });
      this.register.markAllAsTouched();
    }
  }

  // confirm Password
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { misMatch: true };
    }
  }
  ngOnDestroy(): void {
    this.regSubscribe.unsubscribe();
  }
}
