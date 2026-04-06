import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

const STICKERS = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐴', '🐝',
  '🐙', '🦋', '🐳', '🐬', '🐲', '🌵', '🚀', '👩‍🚀', '🧸'
];

function getRandomSticker(): string {
  return STICKERS[Math.floor(Math.random() * STICKERS.length)];
}

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
    { flag: 'https://flagsapi.com/CN/flat/32.png', name: 'Китай', posts: 13 },
    { flag: 'https://flagcdn.com/th.svg', name: 'Таиланд', posts: 8 },
    { flag: 'https://flagcdn.com/jp.svg', name: 'Япония', posts: 11 },
    { flag: 'https://flagcdn.com/sg.svg', name: 'Сингапур', posts: 2 },
    { flag: 'https://flagcdn.com/my.svg', name: 'Малайзия', posts: 3 },
    { flag: 'https://flagcdn.com/vn.svg', name: 'Вьетнам', posts: 7 },
    { flag: 'https://flagsapi.com/IN/flat/32.png', name: 'Индия', posts: 0 },
    { flag: 'https://flagcdn.com/id.svg', name: 'Индонезия', posts: 5 }
  ];
  
  topAuthors = [
    { name: 'Анна Иванова', sticker: getRandomSticker(), posts: 7, likes: 234 },
    { name: 'Макс Петров', sticker: getRandomSticker(), posts: 5, likes: 145 },
    { name: 'Елена Смирнова', sticker: getRandomSticker(), posts: 4, likes: 136 },
    { name: 'Дмитрий Козлов', sticker: getRandomSticker(), posts: 6, likes: 123 },
    { name: 'Ольга Новикова', sticker: getRandomSticker(), posts: 3, likes: 98 }
  ];
  
  topPosts = [
    { title: 'Райский пляж Пхукета', likes: 164, author: 'Анна' },
    { title: 'Бали: рай для серферов', likes: 121, author: 'Макс' },
    { title: 'Храмы Киото', likes: 97, author: 'Дмитрий' },
    { title: 'Вьетнам на байке', likes: 88, author: 'Елена' },
    { title: 'Токио за 3 дня', likes: 65, author: 'Ольга' },
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

  getMedal(index: number): string {
    const medals = ['🥇', '🥈', '🥉', '⭐', '⭐'];
    return medals[index] || '📌';
  }
}