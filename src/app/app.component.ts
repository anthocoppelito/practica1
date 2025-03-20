import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from "./shared/nav/nav.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'primera-app';
}
