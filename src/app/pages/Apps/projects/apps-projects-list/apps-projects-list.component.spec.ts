import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsProjectsListComponent } from './apps-projects-list.component';

describe('AppsProjectsListComponent', () => {
  let component: AppsProjectsListComponent;
  let fixture: ComponentFixture<AppsProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsProjectsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
