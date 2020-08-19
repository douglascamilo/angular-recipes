import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqId = this.createReqId();
    this.logRequest(reqId, req);

    return next.handle(req)
      .pipe(tap(event => this.logResponse(reqId, event)));
  }

  private logRequest(reqId: string, req: HttpRequest<any>) {
    console.log(`[${ reqId }] [${ req.method }] ${ req.urlWithParams }`);
    console.log(req.headers);
  }

  private logResponse(reqId: string, event: HttpEvent<any>) {
    if (event.type === HttpEventType.Response) {
      console.log(`[${reqId}] [${event.status} ${event.statusText}]`);

      if (event.body) {
        console.log(event.body);
      }
    }
  }

  private createReqId() {
    return String(Math.random()).substring(2, 6);
  }
}
