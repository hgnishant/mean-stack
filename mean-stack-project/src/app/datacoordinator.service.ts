import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class DatacoordinatorService {
  constructor(private http: HttpClient) {}

  //postCreated = new EventEmitter<Post>();
  private postsUpdated = new Subject<Post[]>();

  private Posts: Post[] = [];

  getPosts() {
    //get default posts from server
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postData) => {
        this.Posts = postData.posts;
      //  console.log('data from sevrer = '+this.Posts);
        this.postsUpdated.next([...this.Posts]);
      });
    // return [...this.Posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); //return as an observable but cannot be emitted by whosoever receives it
  }

  addPost(post: Post) {
    this.Posts.push(post);
    this.postsUpdated.next([...this.Posts]);
  }
}
