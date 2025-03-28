import { Component } from '@angular/core';
import { TestService } from '../../../services/tests/test.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  errorMessage : String ="";
  testData: String="";
  
  constructor(private testService:TestService){
  
    this.testService.getTest().subscribe({
      next: (testData) => {
        this.testData=testData;
      },
      error: (errorData) =>{
        this.errorMessage=errorData;
      },
      complete: () =>{
        console.info("todo ok");
        console.log(this.testData);
      }
    })
  }
}
