import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly POSTS_ENDPOINT = 'https://ng-complete-guide-bb985.firebaseio.com/posts.json';
  loadedPosts = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }


  onCreatePost(postData: { title: string; content: string }) {
    this.http
      .post(this.POSTS_ENDPOINT, postData)
      .subscribe(response => console.log(response));
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get(this.POSTS_ENDPOINT)
      .subscribe(posts => console.log(posts));
  }
}
