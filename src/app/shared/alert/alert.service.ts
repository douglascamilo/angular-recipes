import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageAlert } from './message-alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showAlert = new Subject<MessageAlert>();

  onSuccess(message: string): void {
    this.showAlert.next(new MessageAlert(message, 'alert alert-success'));
  }

  onError(message: string): void {
    this.showAlert.next(new MessageAlert(message, 'alert alert-danger'));
  }
}
