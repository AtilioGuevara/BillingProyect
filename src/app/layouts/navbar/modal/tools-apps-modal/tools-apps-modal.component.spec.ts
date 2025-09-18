import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsAppsModalComponent } from './tools-apps-modal.component';

describe('ToolsAppsModalComponent', () => {
  let component: ToolsAppsModalComponent;
  let fixture: ComponentFixture<ToolsAppsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsAppsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsAppsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
