import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface Post {
  userId?: number;
  id?: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => `Error API Posts: ${error.message}`);
  }
}
