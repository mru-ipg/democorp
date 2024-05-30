import { Component, OnInit } from '@angular/core';
import { BookmarkService } from './bookmark.service';
import { QerApiService } from 'qer';
import { imx_SessionService } from 'qbm';
import { PortalPersonMasterdata } from 'imx-api-qer';

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
  existingLinks: string[][] = [];

  constructor(
    private bookmarkService: BookmarkService,
    private readonly sessionService: imx_SessionService,
    private qerClient: QerApiService,
  ) {
  }

  public async addRouterLink() {
    this.existingLinks = this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").GetValue(JSON.parse);
    const test = this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").GetValue(JSON.parse);
    const currentLink = this.bookmarkService.getCurrentRoute();

    this.bookmarkService.saveRouterLink(currentLink);
    console.log('Updated Router Links Array:', this.existingLinks);

    const routerLinksArray = this.bookmarkService.getRouterLinksArray();

    const mergedArray = this.bookmarkService.compareAndMergeArrays(this.existingLinks, this.bookmarkService.getRouterLinksArray());

    this.portalPersonAdmin.Data[0].GetEntity().GetColumn("CustomProperty09").PutValue(JSON.stringify(mergedArray));
    this.portalPersonAdmin.Data[0].GetEntity().Commit(true);
  }

  async ngOnInit(): Promise<void> {
    this.userId = (await this.sessionService.getSessionState()).UserUid;
    this.portalPersonAdmin = (await this.qerClient.typedClient.PortalPersonMasterdataInteractive.Get_byid(this.userId))
    console.log("Bookmark Component Loaded")
  }
}
