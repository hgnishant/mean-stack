import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

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
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((resData) => {
          return resData.posts.map((_data) => {
            return {
              title: _data.title,
              content: _data.content,
              id: _data._id,
            };
          });
        })
      )
      .subscribe((_postData) => {
        this.Posts = _postData;
        //  console.log('data from sevrer = '+this.Posts);
        this.postsUpdated.next([...this.Posts]);
      });
    // return [...this.Posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); //return as an observable but cannot be emitted by whosoever receives it
  }

  addPost(post: Post) {
    const _post = post;
    this.http
      .post<{ message: string,postID:string }>('http://localhost:3000/api/posts', _post)
      .subscribe((resData) => {
        console.log('post to service ' + resData.message);
        _post.id = resData.postID;
        this.Posts.push(_post);
        this.postsUpdated.next([...this.Posts]);
      });
  }

  deletePost(postID: string) {
    this.http
      .delete<{ message: string }>('http://localhost:3000/api/posts/' + postID)
      .subscribe((resData) => {
        console.log('data deleted ' + resData.message);
        this.Posts = this.Posts.filter(post=> post.id!== postID);//return by removing the deleted item
        this.postsUpdated.next([...this.Posts]);
      });
  }
}
