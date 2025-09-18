import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsProjectsUsersComponent } from './apps-projects-users.component';

describe('AppsProjectsUsersComponent', () => {
  let component: AppsProjectsUsersComponent;
  let fixture: ComponentFixture<AppsProjectsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsProjectsUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsProjectsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
