import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/post.model';
import { DatacoordinatorService } from '../../datacoordinator.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {

  posts : Post[] = [];

  constructor(private dataCoordinatorService: DatacoordinatorService) {
    this.dataCoordinatorService.postCreated.subscribe(
      (postCreated: { title: string; content: string }) => {
        console.log('posts'+postCreated.title + ' '+postCreated.content);
        this.posts.push(postCreated);
      }
    );
  }

  

  ngOnInit(): void {
   
  }

  // posts = [
  //   {title:"First Content",content : "This is first"},
  //   {title:"Second Content",content : "This is Second"},
  //   {title:"Third Content",content : "This is Third"}
  // ];
}
