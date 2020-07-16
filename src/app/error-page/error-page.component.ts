import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  dataSubscription: Subscription;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.errorMessage = this.route.snapshot.data.message;
    this.dataSubscription = this.route.data
      .subscribe((data: Data) => {
        this.errorMessage = data.message;
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
