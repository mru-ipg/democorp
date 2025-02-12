import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPluginComponent } from './custom-plugin.component';

describe('CustomPluginComponent', () => {
  let component: CustomPluginComponent;
  let fixture: ComponentFixture<CustomPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPluginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
