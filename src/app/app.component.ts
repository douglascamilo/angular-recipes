import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly POSTS_ENDPOINT = 'https://ng-complete-guide-bb985.firebaseio.com/posts.json';
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http
      .post<{ createdId: string }>(this.POSTS_ENDPOINT, postData)
      .subscribe(response => console.log(response));
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;

    this.http
      .get<{ [key: string]: Post }>(this.POSTS_ENDPOINT)
      .pipe(
        map(response => {
          const postsArray: Post[] = [];

          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              postsArray.push({ id: key, ...response[key] });
            }
          }

          return postsArray;
        }))
      .subscribe((posts: Post[]) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }
}
