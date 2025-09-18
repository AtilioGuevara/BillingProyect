import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsFileManagerComponent } from './apps-file-manager.component';

describe('AppsFileManagerComponent', () => {
  let component: AppsFileManagerComponent;
  let fixture: ComponentFixture<AppsFileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsFileManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsFileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
