import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsBoxiconComponent } from './icons-boxicon.component';

describe('IconsBoxiconComponent', () => {
  let component: IconsBoxiconComponent;
  let fixture: ComponentFixture<IconsBoxiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsBoxiconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsBoxiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
