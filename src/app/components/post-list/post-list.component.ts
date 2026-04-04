import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() filterCountry: string = 'all';
  
  posts$: Observable<Post[]>;
  
  constructor(private postService: PostService) {
    this.posts$ = this.postService.filteredPosts$;
  }
  
  scrollToPublish() {
    const publishBtn = document.querySelector('.btn-primary');
    if (publishBtn) {
      (publishBtn as HTMLElement).click();
    }
  }
}