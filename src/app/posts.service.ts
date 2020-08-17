import { Injectable } from '@angular/core';
import { Post } from './post-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly POSTS_ENDPOINT = 'https://ng-complete-guide-bb985.firebaseio.com/posts.json';

  constructor(
    private http: HttpClient
  ) { }

  createAndStorePost(postData: Post): Observable<{ id: string }> {
    return this.http
      .post<{ id: string }>(this.POSTS_ENDPOINT, postData);
  }

  fetchPosts(): Observable<Post[]> {
    return this.http
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
        }));
  }

  deletePosts(): Observable<any> {
    return this.http.delete(this.POSTS_ENDPOINT);
  }
}
