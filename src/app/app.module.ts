import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MAT_DATE_LOCALE} from "@angular/material";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {apiwrapper} from "./apis/apiwrapper";
import {PatientService} from "./services/patient.service";
import {CacheService} from "./services/cache.service";
import {AppointmentsService} from "./services/appointments.service";
import {SignInRouterService} from "./services/sign-in-router.service";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {ForgotpasswordComponent} from "./components/forgotpassword/forgotpassword.component";
import {MainComponent} from "./components/main/main.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {ValidateEqualDirective} from "./directives/validate-equal.directive";
import {AddhospitalComponent} from "./components/addhospital/addhospital.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthenticationService} from "./services/authentication.service";
import {SignInGuard} from "./routing/signin.guard";
import {AuthenticationGuard} from "./routing/authentication.guard";
import {MatIconModule} from "@angular/material/icon";
import {ErrorHandlingModule} from "./error-handling/error-handling.module";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[SignInGuard]},
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'main', component: MainComponent, canActivate:[AuthenticationGuard] },
  { path:'addhospital', component:AddhospitalComponent, canActivate:[AuthenticationGuard] },
  { path:'settings', component:SettingsComponent, canActivate:[AuthenticationGuard] },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotpasswordComponent,
    MainComponent,
    NotFoundComponent,
    ValidateEqualDirective,
    SettingsComponent,
    AddhospitalComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    MatIconModule,
    ErrorHandlingModule.forRoot()
  ],
  providers: [SignInRouterService, AuthenticationService, PatientService,
              CacheService, AppointmentsService, apiwrapper,
              AuthenticationGuard, SignInGuard, {provide:MAT_DATE_LOCALE, useValue:'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
