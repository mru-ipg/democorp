import { Injectable, OnInit } from '@angular/core';
import { BookmarkComponent } from './bookmark.component';
import { ExtService } from 'qbm';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  routerLinks: string[][] = [];
  private MAX_URL_LENGTH = 2048;  // Example maximum length, adjust as needed

  OnInit() {
    this.extService.register('Bookmark', { instance: BookmarkComponent })
  }

  constructor(
    private readonly extService: ExtService,
    private router: Router,
  ) {}

  getCurrentRoute(): string {
    return this.router.url;
  }

  saveRouterLink(url: string) {
    if (url.length > this.MAX_URL_LENGTH) {
      console.warn('URL is too long to be saved:', url);
      return;
    }

    const parts = url.split('/').filter(part => part !== '');
    if (parts.length === 0) return;

    // Check for duplicate links
    const isDuplicate = this.routerLinks.some(linkParts => {
      if (linkParts.length !== parts.length) {
        return false;
      }
      return linkParts.every((part, index) => part === parts[index]);
    });

    if (!isDuplicate) {
      this.routerLinks.push(parts);
      console.log('Router Links Array:', this.routerLinks);
    }
  }
  
    // Method to get router links array
    getRouterLinksArray(): string[][] {
      return this.routerLinks;
    }
  
  
    // Method to dynamically generate void functions for each router link
    generateGoToFunction(routerLink: string): () => void {
      return () => {
        const parts = routerLink.split('/').filter(part => part !== '');
        this.router.navigate(parts);
      };
    }
}