import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceCategoryComponent } from './apps-ecommerce-category.component';

describe('AppsEcommerceCategoryComponent', () => {
  let component: AppsEcommerceCategoryComponent;
  let fixture: ComponentFixture<AppsEcommerceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
