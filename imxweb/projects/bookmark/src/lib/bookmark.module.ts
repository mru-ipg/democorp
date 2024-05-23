import { NgModule } from '@angular/core';
import { BookmarkComponent } from './bookmark.component';
import { BookmarkService } from './bookmark.service';



@NgModule({
  declarations: [
    BookmarkComponent
  ],
  imports: [
  ],
  exports: [
    BookmarkComponent
  ]
})
export class BookmarkModule {
  constructor(private readonly initializer: BookmarkService) {
     console.log('In constructor of SamplePluginModule.');
     this.initializer.onInit();
     console.log('SamplePluginModule initialized');
     }
    
 }
