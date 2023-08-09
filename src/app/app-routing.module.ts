import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./app/pages/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./app/pages/homepage/homepage.component').then(
            (m) => m.HomepageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./app/pages/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
