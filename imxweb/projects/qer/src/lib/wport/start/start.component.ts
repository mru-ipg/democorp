/*
 * ONE IDENTITY LLC. PROPRIETARY INFORMATION
 *
 * This software is confidential.  One Identity, LLC. or one of its affiliates or
 * subsidiaries, has supplied this software to you under terms of a
 * license agreement, nondisclosure agreement or both.
 *
 * You may not copy, disclose, or use this software except in accordance with
 * those terms.
 *
 *
 * Copyright 2023 One Identity LLC.
 * ALL RIGHTS RESERVED.
 *
 * ONE IDENTITY LLC. MAKES NO REPRESENTATIONS OR
 * WARRANTIES ABOUT THE SUITABILITY OF THE SOFTWARE,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT.  ONE IDENTITY LLC. SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE
 * AS A RESULT OF USING, MODIFYING OR DISTRIBUTING
 * THIS SOFTWARE OR ITS DERIVATIVES.
 *
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserConfig, ProjectConfig, QerProjectConfig, PortalPersonRolemembershipsAerole } from 'imx-api-qer';
import { UserModelService } from '../../user/user-model.service';
import { PendingItemsType } from '../../user/pending-items-type.interface';
import { ProjectConfigurationService } from '../../project-configuration/project-configuration.service';
import { imx_SessionService, SystemInfoService } from 'qbm';
import { SystemInfo } from 'imx-api-qbm';
import { DashboardService } from './dashboard.service';
import { QerApiService } from '../../qer-api-client.service';

@Component({
  templateUrl: './start.component.html',
  selector: 'imx-start',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  public userConfig: UserConfig;
  public projectConfig: QerProjectConfig & ProjectConfig;
  public pendingItems: PendingItemsType;
  public systemInfo: SystemInfo;
  public viewReady: boolean;
  public userUid: string;
  public aeroles: PortalPersonRolemembershipsAerole[];

  constructor(
    public readonly router: Router,
    private readonly dashboardService: DashboardService,
    private readonly userModelSvc: UserModelService,
    private readonly systemInfoService: SystemInfoService,
    private readonly sessionService: imx_SessionService,
    private readonly detectRef: ChangeDetectorRef,
    private readonly projectConfigurationService: ProjectConfigurationService,
    private readonly qerClient: QerApiService,

  ) {}

  public async ngOnInit(): Promise<void> {
    this.dashboardService.busyStateChanged.subscribe(busy => {
      this.viewReady = !busy;
      this.detectRef.detectChanges();
    });
    const busy = this.dashboardService.beginBusy();
    try {
      this.userConfig = await this.userModelSvc.getUserConfig();
      this.pendingItems = await this.userModelSvc.getPendingItems();
      this.projectConfig = await this.projectConfigurationService.getConfig();
      this.systemInfo = await this.systemInfoService.get();
      this.userUid = (await this.sessionService.getSessionState()).UserUid;
      this.aeroles =  (await this.qerClient.typedClient.PortalPersonRolemembershipsAerole.Get(this.userUid)).Data;

    } finally {
      busy.endBusy();
    }
  }

  public ShowPasswordTile(): boolean {
    return this.userConfig?.ShowPasswordTile;
  }

  public ShowPasswordMgmtTile(): boolean {
    return this.projectConfig?.PasswordConfig.VI_MyData_MyPassword_Visibility && !!this.projectConfig?.PasswordConfig.PasswordMgmtUrl;
  }

  public GoToMyPassword(): void {
    this.router.navigate(['profile', 'profile-password-questions']);
  }

  public GoToPasswordMgmtWeb(): void {
    this.router.navigate(['/externalRedirect', { externalUrl: this.projectConfig?.PasswordConfig.PasswordMgmtUrl }]);
  }

  public GoToShoppingCart(): void {
    this.router.navigate(['shoppingcart']);
  }

  public GoToProductSelection(): void {
    this.router.navigate(['newrequest']);
  }

  public GoToItshopApprovals(): void {
    this.router.navigate(['itshop', 'approvals']);
  }

  public GoToItShopApprovalInquiries(): void {
    this.router.navigate(['itshop', 'approvals'], {queryParams: {inquiries:true}});
  }

  public GoToMyProcesses(): void {
    this.router.navigate(['/QBM_MyProcesses'], {});
  }

  public ShowQpmIntegration(): boolean {
    return !!this.projectConfig?.PasswordConfig.QpmBaseUrl;
  }

  public GoToQpm(): void {
    this.router.navigate(['qpmintegration'], {});
  }

  public GoToDashboardEmployeesByRiskIndex(): void {
    // TODO (ADO 207303) this.router.navigate(['/VI_Start_Governance'], { Part: 'Risk' });
  }

  public GoToDashboardOrganization(): void {
    // TODO (ADO 207303) this.router.navigate(['/VI_Start_Governance'], { Part: 'Organization' });
  }

  public GoToDashboardRequests(): void {
    // TODO (ADO 207303) this.router.navigate(['/VI_Start_Governance'], { Part: 'ITShop' });
  }

  public GetCountProductsinShoppingCart(): number {
    return this.pendingItems?.CountProductsInShoppingCart;
  }

  public GetCountInRequestHistory(): number {
    return this.userConfig.CountPendingRequests;
  }

  public GetCountPendingRequests(): number {
    return this.pendingItems?.OpenPWO;
  }

  public GetCountRequestInquiries(): number {
    return this.pendingItems?.OpenInquiries;
  }

  public GetCountNewProcesses(): number {
    return 0; // hide for now
    // return this.pendingItems.NewProcesses;
  }

  public ShowPasswordLink(): boolean {
    // TODO (TFS 805999) not(isnullorempty(getconfig('VI_Common_PasswordWebLink')))
    return true;
  }

  public ShowNewRequestLink(): boolean {
    // Starting a new request is only allowed when the session has an identity and the ITShop(Requests) feature is enabled
    return this.userConfig?.IsITShopEnabled && this.userUid && this.systemInfo.PreProps.includes('ITSHOP');
  }
}
