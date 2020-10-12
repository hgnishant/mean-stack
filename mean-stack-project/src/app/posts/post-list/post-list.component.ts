import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from 'src/app/post.model';
import { DatacoordinatorService } from '../../datacoordinator.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSubs: Subscription;

  constructor(private dataCoordinatorService: DatacoordinatorService) {
    // this.dataCoordinatorService.postCreated.subscribe(
    //   (postCreated: { title: string; content: string }) => {
    //     console.log('posts'+postCreated.title + ' '+postCreated.content);
    //     this.posts.push(postCreated);
    //   }
    // );
  }

  ngOnInit(): void {
     this.dataCoordinatorService.getPosts();
    this.postSubs = this.dataCoordinatorService
      .getPostUpdateListener()
      .subscribe((postData: Post[]) => {
        this.posts = postData;
      });
  }

  // posts = [
  //   {title:"First Content",content : "This is first"},
  //   {title:"Second Content",content : "This is Second"},
  //   {title:"Third Content",content : "This is Third"}
  // ];

  onDeletePost(postID:string){
    console.log('post to be dleted = '+postID);
    this.dataCoordinatorService.deletePost(postID);
  }

  ngOnDestroy() {
    this.postSubs.unsubscribe();
  }
}
