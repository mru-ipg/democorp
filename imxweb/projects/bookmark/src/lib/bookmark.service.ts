import { Injectable, OnInit } from '@angular/core';
import { BookmarkComponent } from './bookmark.component';
import { ExtService } from 'qbm';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnInit {
  routerLinks: string[][] = [];
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

  // Method to save router link to array, checking against existingLinks
  saveRouterLink(url: string) {
    if (url.length > this.MAX_URL_LENGTH) {
      console.warn('URL is too long to be saved:', url);
      return;
    }

    const parts = url.split('/').filter(part => part !== '');
    if (parts.length === 0) return;

    // Check for duplicate links in routerLinks
    const isDuplicateInRouterLinks = this.routerLinks.some(linkParts => {
      if (linkParts.length !== parts.length) {
        return false;
      }
      return linkParts.every((part, index) => part === parts[index]);
    });

    if (!isDuplicateInRouterLinks) {
      this.routerLinks.push(parts);
      console.log('Router Links Array:', this.routerLinks);
    }
  }

  // Method to get router links array
  getRouterLinksArray(): string[][] {
    return this.routerLinks;
  }


  compareAndMergeArrays(array1: string[][], array2: string[][]): string[][] {
    // Create a map to hold unique rows
    const rowMap = new Map<string, string[]>();

    // Function to convert row to a unique key
    const rowToKey = (row: string[]) => JSON.stringify(row);

    // Add rows from array1 to the map
    for (const row of array1) {
      rowMap.set(rowToKey(row), row);
    }

    // Add rows from array2 to the map (duplicates will be ignored)
    for (const row of array2) {
      rowMap.set(rowToKey(row), row);
    }

    // Convert the map back to an array
    return Array.from(rowMap.values());
  }


  // Method to dynamically generate void functions for each router link
  generateGoToFunction(routerLink: string): () => void {
    return () => {
      const parts = routerLink.split('/').filter(part => part !== '');
      this.router.navigate(parts);
    };
  }
}