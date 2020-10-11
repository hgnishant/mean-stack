import { ThrowStmt } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Post} from './post.model';

@Injectable({
  providedIn: 'root'
})
export class DatacoordinatorService {

  constructor() { }

  //postCreated = new EventEmitter<Post>();
  private postsUpdated = new Subject<Post[]>();

  private Posts :Post[]=[];

  getPosts(){
    return [...this.Posts];
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable(); //return as an observable but cannot be emitted by whosoever receives it
  }

  addPost (post:Post){
    this.Posts.push(post);
    this.postsUpdated.next([...this.Posts]);
  }

}
