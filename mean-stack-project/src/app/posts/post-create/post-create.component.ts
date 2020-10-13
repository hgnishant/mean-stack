import { Component, OnInit } from '@angular/core';
import { DatacoordinatorService } from '../../datacoordinator.service';
import { NgForm, NgModel } from '@angular/forms';
import { Post } from 'src/app/post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(
    private dataCoordinatorService: DatacoordinatorService,
    public route: ActivatedRoute
  ) {}
  private mode = 'create';
  private postId: string;
  isLoading=false;
  post: Post;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.dataCoordinatorService
          .getPost(this.postId)
          .subscribe((postData) => {
           this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
            };
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  enteredTitle = '';
  enteredContent = '';

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.dataCoordinatorService.addPost({
        id: null,
        title: form.value.title,
        content: form.value.content,
      });
    } else {
      this.dataCoordinatorService.updatePost({
        id: this.postId,
        title: form.value.title,
        content: form.value.content,
      });
    }
    form.resetForm();
  }
}
