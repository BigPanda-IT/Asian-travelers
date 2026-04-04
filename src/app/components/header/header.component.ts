import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

const STICKERS = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐴', '🐝',
  '🐙', '🦋', '🐳', '🐬', '🐲', '🌵', '🚀', '👩‍🚀', '🧸'
];

function getRandomSticker(): string {
  return STICKERS[Math.floor(Math.random() * STICKERS.length)];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showLoginModal = false;
  authMode: 'login' | 'register' = 'login';
  loginName = '';
  userSticker: string = '';

  constructor(
    public authService: AuthService,
    private postService: PostService,
    private router: Router
  ) {}
  
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.postService.setSearchTerm(input.value);
  }
  
  login() {
    if (this.loginName.trim()) {
      this.userSticker = getRandomSticker();  
      localStorage.setItem('user_sticker', this.userSticker);
      this.authService.login(this.loginName);
      this.showLoginModal = false;
      this.loginName = '';
    }
  }
  
  logout() {
    this.authService.logout();
  }

  goHome() {
    // Переход на главную
    this.router.navigate(['/']);
    
    // Скролл вверх
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }
}