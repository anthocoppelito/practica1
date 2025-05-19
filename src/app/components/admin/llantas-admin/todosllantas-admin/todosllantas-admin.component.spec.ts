import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosllantasAdminComponent } from './todosllantas-admin.component';

describe('TodosllantasAdminComponent', () => {
  let component: TodosllantasAdminComponent;
  let fixture: ComponentFixture<TodosllantasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosllantasAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosllantasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
