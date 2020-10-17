import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { identifierModuleUrl, InvokeFunctionExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class DatacoordinatorService {
  constructor(private http: HttpClient,private router:Router) {}

  //postCreated = new EventEmitter<Post>();
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  private Posts: Post[] = [];

  getPosts(pageSize:number,currentPage:number) {
    //get default posts from server
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any,maxPosts:number }>('http://localhost:3000/api/posts'+queryParams)
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.Posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.Posts],
          postCount: transformedPostData.maxPosts
        });
      });
    // return [...this.Posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); //return as an observable but cannot be emitted by whosoever receives it
  }

  addPost(post: Post,image:File) {
   // const _post = post;
   //json data cannot have file/blob data
   //we need to FormData() which a js object and can contain blob/file data with json
   const postData = new FormData();
   postData.append("title",post.title);
   postData.append("content",post.content);
   postData.append("image",image,post.title);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postID: string) {
    return this.http
    .delete("http://localhost:3000/api/posts/" + postID);
  }

  getPost(id: string) {
    return  this.http
    .get<{_id:string,title:string,content:string,imagePath:File|string}>('http://localhost:3000/api/posts/'+id);
    //return { ...this.Posts.find((p) => p.id === id) };
  }

  updatePost(post: Post) {
    let postData :Post|FormData;
    if(typeof(post.imagePath) === 'object'){
      //if it's a file(obejct) then send formdata
      postData = new FormData();
      postData.append("id", post.id);
      postData.append("title",post.title);
      postData.append("content",post.content);
      postData.append("image",post.imagePath);
    }
    else{
      //image is string then send json
      postData = {
        id:post.id,
        title:post.title,
        content:post.content,
        imagePath : post.imagePath
      }

    }

   // console.log('in service : '+ postData.imagePath);
   this.http
   .put("http://localhost:3000/api/posts/" + post.id, postData)
   .subscribe(response => {
     this.router.navigate(["/"]);
   });
  }
}
