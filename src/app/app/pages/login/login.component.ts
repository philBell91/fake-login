import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: this.fb.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.control<string>('', Validators.required),
    });
  }
  submit() {
    this.http
      .post<{ users: User[] }>(
        'https://demo.k0s.nxtcloud.it/api/rest/getUserByEmail',
        {
          email: this.form.get('username')?.value,
        }
      )
      .pipe(catchError(() => of({ users: [] })))
      .subscribe((res: { users: User[] }) => {
        if (res?.users?.length === 0) {
          alert('Credenziali inesistenti');
        } else {
          this.router.navigate(['homepage'], {
            state: {
              id: res.users[0].id,
            },
          });
        }
      });
    // utente1@nextrecruiting.it
  }
}

export type User = {
  auth_complete: boolean;
  avatar: string;
  birthday: string;
  category: string;
  cf: string;
  city: string;
  company: string;
  country: string;
  created_at: string;
  deleted: boolean;
  email: string;
  email_confirmed: boolean;
  facebook: string;
  firebaseId: string;
  first_name: string;
  id: number;
  last_name: string;
  nickname: string;
  notifications_enabled: boolean;
  params: string;
  phone: string;
  phone_confirmed: boolean;
  role: string;
  sex: string;
  status: string;
  updated_at: string;
  vat: string;
};
