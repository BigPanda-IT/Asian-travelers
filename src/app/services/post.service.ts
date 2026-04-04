import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Post } from '../models/post';

// СПИСОК СТИКЕРОВ
const STICKERS = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐴', '🦄',
  '🐳', '🐬', '🐙', '🚀', '👩‍🚀', '👨‍🚀', '🛸', '🌍', '⭐', '🌟',
  '😊', '🥰', '😎', '🤩', '🫶', '💪', '🎉', '✨'
];

function getRandomSticker(): string {
  return STICKERS[Math.floor(Math.random() * STICKERS.length)];
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postsSubject.asObservable();
  
  private countryFilterSubject = new BehaviorSubject<string>('all');
  private searchTermSubject = new BehaviorSubject<string>('');
  
  public filteredPosts$: Observable<Post[]> = combineLatest([
    this.posts$,
    this.countryFilterSubject.asObservable(),
    this.searchTermSubject.asObservable().pipe(debounceTime(300), distinctUntilChanged())
  ]).pipe(
    map(([posts, country, searchTerm]) => {
      let filtered = posts;
      
      if (country !== 'all') {
        filtered = filtered.filter(post => post.country === country);
      }
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(term) ||
          post.description.toLowerCase().includes(term) ||
          post.tags.some(tag => tag.toLowerCase().includes(term))
        );
      }
      
      return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    })
  );
  
  constructor() {
    this.loadInitialPosts();
  }
  
  loadInitialPosts() {
    const initialPosts: Post[] = [
      {
        id: 1,
        title: 'Скрытый пляж на Пхукете, о котором не знают туристы',
        description: 'Мы нашли место, где нет толп туристов. Чистейшая вода и белый песок...',
        author: 'Анна Иванова',
        authorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        country: 'Таиланд',
        tags: ['пляж', 'тайланд', 'секреты'],
        readTime: 5,
        likes: 234,
        sticker: getRandomSticker(),
        imageUrl: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=600',
        date: new Date('2024-01-15'),
        comments: 23
      },
      {
        id: 2,
        title: '10 мест в Токио, которые нужно посетить',
        description: 'От неоновых улиц до древних храмов — полный гид по столице Японии...',
        author: 'Макс Петров',
        authorAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        country: 'Япония',
        tags: ['япония', 'город', 'культура'],
        readTime: 8,
        likes: 189,
        sticker: getRandomSticker(),
        imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600',
        date: new Date('2024-01-20'),
        comments: 15
      },
      {
        id: 3,
        title: 'Вьетнам на байке: маршрут от Ханоя до Хошимина',
        description: 'Месяц приключений, рисовые поля и лучшие фото в Instagram...',
        author: 'Елена Смирнова',
        authorAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        country: 'Вьетнам',
        tags: ['вьетнам', 'байк', 'приключения'],
        readTime: 12,
        likes: 456,
        sticker: getRandomSticker(),
        imageUrl: 'https://images.unsplash.com/photo-1528127269322-5398014a6b7c?w=600',
        date: new Date('2024-01-10'),
        comments: 42
      }
    ];
    
    this.postsSubject.next(initialPosts);
    this.saveToLocalStorage();
  }
  
  addPost(post: Post) {
    const currentPosts = this.postsSubject.getValue();
    const newPost = {
      ...post,
      id: Date.now(),
      date: new Date(),
      likes: 0,
      comments: 0
    };
    this.postsSubject.next([newPost, ...currentPosts]);
    this.saveToLocalStorage();
  }
  
  likePost(postId: number) {
    const currentPosts = this.postsSubject.getValue();
    const updatedPosts = currentPosts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    this.postsSubject.next(updatedPosts);
    this.saveToLocalStorage();
  }
  
  setCountryFilter(country: string) {
    this.countryFilterSubject.next(country);
  }
  
  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
  
  getTopAuthors(): Observable<any[]> {
    return this.posts$.pipe(
      map(posts => {
        const authorMap = new Map();
        posts.forEach(post => {
          if (!authorMap.has(post.author)) {
            authorMap.set(post.author, {
              name: post.author,
              avatar: post.authorAvatar,
              posts: 0,
              totalLikes: 0
            });
          }
          const author = authorMap.get(post.author);
          author.posts++;
          author.totalLikes += post.likes;
        });
        return Array.from(authorMap.values())
          .sort((a, b) => b.posts - a.posts)
          .slice(0, 5);
      })
    );
  }
  
  getTopPosts(): Observable<Post[]> {
    return this.posts$.pipe(
      map(posts => [...posts].sort((a, b) => b.likes - a.likes).slice(0, 5))
    );
  }
  
  private saveToLocalStorage() {
    const posts = this.postsSubject.getValue();
    localStorage.setItem('travel_posts', JSON.stringify(posts));
  }
}