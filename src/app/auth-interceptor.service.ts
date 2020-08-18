import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      headers: this.addHeaders(req)
    });

    return next.handle(newRequest)
        .pipe(tap(this.logResponse));
  }

  private addHeaders(req: HttpRequest<any>) {
    return req.headers.append('Auth', '321');
  }

  private logResponse(event: HttpEvent<any>) {
    if (event.type === HttpEventType.Response) {
      console.log(`[${event.status} ${event.statusText}] ${event.url}`);

      if (event.body) {
        console.log(event.body);
      }
    }
  }
}
