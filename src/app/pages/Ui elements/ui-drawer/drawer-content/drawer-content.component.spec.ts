import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerContentComponent } from './drawer-content.component';

describe('DrawerContentComponent', () => {
  let component: DrawerContentComponent;
  let fixture: ComponentFixture<DrawerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
