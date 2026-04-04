import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit, OnDestroy {
  activeTab: 'authors' | 'top' | 'live' = 'authors';
  
  topAuthors: any[] = [];
  topPosts: Post[] = [];
  currentlyReading: { user: string; post: string }[] = [];
  
  private liveSubscription: Subscription | null = null;
  private authorSubscription: Subscription | null = null;
  private topPostsSubscription: Subscription | null = null;
  
  constructor(private postService: PostService) {}
  
  ngOnInit() {
    this.authorSubscription = this.postService.getTopAuthors().subscribe(authors => {
      this.topAuthors = authors;
    });
    
    this.topPostsSubscription = this.postService.getTopPosts().subscribe(posts => {
      this.topPosts = posts;
    });
    
    this.liveSubscription = interval(10000).subscribe(() => {
      this.currentlyReading = [
        { user: 'Анна', post: 'Скрытый пляж на Пхукете' },
        { user: 'Дмитрий', post: 'Храмы Киото' },
        { user: 'Елена', post: 'Вьетнам на байке' },
        { user: 'Макс', post: 'Бали для серферов' },
        { user: 'Ольга', post: 'Токио за 3 дня' }
      ];
    });
  }
  
  ngOnDestroy() {
    this.liveSubscription?.unsubscribe();
    this.authorSubscription?.unsubscribe();
    this.topPostsSubscription?.unsubscribe();
  }
}