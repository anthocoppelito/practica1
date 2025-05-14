import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCatModelosComponent } from './register-cat-modelos.component';

describe('RegisterCatModelosComponent', () => {
  let component: RegisterCatModelosComponent;
  let fixture: ComponentFixture<RegisterCatModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCatModelosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCatModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
