import { CustomPluginComponent } from './custom-plugin.component';
import { CustomPluginService } from './custom-plugin.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  CdrModule,
  QbmModule,
  TileModule,
} from 'qbm';




@NgModule({
  declarations: [
    CustomPluginComponent
  ],
  imports: [ 
      CommonModule,
      QbmModule,
      CdrModule,
      TranslateModule,
      FormsModule,
      
      ReactiveFormsModule,
      EuiCoreModule,
      EuiMaterialModule,
      TileModule,
    
  ],
  exports: [
    CustomPluginComponent
  ]
})
export class CustomPluginModule { 

  constructor (private readonly initializer: CustomPluginService) {
    console.log('In constructor of CustomPluginModule');
    this.initializer.onInit();
  }
}
