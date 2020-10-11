import { Component, OnInit } from '@angular/core';
import {DatacoordinatorService} from '../../datacoordinator.service';
import {NgModel} from '@angular/forms';
import { Post } from 'src/app/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(private dataCoordinatorService : DatacoordinatorService) {}
  
  ngOnInit(): void {}

  enteredTitle = '';
  enteredContent = '';

  onAddPost() {
    const post:Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };
    console.log(post.title + post.content);
    console.log('before emit');
    this.dataCoordinatorService.postCreated.emit(post);

  }
}
