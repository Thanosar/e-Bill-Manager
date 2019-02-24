import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './home/home.component';

// Angular Material Components
import {
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatToolbarModule, MatListModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { NavComponent } from './core/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {AuthGuard} from './core/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CompaniesComponent } from './companies/index-company/companies.component';
import { CreateCompanyComponent } from './companies/create-company/create-company.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { EditCompanyComponent } from './companies/edit-company/edit-company.component';
import { PaymentsComponent } from './payments/payments.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    UserProfileComponent,
    CompaniesComponent,
    CreateCompanyComponent,
    EditCompanyComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    DropzoneModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    LayoutModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
