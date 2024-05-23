import { Injectable } from '@angular/core';
import { BookmarkComponent } from './bookmark.component';
import { ExtService } from 'qbm';


@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  onInit() {
    this.extService.register('Bookmark',{instance: BookmarkComponent})
  }

  constructor( private readonly extService: ExtService) {
   }
}
