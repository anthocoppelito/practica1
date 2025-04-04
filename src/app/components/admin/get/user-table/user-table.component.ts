import { Component, OnInit } from '@angular/core';
import { User } from '../../../../services/auth/user';
import { UserService } from '../../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  users: User[] = []; // Lista de usuarios

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data; // Asignar los usuarios a la variable
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      },
    });
  }

  navegate(username: String){
    this.router.navigate(['/admin/editar', username]);

  }

}
