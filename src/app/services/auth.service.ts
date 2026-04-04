import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor() {
    const saved = localStorage.getItem('current_user');
    if (saved) {
      this.currentUserSubject.next(JSON.parse(saved));
    }
  }
  
  login(name: string) {
    const user: User = {
      id: Date.now(),
      name: name,
      email: `${name.toLowerCase()}@example.com`,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      isLoggedIn: true
    };
    this.currentUserSubject.next(user);
    localStorage.setItem('current_user', JSON.stringify(user));
  }
  
  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('current_user');
  }
}