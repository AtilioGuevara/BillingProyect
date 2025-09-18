import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBreadcrumbComponent } from './ui-breadcrumb.component';

describe('UiBreadcrumbComponent', () => {
  let component: UiBreadcrumbComponent;
  let fixture: ComponentFixture<UiBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
