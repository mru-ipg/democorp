import { Injectable } from '@angular/core';
import { CustomPluginComponent } from './custom-plugin.component';
import { ExtService } from 'qbm';


@Injectable({
  providedIn: 'root'
})
export class CustomPluginService {

  constructor(private readonly extService: ExtService) { }

  public onInit(): void {
    this.extService.register('Dashboard-SmallTiles', {instance: CustomPluginComponent})
  }
}
