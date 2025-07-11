import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  firstName: string = 'Jorge';

  authService: AuthService = inject(AuthService);

  isLogged = computed(() => this.authService.isUserLogged);

  logout() {
    this.authService.logout();
  }
}
