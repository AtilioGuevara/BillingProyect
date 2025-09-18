import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesUserFollowersComponent } from './pages-user-followers.component';

describe('PagesUserFollowersComponent', () => {
  let component: PagesUserFollowersComponent;
  let fixture: ComponentFixture<PagesUserFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesUserFollowersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesUserFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
