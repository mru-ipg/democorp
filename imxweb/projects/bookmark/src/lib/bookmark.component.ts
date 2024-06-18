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

  constructor(
    private bookmarkService: BookmarkService,
    private readonly sessionService: imx_SessionService,
    private qerClient: QerApiService,
    private router: Router
  ) {
  }

  public async addRouterLink() {
    this.existingLinks = this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").GetValue(JSON.parse);
    const currentLink = this.bookmarkService.getCurrentRoute();
    console.log('Updated Router Links Array:', this.existingLinks);
    let url = this.bookmarkService.getCurrentRoute();
    this.included = this.bookmarkService.checkState(url, this.existingLinks);
    if (this.included = false) {
      this.iconValue = "openbookmark"
    }
    if (this.included = true) {
      this.iconValue = "bookmark"
    }
    this.bookmarkService.saveLink(currentLink, this.existingLinks, this.included, this.iconValue);
    const links = this.bookmarkService.getLinksArray();
    this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").PutValue(JSON.stringify(links));
    this.portalPersonAdmin.Data[0].GetEntity().Commit(true);
  }

  async ngOnInit(): Promise<void> {
    
    console.log(this.included);
    this.userId = (await this.sessionService.getSessionState()).UserUid;
    this.portalPersonAdmin = (await this.qerClient.typedClient.PortalPersonMasterdataInteractive.Get_byid(this.userId));
    this.existingLinks = this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").GetValue(JSON.parse);
    let url = this.bookmarkService.getCurrentRoute();
    this.included = this.bookmarkService.checkState(url, this.existingLinks);
    if (this.included = false) {
      this.iconValue = "openbookmark"
    }
    if (this.included = true) {
      this.iconValue = "bookmark"
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Route changed to:', event.urlAfterRedirects);
      let url = this.bookmarkService.getCurrentRoute();
      this.included = this.bookmarkService.checkState(url, this.existingLinks);
      if (this.included = false) {
        this.iconValue = "openbookmark"
      }
      if (this.included = true) {
        this.iconValue = "bookmark"
      }
    });

    console.log("Bookmark Component Loaded")
  }
}
