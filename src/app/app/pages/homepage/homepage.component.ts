import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { User } from 'src/app/model/User';

@Component({
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  user$: Observable<User> = new Observable();
  form: FormGroup<{
    birthday: FormControl<string | null>;
    city: FormControl<string | null>;
    country: FormControl<string | null>;
    created_at: FormControl<string | null>;
    email: FormControl<string | null>;
    first_name: FormControl<string | null>;
    last_name: FormControl<string | null>;
    nickname: FormControl<string | null>;
    phone: FormControl<string | null>;
    sex: FormControl<string | null>;
  }> = new FormGroup({
    birthday: this.fb.control<string>('', [Validators.required]),
    city: this.fb.control<string>('', [Validators.required]),
    country: this.fb.control<string>('', [Validators.required]),
    created_at: this.fb.control<string>('', [Validators.required]),
    email: this.fb.control<string>('', [Validators.required]),
    first_name: this.fb.control<string>('', [Validators.required]),
    last_name: this.fb.control<string>('', [Validators.required]),
    nickname: this.fb.control<string>('', [Validators.required]),
    phone: this.fb.control<string>('', [Validators.required]),
    sex: this.fb.control<string>('', [Validators.required]),
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['id']) {
      this.user$ = this.http
        .get<{ users_by_pk: User }>(
          'https://demo.k0s.nxtcloud.it/api/rest/getTestUser/' + state['id']
        )
        .pipe(
          map((r) => r.users_by_pk),
          tap((r) => {
            console.log(r);
            this.form.get('birthday')?.setValue(r.birthday || '');
            this.form.get('city')?.setValue(r.city || '');
            this.form.get('country')?.setValue(r.country || '');
            this.form.get('created_at')?.setValue(r.created_at || '');
            this.form.get('email')?.setValue(r.email || '');
            this.form.get('first_name')?.setValue(r.first_name || '');
            this.form.get('last_name')?.setValue(r.last_name || '');
            this.form.get('nickname')?.setValue(r.nickname || '');
            this.form.get('phone')?.setValue(r.phone || '');
            this.form.get('sex')?.setValue(r.sex || '');
          })
        );
    }
  }
  submit() {
    console.log('submitto');
  }
}
