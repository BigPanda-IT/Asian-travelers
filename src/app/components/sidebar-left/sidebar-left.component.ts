import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {
  @Input() selectedCountry: string = 'all';
  @Output() countrySelected = new EventEmitter<string>();
  
  countries: { flag: string; name: string; count: number }[] = [];
  totalPosts = 0;
  
  constructor(private postService: PostService) {}
  
  ngOnInit() {
    this.postService.posts$.subscribe(posts => {
      const countryMap = new Map<string, number>();
      posts.forEach(post => {
        const count = countryMap.get(post.country) || 0;
        countryMap.set(post.country, count + 1);
      });
      
      this.countries = [
        { flag: '🇯🇵', name: 'Япония', count: countryMap.get('Япония') || 0 },
        { flag: '🇹🇭', name: 'Таиланд', count: countryMap.get('Таиланд') || 0 },
        { flag: '🇻🇳', name: 'Вьетнам', count: countryMap.get('Вьетнам') || 0 },
        { flag: '🇮🇳', name: 'Индия', count: countryMap.get('Индия') || 0 },
        { flag: '🇮🇩', name: 'Индонезия', count: countryMap.get('Индонезия') || 0 }
      ];
      
      this.totalPosts = posts.length;
    });
  }
  
  selectCountry(country: string) {
    this.countrySelected.emit(country);
  }
}