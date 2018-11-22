import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {OperationErrorNotifier} from './operation-error-notifier';
import {CacheService} from "../services/cache.service";
import {SignInRouterService} from "../services/sign-in-router.service";


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private operationErrorNotifier: OperationErrorNotifier,
                private cacheService: CacheService,
                private signInRouterService: SignInRouterService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return next.handle(req).catch((err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 0) {
                    this.operationErrorNotifier.notifyUser('Connection error');
                } else if (err.status === 401) {
                    this.cacheService.clear();
                    this.signInRouterService.navigateToSignIn();
                } else if (err.status >= 500) {
                    this.operationErrorNotifier.notifyUser('Server error');
                }
            }
            return new ErrorObservable(err);
        });
    }
}
