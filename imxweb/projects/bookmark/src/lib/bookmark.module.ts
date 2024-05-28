import { NgModule } from '@angular/core';
import { BookmarkComponent } from './bookmark.component';
import { BookmarkService } from './bookmark.service';
import { QerModule } from 'qer';
import { CommonModule } from '@angular/common';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';



@NgModule({
  declarations: [
    BookmarkComponent
  ],
  imports: [
    QerModule,
    CommonModule,
    EuiCoreModule,
    EuiMaterialModule
  ],
  exports: [
    BookmarkComponent
  ],
  providers:[
    BookmarkService
  ]
})
export class BookmarkModule {
  constructor(private readonly initializer: BookmarkService) {
     console.log('Initialized constructor of SamplePluginModule.');
     this.initializer.OnInit();
     console.log('SamplePluginModule initialized');
     }
    
 }
