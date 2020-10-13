import { Component, OnInit } from '@angular/core';
import { DatacoordinatorService } from '../../datacoordinator.service';
import {
  FormControl,
  FormGroup,
  NgForm,
  NgModel,
  Validators,
} from '@angular/forms';
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
  isLoading = false;
  post: Post;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
    }
    
    );

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
            this.form.setValue({title:this.post.title,content:this.post.content});
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  enteredTitle = '';
  enteredContent = '';

  onSavePost() {
    if (this.form.invalid) {
      console.log('return');
      return;
    }
    console.log('onsave');
    this.isLoading = true;
    if (this.mode === 'create') {
      this.dataCoordinatorService.addPost({
        id: null,
        title: this.form.value.title,
        content: this.form.value.content,
      });
    } else {
      this.dataCoordinatorService.updatePost({
        id: this.postId,
        title: this.form.value.title,
        content: this.form.value.content,
      });
    }
    this.form.reset();
  }

  onImagePicked(event : Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();//checks thta fome is valid after adding new item
    console.log(file);

  }

}
