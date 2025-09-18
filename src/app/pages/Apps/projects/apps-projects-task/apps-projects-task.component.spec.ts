import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsProjectsTaskComponent } from './apps-projects-task.component';

describe('AppsProjectsTaskComponent', () => {
  let component: AppsProjectsTaskComponent;
  let fixture: ComponentFixture<AppsProjectsTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsProjectsTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsProjectsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
