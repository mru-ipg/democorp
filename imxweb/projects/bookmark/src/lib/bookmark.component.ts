import { Component, OnInit } from '@angular/core';
import { BookmarkService } from './bookmark.service';
import { QerApiService } from 'qer';
import { imx_SessionService } from 'qbm';
import { PortalPersonMasterdata } from 'imx-api-qer';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'imx-bookmark',
  templateUrl: './bookmark.component.html',
  styles: [
  ]
})
export class BookmarkComponent implements OnInit {
  public userId: string;
  public portalPersonAdmin: any;
  public portalPerson: PortalPersonMasterdata;
  existingLinks: string[] = [];
  included: boolean;
  iconValue: string;
  url: string;

  constructor(
    private bookmarkService: BookmarkService,
    private readonly sessionService: imx_SessionService,
    private qerClient: QerApiService,
    private router: Router
  ) {
    this.url = this.bookmarkService.getCurrentRoute();
  }

  public async addRouterLink() {
    this.existingLinks = this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").GetValue(JSON.parse);
    console.log('Updated Router Links Array:', this.existingLinks);
    this.bookmarkService.checkState(this.url, this.existingLinks, this.iconValue,  this.included);
    this.bookmarkService.updateBookmarks(this.url, this.existingLinks,this.iconValue,  this.included);
    this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").PutValue(JSON.stringify(this.existingLinks));
    this.portalPersonAdmin.Data[0].GetEntity().Commit(true);
  }

  async ngOnInit(): Promise<void> {
    this.userId = (await this.sessionService.getSessionState()).UserUid;
    this.portalPersonAdmin = (await this.qerClient.typedClient.PortalPersonMasterdataInteractive.Get_byid(this.userId));
    this.existingLinks = this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").GetValue(JSON.parse);
    this.bookmarkService.checkState(this.url, this.existingLinks, this.iconValue,  this.included);
    this.bookmarkService.initializeBookmarks(this.iconValue,this.included);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Route changed to:', event.urlAfterRedirects);
      this.bookmarkService.checkState(this.url, this.existingLinks, this.iconValue,  this.included)
      this.bookmarkService.initializeBookmarks(this.iconValue,this.included);
    });

    console.log("Bookmark Component Loaded")
  }
}
