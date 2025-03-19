import { Component } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userLoginOn: boolean= false;
}
