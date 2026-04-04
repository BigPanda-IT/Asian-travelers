import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @Output() publish = new EventEmitter<void>();
  @Output() read = new EventEmitter<void>();
  @Output() countryFilter = new EventEmitter<string>();
  
  rightTab: 'authors' | 'top' = 'authors';
  
  countries = [
    { flag: '🇯🇵', name: 'Япония', posts: 156 },
    { flag: '🇹🇭', name: 'Таиланд', posts: 234 },
    { flag: '🇻🇳', name: 'Вьетнам', posts: 98 },
    { flag: '🇮🇳', name: 'Индия', posts: 87 },
    { flag: '🇮🇩', name: 'Индонезия', posts: 143 }
  ];
  
  topAuthors = [
    { name: 'Анна Иванова', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', posts: 24, likes: 1234 },
    { name: 'Макс Петров', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', posts: 18, likes: 987 },
    { name: 'Елена Смирнова', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', posts: 15, likes: 876 }
  ];
  
  topPosts = [
    { title: 'Скрытый пляж на Пхукете', likes: 456, author: 'Анна' },
    { title: 'Бали: рай для серферов', likes: 398, author: 'Макс' },
    { title: 'Храмы Киото', likes: 345, author: 'Анна' }
  ];
  
  stats = {
    users: '10,000',
    usersGrowth: '+23%',
    places: '5,000',
    placesLabel: 'новые каждый день',
    views: '1.2',
    viewsLabel: 'M+ просмотров'
  };
  
  features = [
    { icon: '📍', title: 'Точные локации', tooltip: 'Каждое место отмечено на карте с GPS-координатами' },
    { icon: '📸', title: 'Фотоотчеты', tooltip: 'Тысячи фото от настоящих путешественников' },
    { icon: '💬', title: 'Честные отзывы', tooltip: 'Только реальный опыт, без прикрас' }
  ];
  
  openPublishForm() {
    this.publish.emit();
  }
  
  scrollToFeed() {
    this.read.emit();
  }
  
  filterByCountry(countryName: string) {
    this.countryFilter.emit(countryName);
  }
}