import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtlinventariollantasAdminComponent } from './ctlinventariollantas-admin.component';

describe('CtlinventariollantasAdminComponent', () => {
  let component: CtlinventariollantasAdminComponent;
  let fixture: ComponentFixture<CtlinventariollantasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtlinventariollantasAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtlinventariollantasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
