import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './core/login/login.component';
import {AuthGuard} from './core/auth.guard';
import {HomeComponent} from './home/home.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {CompaniesComponent} from './companies/index-company/companies.component';
import {CreateCompanyComponent} from './companies/create-company/create-company.component';
import {EditCompanyComponent} from './companies/edit-company/edit-company.component';
import {PaymentsComponent} from './payments/payments.component';

const routes: Routes = [
  { path: 'login',
    component: LoginComponent
  },
  { path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile',
        component: UserProfileComponent
      },
      {
        path: '',
        component: CompaniesComponent
      },
      {
        path: 'company/create',
        component: CreateCompanyComponent
      },
      {
        path: 'company/edit/:id',
        component: EditCompanyComponent
      },
      {
        path: ':id/payments',
        component: PaymentsComponent
      }
    ]
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
