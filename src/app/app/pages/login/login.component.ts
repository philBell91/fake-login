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
import { User } from 'src/app/model/User';

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
