import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post | null = null;
  private subscription: Subscription | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}
  
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.postService.posts$.subscribe(posts => {
        this.post = posts.find(p => p.id === id) || null;
        if (!this.post) {
          this.router.navigate(['/']);
        }
      });
    });
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  
  likePost() {
    if (this.post) {
      this.postService.likePost(this.post.id);
      this.post.likes++;
    }
  }
  
  goBack() {
    this.router.navigate(['/']);
  }
  
  getFormattedDate(date: Date): string {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}