import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SpinnerService} from '../services/spinner.service';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    setTimeout((() => this.spinnerService.showSpinner()), 0);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          setTimeout((() => this.spinnerService.hideSpinner()), 500);
        }
        return event;
      }));
  }
}
