import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  failedMessage?: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const formData = this.loginForm.getRawValue();
    this.authService
      .login(formData)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => {
          console.error(
            `Failed to login user with email ${formData.email}, Error: ${err}`
          );

          this.failedMessage =
            err.error?.message ?? 'Something went wrong! Please try again';

          return of(null);
        })
      )
      .subscribe((res) => {
        if (!res) return;
        if (res?.status === 'success') {
          this.router.navigate(['/']);
          return;
        }

        this.failedMessage =
          res?.type === 'credentials'
            ? 'Invalid credentials'
            : 'Something went wrong! Please try again';
      });
  }
}
