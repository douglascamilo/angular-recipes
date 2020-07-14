import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private paramsSubscription: Subscription;
  user: {id: number, name: string};

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.user = {
          id: params['id'],
          name: params['name']
        };
      });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
