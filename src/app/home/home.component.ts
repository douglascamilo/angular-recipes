import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit, OnDestroy {
  private customObservableSubscription: Subscription;

  ngOnInit(): void {
    const customIntervalObservable = new Observable<number>(observer => {
      let newValue = 0;

      setInterval(() => {
        observer.next(newValue++);
      }, 1000);
    });

    this.customObservableSubscription = customIntervalObservable.subscribe((value: number) => {
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this.customObservableSubscription.unsubscribe();
  }
}
