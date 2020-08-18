import { Injectable } from '@angular/core';
import { Post } from './post-model';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
      .post<{ id: string }>(
        this.POSTS_ENDPOINT,
        postData);
  }

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post }>(
        this.POSTS_ENDPOINT,
        {
          headers: this.getFetchPostsHeaders(),
          params: this.getFetchPostsQueryParams()
        })
      .pipe(
        map(this.mapToPost),
        catchError(this.logErrorAndReturn)
      );
  }

  deletePosts(): Observable<any> {
    return this.http.delete(this.POSTS_ENDPOINT);
  }

  private getFetchPostsQueryParams() {
    return new HttpParams()
        .set('print', 'pretty');
  }

  private getFetchPostsHeaders() {
    return new HttpHeaders()
        .append('Custom-Header', 'Hello')
        .append('Custom-Header2', 'Hello2');
  }

  private mapToPost(response: { [p: string]: Post }) {
    const postsArray: Post[] = [];

    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        postsArray.push({ id: key, ...response[key] });
      }
    }

    return postsArray;
  }

  private logErrorAndReturn(error: any) {
    console.error(error);
    return throwError(error);
  }
}
