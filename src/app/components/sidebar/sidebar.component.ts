import { Component } from '@angular/core';

interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'question_answer', label: 'Questions', route: '/questions' },
    { icon: 'label', label: 'Search by Tags', route: '/tags' },
    { icon: 'group', label: 'About Us', route: '/about' }
  ];
}
