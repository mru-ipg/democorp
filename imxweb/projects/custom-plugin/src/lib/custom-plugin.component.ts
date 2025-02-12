import { Component } from '@angular/core';

@Component({
  selector: 'ccc-custom-plugin',
  templateUrl: './custom-plugin.component.html',
  styles: [],
})
export class CustomPluginComponent {
  description = 'test';
  caption = 'test';
  actionText = 'test';

  doOnClickOperation() {
    
  }
}
