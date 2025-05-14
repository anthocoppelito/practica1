import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCatRinesComponent } from './register-cat-rines.component';

describe('RegisterCatRinesComponent', () => {
  let component: RegisterCatRinesComponent;
  let fixture: ComponentFixture<RegisterCatRinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCatRinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCatRinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
