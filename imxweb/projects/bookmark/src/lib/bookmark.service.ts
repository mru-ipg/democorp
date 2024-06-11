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
  private MAX_URL_LENGTH = 2048;  // Example maximum length, adjust as needed

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

  saveLink(url: string, existingLinks: string[]) {
    console.log("This is the Routerlink: ", this.router.url);
    if (!this.links.includes(url) && !existingLinks.includes(url)) {
      this.links.push(url);
      console.log("Item was pushed")
    }
    console.log("Item was not pushed")

    console.log('Router Links', this.links);
  }

  getLinksArray(): string[]{
    return this.links;
  }

}