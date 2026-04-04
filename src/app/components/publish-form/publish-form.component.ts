import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/post';

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

@Component({
  selector: 'app-publish-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PublishFormComponent],
  templateUrl: './publish-form.component.html',
  styleUrls: ['./publish-form.component.scss']
})
export class PublishFormComponent {
  @Output() published = new EventEmitter<Post>();
  @Output() closed = new EventEmitter<void>();
  
  publishForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    country: new FormControl('Таиланд'),
    tags: new FormControl(''),
    readTime: new FormControl(5, Validators.min(1)),
    imageUrl: new FormControl('')
  });
  
  previewUrl: string | null = null;
  countries = ['Япония', 'Таиланд', 'Вьетнам', 'Индия', 'Индонезия'];
  
  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}
  
  onImageUrlChange() {
    const url = this.publishForm.get('imageUrl')?.value;
    if (url && url.startsWith('http')) {
      this.previewUrl = url;
    } else {
      this.previewUrl = null;
    }
  }
  
  onSubmit() {
    if (this.publishForm.valid) {
      this.authService.currentUser$.subscribe(user => {
        if (user) {
          const tags = this.publishForm.get('tags')?.value?.split(',').map(t => t.trim()) || [];
          
          const newPost: Post = {
            id: 0,
            title: this.publishForm.get('title')?.value || '',
            description: this.publishForm.get('description')?.value || '',
            author: user.name,
            authorAvatar: user.avatar,
            country: this.publishForm.get('country')?.value || '',
            tags: tags,
            readTime: this.publishForm.get('readTime')?.value || 5,
            likes: 0,
            sticker: getRandomSticker(),
            imageUrl: this.publishForm.get('imageUrl')?.value || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600',
            date: new Date(),
            comments: 0
          };
          
          this.postService.addPost(newPost);
          this.published.emit(newPost);
          this.publishForm.reset();
          this.previewUrl = null;
        }
      });
    }
  }
  
  close() {
    this.closed.emit();
  }
}