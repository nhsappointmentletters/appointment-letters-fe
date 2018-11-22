import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatSnackBarModule, MatButtonModule} from "@angular/material";
import {HttpErrorInterceptor} from "./http-error-interceptor";
import {OperationErrorNotifier} from "./operation-error-notifier";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: []
})
export class ErrorHandlingModule {

  static forRoot(): ModuleWithProviders {
    return  {
      ngModule: ErrorHandlingModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        OperationErrorNotifier
      ]
    };
  }
}
