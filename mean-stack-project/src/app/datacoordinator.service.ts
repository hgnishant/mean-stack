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
              imagePath : _data.imagePath
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
      .subscribe((resData) => {
      //  console.log('post to service ' + resData.message);
       // _post.id = resData.postID;
       const _post:Post = {id:resData.post.id,title:post.title,content:post.content,imagePath:resData.post.imagePath}
        this.Posts.push(_post);
        this.postsUpdated.next([...this.Posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postID: string) {
    this.http
      .delete<{ message: string }>('http://localhost:3000/api/posts/' + postID)
      .subscribe((resData) => {
        console.log('data deleted ' + resData.message);
        this.Posts = this.Posts.filter((post) => post.id !== postID); //return by removing the deleted item
        this.postsUpdated.next([...this.Posts]);
      });
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
    this.http.put<{message:string}>('http://localhost:3000/api/posts/' + post.id,postData).subscribe(resData=>{
      console.log(resData);
      const updatedPosts = [...this.Posts];
      const oldPostIndex = updatedPosts.findIndex(p=>p.id===post.id);
      const _post:Post = {
        id:post.id,
        title:post.title,
        content:post.content,
        imagePath : ""
      }
      updatedPosts[oldPostIndex]=_post;
      this.Posts=updatedPosts;
      this.postsUpdated.next([...this.Posts]);
      this.router.navigate(["/"]);
    });
  }
}
