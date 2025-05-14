import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCtlInventariollantasComponent } from './register-ctl-inventariollantas.component';

describe('RegisterCtlInventariollantasComponent', () => {
  let component: RegisterCtlInventariollantasComponent;
  let fixture: ComponentFixture<RegisterCtlInventariollantasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCtlInventariollantasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCtlInventariollantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
