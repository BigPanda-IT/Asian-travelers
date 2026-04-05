import { Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
    country: new FormControl('', Validators.required),
    tags: new FormControl(''),
    readTime: new FormControl(5, Validators.min(1)),
    imageUrl: new FormControl('')
  });
  
  previewUrl: string | null = null;
  countries = ['Япония', 'Таиланд', 'Вьетнам', 'Индия', 'Индонезия'];
  selectedFile: File | null = null;
  
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}
  
  // Выбор файла
  onFileSelected(event: Event) {
    console.log('Файл выбран');
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Имя файла:', file.name);
      
      // Проверка размера (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимум 5MB');
        return;
      }
      
      // Проверка типа
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
      }
      
      this.selectedFile = file;
      
      // Создаём превью (base64)
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('Превью создано');
        this.previewUrl = e.target?.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
      input.value = '';
    }
  }
  
  // Удалить фото
  removeImage() {
    this.previewUrl = null;
    this.selectedFile = null;
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
            imageUrl: this.previewUrl || '',
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