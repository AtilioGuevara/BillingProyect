import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApextreeCollapseExpandComponent } from './apextree-collapse-expand.component';

describe('ApextreeCollapseExpandComponent', () => {
  let component: ApextreeCollapseExpandComponent;
  let fixture: ComponentFixture<ApextreeCollapseExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApextreeCollapseExpandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApextreeCollapseExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
