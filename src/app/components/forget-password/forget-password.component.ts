import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import e from 'express';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  step = 1;
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCode: FormGroup = new FormGroup({
    restCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0,9]{6}$/),
    ]),
  });
  restPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.pattern(/^\w{6,}$/),
      Validators.required,
    ]),
  });

  emailSubmit() {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.restPassword.get('emai')?.patchValue(emailValue);
    this._AuthService.setEmailVerify(this.verifyEmail).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  codeSubmit() {
    this._AuthService.setCodeVerify(this.verifyCode).subscribe({
      next: (res) => {
        if (res.status == 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {},
    });
  }
  restPass() {
    this._AuthService.confirmPassword(this.restPassword).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveData();
        this._Router.navigate(['/home']);
      },
      error: (err) => {},
    });
  }
}
