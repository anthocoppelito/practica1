import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosAdminComponent } from './modelos-admin.component';

describe('ModelosAdminComponent', () => {
  let component: ModelosAdminComponent;
  let fixture: ComponentFixture<ModelosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelosAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
