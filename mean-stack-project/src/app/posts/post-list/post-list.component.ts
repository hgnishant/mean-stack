import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  isLoading=false;
  totalPosts=10;
  postsPerPage =2;
  pageSizeOptions =[1,2,5,10];
  currentPage=1;

  constructor(private dataCoordinatorService: DatacoordinatorService) {
    // this.dataCoordinatorService.postCreated.subscribe(
    //   (postCreated: { title: string; content: string }) => {
    //     console.log('posts'+postCreated.title + ' '+postCreated.content);
    //     this.posts.push(postCreated);
    //   }
    // );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataCoordinatorService.getPosts(this.postsPerPage, this.currentPage);
    this.postSubs = this.dataCoordinatorService
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  // posts = [
  //   {title:"First Content",content : "This is first"},
  //   {title:"Second Content",content : "This is Second"},
  //   {title:"Third Content",content : "This is Third"}
  // ];

  onDeletePost(postId:string){
   // console.log('post to be dleted = '+postID);
    this.isLoading = true;
    this.dataCoordinatorService.deletePost(postId).subscribe(() => {
      this.dataCoordinatorService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postSubs.unsubscribe();
  }

  onChangedPage(PageData : PageEvent){
    this.isLoading=true;
    this.currentPage = PageData.pageIndex+1;
    this.postsPerPage = PageData.pageSize;
    this.dataCoordinatorService.getPosts(this.postsPerPage,this.currentPage);
  }

}
