import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSubscription: Subscription;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedSubscription = this.userService.activatedEmitter
      .subscribe((didActivated: boolean) => this.userActivated = didActivated);
  }

  ngOnDestroy(): void {
    this.activatedSubscription.unsubscribe();
  }
}
