import { Component, OnInit } from '@angular/core';
import { BookmarkService } from './bookmark.service';
import { QerApiService } from 'qer';
import { imx_SessionService } from 'qbm';

@Component({
  selector: 'imx-bookmark',
  templateUrl: './bookmark.component.html',
  styles: [
  ]
})
export class BookmarkComponent implements OnInit {
  public userId: string;
  public portalPersonAdmin: any;
  existingLinks: string[][] = [];

  constructor(
    private bookmarkService: BookmarkService,
    private readonly sessionService: imx_SessionService,
    private qerClient: QerApiService,
  ) {
        this.bookmarkService.OnInit();
   }

   public async addRouterLink() {
    console.log("addRouterLink was called")
    const currentLink = this.bookmarkService.getCurrentRoute();
    this.bookmarkService.saveRouterLink(currentLink);
    const routerLinksArray = this.bookmarkService.getRouterLinksArray();
    this.mergeAndLogRouterLinks();
    this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").PutValue(JSON.stringify(routerLinksArray));
    this.portalPersonAdmin.Data[0].GetEntity().Commit(true);
  }

    // Method to merge router links array without duplicates
    mergeRouterLinks(existingLinks: string[][], newLinks: string[][]): string[][] {
      const mergedLinks = [...existingLinks];
  
      newLinks.forEach(newLinkParts => {
        const isDuplicate = mergedLinks.some(existingLinkParts => {
          if (existingLinkParts.length !== newLinkParts.length) {
            return false;
          }
          return existingLinkParts.every((part, index) => part === newLinkParts[index]);
        });
  
        if (!isDuplicate) {
          mergedLinks.push(newLinkParts);
        }
      });
  
      return mergedLinks;
    }
  
    // Method to merge and log the updated router links array
    mergeAndLogRouterLinks() {
      this.existingLinks = this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").GetValue(JSON.parse);
      const currentLinks = this.bookmarkService.getRouterLinksArray();
      this.existingLinks = this.mergeRouterLinks(this.existingLinks, currentLinks);
      console.log('Updated Router Links Array:', this.existingLinks);
    }

  async ngOnInit(): Promise<void> {
    this.userId = (await this.sessionService.getSessionState()).UserUid;
    this.portalPersonAdmin = (await this.qerClient.typedClient.PortalPersonMasterdataInteractive.Get_byid(this.userId))
    console.log("Bookmark Component Loaded")
  }
}
