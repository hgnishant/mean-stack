import { EventEmitter, Injectable } from '@angular/core';
import {Post} from './post.model';

@Injectable({
  providedIn: 'root'
})
export class DatacoordinatorService {

  constructor() { }

  postCreated = new EventEmitter<Post>();

}
