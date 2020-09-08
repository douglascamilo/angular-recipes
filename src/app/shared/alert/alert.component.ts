import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';
import { MessageAlert } from './message-alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private messageAlert = new MessageAlert();

  constructor(
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscription = this.alertService.showAlert
      .subscribe(messageAlert => {
        this.messageAlert = messageAlert;
        setTimeout(() => {
          this.messageAlert = new MessageAlert();
        }, 5000);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
