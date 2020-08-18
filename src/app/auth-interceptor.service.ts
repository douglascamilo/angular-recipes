import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      headers: this.addHeaders(req)
    });

    return next.handle(newRequest);
  }

  private addHeaders(req: HttpRequest<any>) {
    return req.headers.append('Auth', '321');
  }
}
