import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameFileModalComponent } from './rename-file-modal.component';

describe('RenameFileModalComponent', () => {
  let component: RenameFileModalComponent;
  let fixture: ComponentFixture<RenameFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenameFileModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenameFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
