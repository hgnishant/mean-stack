import { Component, OnInit } from '@angular/core';
import {DatacoordinatorService} from '../../datacoordinator.service';
import {NgForm, NgModel} from '@angular/forms';
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

  onAddPost(form: NgForm) {
    const post:Post = {
      title: form.value.title,
      content: form.value.content,
    };
    // console.log(post.title + post.content);
    // console.log('before emit');
    //this.dataCoordinatorService.postCreated.emit(post);
    console.log('before service'+post.content);
    this.dataCoordinatorService.addPost(post);

    form.resetForm();

  }
}
