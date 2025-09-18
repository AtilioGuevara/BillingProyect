import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLoaderComponent } from './ui-loader.component';

describe('UiLoaderComponent', () => {
  let component: UiLoaderComponent;
  let fixture: ComponentFixture<UiLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
