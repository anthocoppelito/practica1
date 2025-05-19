import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasAdminComponent } from './marcas-admin.component';

describe('MarcasAdminComponent', () => {
  let component: MarcasAdminComponent;
  let fixture: ComponentFixture<MarcasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
