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

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserConfig, ProjectConfig, QerProjectConfig, OwnershipInformation } from 'imx-api-qer';
import { UserModelService } from '../../user/user-model.service';
import { PendingItemsType } from '../../user/pending-items-type.interface';
import { ProjectConfigurationService } from '../../project-configuration/project-configuration.service';
import {
  AppConfigService,
  BusyService,
  CdrFactoryService,
  ClassloggerService,
  DataSourceToolbarExportMethod,
  DataSourceToolbarFilter,
  DataSourceToolbarGroupData,
  DataSourceToolbarSettings,
  DataSourceToolbarViewConfig,
  ErrorService,
  imx_SessionService,
  MetadataService,
  SettingsService,
  SystemInfoService,
} from 'qbm';
import { SystemInfo } from 'imx-api-qbm';
import { DashboardService } from './dashboard.service';
import { CollectionLoadParameters, DataModel, DataModelProperty, DisplayColumns, EntitySchema, IClientProperty, IEntity, ValType } from 'imx-qbm-dbts';
import { IdentitiesService } from '../../identities/identities.service';
import { EuiLoadingService, EuiSidesheetService } from '@elemental-ui/core';
import { TranslateService } from '@ngx-translate/core';
import { CreateNewIdentityComponent } from '../../identities/create-new-identity/create-new-identity.component';
import { QerPermissionsService } from '../../admin/qer-permissions.service';
import { TreeDatabaseAdaptorService } from '../../role-management/roles-overview/tree-database-adaptor.service';
import { RoleService } from '../../role-management/role.service';
import { NewRoleComponent } from '../../role-management/new-role/new-role.component';
import { ViewConfigService } from '../../view-config/view-config.service';
import { QerApiService } from '../../qer-api-client.service';
import { DepartmentMembership } from '../../role-management/role-memberships/membership-handlers';

@Component({
  templateUrl: './start.component.html',
  selector: 'imx-start',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  public entitySchema: EntitySchema;
  public userConfig: UserConfig;
  public projectConfig: QerProjectConfig & ProjectConfig;
  public pendingItems: PendingItemsType;
  public systemInfo: SystemInfo;
  public viewReady: boolean;
  public userUid: string;
  public viewConfigPath: string;
  @Input() public isAdmin = false;
  public data: OwnershipInformation = {
    TableName: 'Department',
    Count: 0

  };
  public data2: OwnershipInformation = {
    TableName: 'Locality',
    Count: 0

  };
  public data3: OwnershipInformation = {
    TableName: 'ProfitCenter',
    Count: 0

  };
  public ownershipInfo: OwnershipInformation;
  public ownershipInfoLocality: OwnershipInformation;
  public ownershipInfoProfitCenter: OwnershipInformation;
  
  public personUID: string;
  public busyService = new BusyService();
  private groupingInfo: DataSourceToolbarGroupData;
  public navigationState: CollectionLoadParameters;
  public groupingOptions: DataModelProperty[] = [];
  private displayedColumns: IClientProperty[] = [];
  public dstSettings: DataSourceToolbarSettings;
  public readonly entitySchemaPersonReports: EntitySchema;
  public filterOptions: DataSourceToolbarFilter[] = [];
  private dataModel: DataModel;
  private viewConfig: DataSourceToolbarViewConfig;
  public isManagerForPersons: boolean;
  public isPersonAdmin: boolean;
  public readonly DisplayColumns = DisplayColumns;
  public useTree = false;
<<<<<<< HEAD
=======
  private canCreateAeRole: boolean;
  private isStructureAdmin: boolean;
>>>>>>> 9730d141e537d4a39b903440b56e6e6598cca7b2
  public treeDatabase: TreeDatabaseAdaptorService;
  public canCreate: boolean;
  public hasHierarchy = false;
  public displayColumns: IClientProperty[];
  public ValType = ValType; 
  
  

  private disposable: () => void;

  constructor(
<<<<<<< HEAD
    private readonly sidesheet: EuiSidesheetService,
=======
    private viewConfigService: ViewConfigService,
    private readonly sidesheet: EuiSidesheetService,
    private activatedRoute: ActivatedRoute,
>>>>>>> 9730d141e537d4a39b903440b56e6e6598cca7b2
    private readonly busyServiceElemental: EuiLoadingService,
    private readonly identitiesService: IdentitiesService,
    private readonly sideSheet: EuiSidesheetService,
    private readonly translate: TranslateService,
    private readonly logger: ClassloggerService,
<<<<<<< HEAD
=======
    private readonly configService: ProjectConfigurationService,
>>>>>>> 9730d141e537d4a39b903440b56e6e6598cca7b2
    settingsService: SettingsService,
    private readonly roleService: RoleService,
    public readonly router: Router,
    private readonly dashboardService: DashboardService,
    private readonly userModelSvc: UserModelService,
    private readonly systemInfoService: SystemInfoService,
    private readonly sessionService: imx_SessionService,
    private readonly detectRef: ChangeDetectorRef,
    private readonly projectConfigurationService: ProjectConfigurationService,
<<<<<<< HEAD
    private readonly appConfig: AppConfigService,
    private readonly route: ActivatedRoute,
    private readonly errorService: ErrorService  ) {
=======
    private readonly userModelService: UserModelService,
    private readonly metadataProvider: MetadataService,
    private readonly permission: QerPermissionsService,
    private readonly appConfig: AppConfigService,
    private readonly settings: SettingsService,
    private readonly route: ActivatedRoute,
    private readonly errorService: ErrorService,
    private readonly qerApiClient: QerApiService
  ) {
>>>>>>> 9730d141e537d4a39b903440b56e6e6598cca7b2
    this.navigationState = { PageSize: settingsService.DefaultPageSize, StartIndex: 0 };
  }

  public async ngOnInit(): Promise<void> {
    this.ownershipInfo = this.data;
    this.ownershipInfoLocality = this.data2;
    this.ownershipInfoProfitCenter = this.data3;
    this.isAdmin = this.route.snapshot?.url[0]?.path === 'admin';
    this.roleService.isAdmin = this.isAdmin;
    
    this.dashboardService.busyStateChanged.subscribe((busy) => {
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
    } finally {
      busy.endBusy();
    }
    await this.navigate();
    //await this.init();
<<<<<<< HEAD
=======
  }

  public async createNewDepartment(entity?: IEntity): Promise<void> {
    const tablename = this.generateCdrTableName(0,"Department");
    console.log(entity);
    const over = this.busyServiceElemental.show();
    let newEntity = null;

    try {
      newEntity = await this.roleService.getInteractiveNew(tablename.TableName);
      const column = CdrFactoryService.tryGetColumn(newEntity.GetEntity(), `UID_Parent${tablename.TableName}`);
      if (entity != null) {
         if (column) {
          await column.PutValue(entity.GetKeys()[0]);
        }
      }
    } finally {
      this.busyServiceElemental.hide(over);
    }

    if (newEntity == null) {
      return;
    }

    this.disposable = this.errorService.setTarget('sidesheet');
    const sidesheetRef = this.sidesheet.open(NewRoleComponent, {
      title: await this.translate
        .get(this.roleService.getRoleTranslateKeys("Department")?.createHeading ?? '#LDS#Heading Create Object')
        .toPromise(),
      padding: '0px',
      width: 'max(500px, 50%)',
      disableClose: true,
      testId: 'role-create-sidesheet',
      data: {
        typedEntity: newEntity,
        info: this.ownershipInfo,
        isAdmin: this.isAdmin,
        parentDepartmentUid: entity?.GetKeys()[0],
      },
    });

    sidesheetRef.afterClosed().subscribe(async (result) => {
      this.disposable();
      if (result) {
        await this.navigate();
      }
    });
  }

  
  public async createNewLocation(entity?: IEntity): Promise<void> {
    const tablename = this.generateCdrTableName(0,"Locality");
    console.log(entity);
    const over = this.busyServiceElemental.show();
    let newEntity = null;

    try {
      newEntity = await this.roleService.getInteractiveNew(tablename.TableName);
      const column = CdrFactoryService.tryGetColumn(newEntity.GetEntity(), `UID_Parent${tablename.TableName}`);
      if (entity != null) {
         if (column) {
          await column.PutValue(entity.GetKeys()[0]);
        }
      }
    } finally {
      this.busyServiceElemental.hide(over);
    }

    if (newEntity == null) {
      return;
    }

    this.disposable = this.errorService.setTarget('sidesheet');
    const sidesheetRef = this.sidesheet.open(NewRoleComponent, {
      title: await this.translate
        .get(this.roleService.getRoleTranslateKeys("Locality")?.createHeading ?? '#LDS#Heading Create Object')
        .toPromise(),
      padding: '0px',
      width: 'max(500px, 50%)',
      disableClose: true,
      testId: 'role-create-sidesheet',
      data: {
        typedEntity: newEntity,
        info: this.ownershipInfoLocality,
        isAdmin: this.isAdmin,
        parentDepartmentUid: entity?.GetKeys()[0],
      },
    });

    sidesheetRef.afterClosed().subscribe(async (result) => {
      this.disposable();
      if (result) {
        await this.navigate();
      }
    });
  }

  public async createNewCostCenter(entity?: IEntity): Promise<void> {
    const tablename = this.generateCdrTableName(0,"ProfitCenter");
    console.log(entity);
    const over = this.busyServiceElemental.show();
    let newEntity = null;

    try {
      newEntity = await this.roleService.getInteractiveNew(tablename.TableName);
      const column = CdrFactoryService.tryGetColumn(newEntity.GetEntity(), `UID_Parent${tablename.TableName}`);
      if (entity != null) {
         if (column) {
          await column.PutValue(entity.GetKeys()[0]);
        }
      }
    } finally {
      this.busyServiceElemental.hide(over);
    }

    if (newEntity == null) {
      return;
    }

    this.disposable = this.errorService.setTarget('sidesheet');
    const sidesheetRef = this.sidesheet.open(NewRoleComponent, {
      title: await this.translate
        .get(this.roleService.getRoleTranslateKeys("ProfitCenter")?.createHeading ?? '#LDS#Heading Create Object')
        .toPromise(),
      padding: '0px',
      width: 'max(500px, 50%)',
      disableClose: true,
      testId: 'role-create-sidesheet',
      data: {
        typedEntity: newEntity,
        info: this.ownershipInfoProfitCenter,
        isAdmin: this.isAdmin,
        parentDepartmentUid: entity?.GetKeys()[0],
      },
    });

    sidesheetRef.afterClosed().subscribe(async (result) => {
      this.disposable();
      if (result) {
        await this.navigate();
      }
    });
  }


  public async createNewIdentity(): Promise<void> {
    await this.sideSheet
      .open(CreateNewIdentityComponent, {
        title: await this.translate.get('#LDS#Heading Create Identity').toPromise(),
        padding: '0px',
        //width: 'max(650px, 65%)',
        disableClose: true,
        testId: 'create-new-identity-sidesheet',
        icon: 'contactinfo',
        data: {
          selectedIdentity: await this.identitiesService.createEmptyEntity(),
          projectConfig: this.projectConfig,
        },
      })
      .afterClosed()
      .toPromise();

    return this.navigate();
  }

  private async navigate(): Promise<void> {
    const isBusy = this.busyService.beginBusy();

    try {
      this.logger.debug(this, `Retrieving person list`);
      this.logger.trace('Navigation settings', this.navigationState);
      if (!this.groupingInfo && this.groupingOptions.length > 0) {
        this.groupingInfo = {
          groups: [
            {
              property: this.groupingOptions[0],
              getData: async () => {
                return this.identitiesService.getGroupedAllPerson('IdentityType', {
                  PageSize: this.navigationState.PageSize,
                  StartIndex: 0,
                  withProperties: this.navigationState.withProperties,
                });
              },
            },
          ],
        };
      }

      const data = this.isAdmin
        ? await this.identitiesService.getAllPersonAdmin(this.navigationState)
        : await this.identitiesService.getReportsOfManager(this.navigationState);
      const exportMethod: DataSourceToolbarExportMethod = this.isAdmin
        ? this.identitiesService.exportAdminPerson(this.navigationState)
        : this.identitiesService.exportPerson(this.navigationState);
      exportMethod.initialColumns = this.displayedColumns.map((col) => col.ColumnName);

      this.dstSettings = {
        displayedColumns: this.displayedColumns,
        dataSource: data,
        entitySchema: this.entitySchemaPersonReports,
        navigationState: this.navigationState,
        filters: this.filterOptions,
        groupData: this.groupingInfo,
        dataModel: this.dataModel,
        viewConfig: this.viewConfig,
        exportMethod,
      };
      this.logger.debug(this, `Head at ${data.Data.length + this.navigationState.StartIndex} of ${data.totalCount} item(s)`);
    } finally {
      isBusy.endBusy();
    }
  }
  public NavigateToPendingRequests(): void {
    this.router.navigate(['itshop', 'approvals']);
  }

  private navigateToStartPage(error?: any): void {
    this.logger.error(this, error);
    this.router.navigate([this.appConfig.Config.routeConfig.start], { queryParams: {} });
>>>>>>> 9730d141e537d4a39b903440b56e6e6598cca7b2
  }

  public async createNewDepartment(entity?: IEntity): Promise<void> {
    const tablename = this.generateCdrTableName(0,"Department");
    console.log(entity);
    const over = this.busyServiceElemental.show();
    let newEntity = null;

    try {
      newEntity = await this.roleService.getInteractiveNew(tablename.TableName);
      const column = CdrFactoryService.tryGetColumn(newEntity.GetEntity(), `UID_Parent${tablename.TableName}`);
      if (entity != null) {
         if (column) {
          await column.PutValue(entity.GetKeys()[0]);
        }
      }
    } finally {
      this.busyServiceElemental.hide(over);
    }

    if (newEntity == null) {
      return;
    }

    this.disposable = this.errorService.setTarget('sidesheet');
    const sidesheetRef = this.sidesheet.open(NewRoleComponent, {
      title: await this.translate
        .get(this.roleService.getRoleTranslateKeys("Department")?.createHeading ?? '#LDS#Heading Create Object')
        .toPromise(),
      padding: '0px',
      width: 'max(500px, 50%)',
      disableClose: true,
      testId: 'role-create-sidesheet',
      data: {
        typedEntity: newEntity,
        info: this.ownershipInfo,
        isAdmin: this.isAdmin,
        parentDepartmentUid: entity?.GetKeys()[0],
      },
    });

    sidesheetRef.afterClosed().subscribe(async (result) => {
      this.disposable();
      if (result) {
        await this.navigate();
      }
    });
  }

  
  public async createNewLocation(entity?: IEntity): Promise<void> {
    const tablename = this.generateCdrTableName(0,"Locality");
    console.log(entity);
    const over = this.busyServiceElemental.show();
    let newEntity = null;

    try {
      newEntity = await this.roleService.getInteractiveNew(tablename.TableName);
      const column = CdrFactoryService.tryGetColumn(newEntity.GetEntity(), `UID_Parent${tablename.TableName}`);
      if (entity != null) {
         if (column) {
          await column.PutValue(entity.GetKeys()[0]);
        }
      }
    } finally {
      this.busyServiceElemental.hide(over);
    }

    if (newEntity == null) {
      return;
    }

    this.disposable = this.errorService.setTarget('sidesheet');
    const sidesheetRef = this.sidesheet.open(NewRoleComponent, {
      title: await this.translate
        .get(this.roleService.getRoleTranslateKeys("Locality")?.createHeading ?? '#LDS#Heading Create Object')
        .toPromise(),
      padding: '0px',
      width: 'max(500px, 50%)',
      disableClose: true,
      testId: 'role-create-sidesheet',
      data: {
        typedEntity: newEntity,
        info: this.ownershipInfoLocality,
        isAdmin: this.isAdmin,
        parentDepartmentUid: entity?.GetKeys()[0],
      },
    });

    sidesheetRef.afterClosed().subscribe(async (result) => {
      this.disposable();
      if (result) {
        await this.navigate();
      }
    });
  }

  public async createNewCostCenter(entity?: IEntity): Promise<void> {
    const tablename = this.generateCdrTableName(0,"ProfitCenter");
    console.log(entity);
    const over = this.busyServiceElemental.show();
    let newEntity = null;

    try {
      newEntity = await this.roleService.getInteractiveNew(tablename.TableName);
      const column = CdrFactoryService.tryGetColumn(newEntity.GetEntity(), `UID_Parent${tablename.TableName}`);
      if (entity != null) {
         if (column) {
          await column.PutValue(entity.GetKeys()[0]);
        }
      }
    } finally {
      this.busyServiceElemental.hide(over);
    }

    if (newEntity == null) {
      return;
    }

    this.disposable = this.errorService.setTarget('sidesheet');
    const sidesheetRef = this.sidesheet.open(NewRoleComponent, {
      title: await this.translate
        .get(this.roleService.getRoleTranslateKeys("ProfitCenter")?.createHeading ?? '#LDS#Heading Create Object')
        .toPromise(),
      padding: '0px',
      width: 'max(500px, 50%)',
      disableClose: true,
      testId: 'role-create-sidesheet',
      data: {
        typedEntity: newEntity,
        info: this.ownershipInfoProfitCenter,
        isAdmin: this.isAdmin,
        parentDepartmentUid: entity?.GetKeys()[0],
      },
    });

    sidesheetRef.afterClosed().subscribe(async (result) => {
      this.disposable();
      if (result) {
        await this.navigate();
      }
    });
  }


  public async createNewIdentity(): Promise<void> {
    await this.sideSheet
      .open(CreateNewIdentityComponent, {
        title: await this.translate.get('#LDS#Heading Create Identity').toPromise(),
        padding: '0px',
        width: 'max(650px, 65%)',
        disableClose: true,
        testId: 'create-new-identity-sidesheet',
        icon: 'contactinfo',
        data: {
          selectedIdentity: await this.identitiesService.createEmptyEntity(),
          projectConfig: this.projectConfig,
        },
      })
      .afterClosed()
      .toPromise();

    return this.navigate();
  }

  private async navigate(): Promise<void> {
    const isBusy = this.busyService.beginBusy();

    try {
      this.logger.debug(this, `Retrieving person list`);
      this.logger.trace('Navigation settings', this.navigationState);
      if (!this.groupingInfo && this.groupingOptions.length > 0) {
        this.groupingInfo = {
          groups: [
            {
              property: this.groupingOptions[0],
              getData: async () => {
                return this.identitiesService.getGroupedAllPerson('IdentityType', {
                  PageSize: this.navigationState.PageSize,
                  StartIndex: 0,
                  withProperties: this.navigationState.withProperties,
                });
              },
            },
          ],
        };
      }

      const data = this.isAdmin
        ? await this.identitiesService.getAllPersonAdmin(this.navigationState)
        : await this.identitiesService.getReportsOfManager(this.navigationState);
      const exportMethod: DataSourceToolbarExportMethod = this.isAdmin
        ? this.identitiesService.exportAdminPerson(this.navigationState)
        : this.identitiesService.exportPerson(this.navigationState);
      exportMethod.initialColumns = this.displayedColumns.map((col) => col.ColumnName);

      this.dstSettings = {
        displayedColumns: this.displayedColumns,
        dataSource: data,
        entitySchema: this.entitySchemaPersonReports,
        navigationState: this.navigationState,
        filters: this.filterOptions,
        groupData: this.groupingInfo,
        dataModel: this.dataModel,
        viewConfig: this.viewConfig,
        exportMethod,
      };
      this.logger.debug(this, `Head at ${data.Data.length + this.navigationState.StartIndex} of ${data.totalCount} item(s)`);
    } finally {
      isBusy.endBusy();
    }
  }
  public NavigateToPendingRequests(): void {
    this.router.navigate(['itshop', 'approvals']);
  }

  public NavigateToAddressBook(): void {
    this.router.navigate(['addressbook']);
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
    this.router.navigate(['itshop', 'approvals'], { queryParams: { inquiries: true } });
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

  public generateCdrTableName(count:number, tableName?: string, TableNameDisplay?:string ) :OwnershipInformation {
    return {

      TableName: tableName,
      TableNameDisplay,
      Count: count

    }
  }
}
