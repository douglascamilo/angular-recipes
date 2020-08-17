import { Component, OnInit } from '@angular/core';
import { Post } from './post-model';
import { PostsService } from './posts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService
      .createAndStorePost(postData)
      .subscribe(() => this.fetchPosts());
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsService
      .deletePosts()
      .subscribe(() => this.fetchPosts());
  }

  private fetchPosts() {
    this.isFetching = true;
    this.error = null;

    setTimeout(() => {
      this.postsService
        .fetchPosts()
        .subscribe(
          (posts: Post[]) => {
            this.isFetching = false;
            this.loadedPosts = posts;
          },
          (error: HttpErrorResponse) => {
            this.isFetching = false;
            this.error = error.message;
          });
    }, 1500);
  }
}
