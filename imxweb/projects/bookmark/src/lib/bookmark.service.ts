import { Injectable, OnInit } from '@angular/core';
import { BookmarkComponent } from './bookmark.component';
import { ExtService } from 'qbm';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnInit {
  included: boolean;
  routerLinks: string[][] = [];
  links: string[] = [];

  constructor(
    private readonly extService: ExtService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.extService.register('Bookmark', { instance: BookmarkComponent })

  }

  getCurrentRoute(): string {
    return this.router.url;
  }

  checkState(url: string, existingLinks: string[]){
    console.log("Check State has been called");
    if(this.links.includes(url) || existingLinks.includes(url)){
      this.included = true;
      console.log(this.included);
      return true
    }
    else{
      this.included = false;
      console.log(this.included);
      return false 
    } 
  }

  saveLink(url: string, existingLinks: string[], included: boolean, iconValue: String) {
    console.log("This is the Routerlink: ", this.router.url);
    if (!this.links.includes(url) && !existingLinks.includes(url)) {
      this.links.push(url);
      console.log("Item was pushed")
    }
    if(included === true && iconValue === "bookmark"){
      for (let i = this.links.length - 1; i >= 0; i--) {
        if (this.links[i] === url) {
          this.links.splice(i, 1);
          console.log("Item was delted");
        }
      }
    }

    console.log('Router Links', this.links);
    
  }

  getLinksArray(): string[]{
    return this.links;
  }

}