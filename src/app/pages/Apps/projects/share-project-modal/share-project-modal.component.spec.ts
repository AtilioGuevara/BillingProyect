import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareProjectModalComponent } from './share-project-modal.component';

describe('ShareProjectModalComponent', () => {
  let component: ShareProjectModalComponent;
  let fixture: ComponentFixture<ShareProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareProjectModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
