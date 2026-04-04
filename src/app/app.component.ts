import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './services/post.service';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PublishFormComponent } from './components/publish-form/publish-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    // RouterOutlet убрали — он не нужен
    HeaderComponent,
    HeroComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    PostListComponent,
    PublishFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showPublishForm = false;
  showFeedContent = false; 
  selectedCountry: string = 'all';
  
  constructor(private postService: PostService) {}

  showFeed() {
    this.showFeedContent = true;
    this.showPublishForm = false;
    setTimeout(() => {
      document.querySelector('.content-with-sidebars')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
  
  openPublishForm() {
    this.showPublishForm = true;
    this.showFeedContent = false;
    setTimeout(() => {
      document.querySelector('app-publish-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
  
  closePublishForm() {
    this.showPublishForm = false;
  }
  
  onPostPublished() {
    this.showPublishForm = false;
    this.showFeed();
  }
  
  filterByCountry(country: string) {
    this.selectedCountry = country;
    this.postService.setCountryFilter(country);
  }

  onTabChange(tab: 'feed' | 'publish') {
    if (tab === 'feed') {
      this.showFeed();
    } else {
      this.openPublishForm();
    }
  }
}


