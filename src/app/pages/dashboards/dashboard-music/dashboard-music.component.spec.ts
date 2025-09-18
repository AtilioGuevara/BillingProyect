import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMusicComponent } from './dashboard-music.component';

describe('DashboardMusicComponent', () => {
  let component: DashboardMusicComponent;
  let fixture: ComponentFixture<DashboardMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMusicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
