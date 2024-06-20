import { Injectable, OnInit } from '@angular/core';
import { BookmarkComponent } from './bookmark.component';
import { ExtService } from 'qbm';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnInit {
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

  checkState(url: string, existingLinks: string[], iconValue: string, included: boolean) {
    console.log("Check State has been called");
    if (this.links.includes(url) || existingLinks.includes(url)) {
      iconValue = "bookmark"
      included = true;
      console.log(included);
    }
    else {
      iconValue = "openbookmark"
      included = false;
      console.log(included);
    }
    return included && iconValue
  }

  initializeBookmarks(iconValue: string, included: boolean){
    if(included === false){
      iconValue === "openbookmark"
    }
    if(included === true){
      iconValue = "bookmark"
    }
    return iconValue
  }

  updateBookmarks(url: string, existingLinks: string[], iconValue: string, included: boolean){
    if(included === false){
      this.saveLink(url, existingLinks);
      iconValue === "bookmark"
    }
    if(included === true){
      this.deleteLink(url, existingLinks)
      iconValue = "openbookmark"

    }

   
  }

  public deleteLink(url: string, existingLinks: string[]) {
    for (let i = existingLinks.length - 1; i >= 0; i--) {
      if (this.links[i] === url) {
        this.links.splice(i, 1);
        console.log("Item was deleted");
      }
    }
  }

  saveLink(url: string, existingLinks: string[]) {
    existingLinks.push(url);
    console.log("Item was pushed")
  }

}