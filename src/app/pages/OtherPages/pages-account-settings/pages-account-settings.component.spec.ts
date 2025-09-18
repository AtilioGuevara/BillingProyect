import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAccountSettingsComponent } from './pages-account-settings.component';

describe('PagesAccountSettingsComponent', () => {
  let component: PagesAccountSettingsComponent;
  let fixture: ComponentFixture<PagesAccountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesAccountSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
