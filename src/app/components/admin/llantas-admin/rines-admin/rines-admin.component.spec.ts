import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RinesAdminComponent } from './rines-admin.component';

describe('RinesAdminComponent', () => {
  let component: RinesAdminComponent;
  let fixture: ComponentFixture<RinesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RinesAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RinesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
