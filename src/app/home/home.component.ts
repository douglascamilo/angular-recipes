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
        observer.next(newValue);

        if (newValue === 5) {
          observer.complete();
        }

        if (newValue > 3) {
          observer.error(new Error('Value is greater than 3!'));
        }

        newValue++;
      }, 1000);
    });

    this.customObservableSubscription = customIntervalObservable.subscribe(
      (value: number) => console.log(value),
      (error: Error) => alert('An error happened here -> ' + error.message),
      () => console.log('Observable was completed!')
    );
  }

  ngOnDestroy(): void {
    this.customObservableSubscription.unsubscribe();
  }
}
