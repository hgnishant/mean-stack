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
import { mimeType } from './mime-type.validator';

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
  imagePreview: string;
  isLoading = false;
  post: Post;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

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
              imagePath:postData.imagePath
            };
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image:this.post.imagePath
            });
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
      this.dataCoordinatorService.addPost(
        {
          id: null,
          title: this.form.value.title,
          content: this.form.value.content,
          imagePath:this.form.value.image
        },
        this.form.value.image
      );
    } else {
      console.log('title before update : '+this.form.value.title);
      console.log('file name to update : '+this.form.value.image.name);
      this.dataCoordinatorService.updatePost({
        id: this.postId,
        title: this.form.value.title,
        content: this.form.value.content,
        imagePath:this.form.value.image
      });
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    console.log('(event.target as HTMLInputElement).files  '+(event.target as HTMLInputElement).files.length);
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: "" });
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity(); //checks thta form is valid after adding new item
    console.log('file name'+file.name);
    const reader = new FileReader();
    reader.onload = () => {
      //async code
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
