import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post!: Post;
  
  constructor(
    private postService: PostService,
    private router: Router
  ) {}
  
  likePost() {
    this.postService.likePost(this.post.id);
  }
  
  openPost() {
    this.router.navigate(['/post', this.post.id]);
  }
  
  getFormattedDate(date: Date): string {
    const now = new Date();
    const postDate = new Date(date);
    const diffDays = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'сегодня';
    if (diffDays === 1) return 'вчера';
    if (diffDays < 7) return `${diffDays} дня назад`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} недель назад`;
    return postDate.toLocaleDateString('ru-RU');
  }
}