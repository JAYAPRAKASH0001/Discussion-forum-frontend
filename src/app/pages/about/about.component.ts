import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  team = [
    {
      name: 'Jayaprakash E',
      role: 'FullStack Developer',
      description: 'Designed and developed both the frontend and backend, ensuring smooth integration',
      linkedin: 'http://www.linkedin.com/in/jayaprakash-elango',
      github: 'https://github.com/JAYAPRAKASH0001',
      email: 'jpjayaprakash6604@gmail.com'
    },
    {
      name: 'Kamboji Pranav',
      role: 'Backend Developer',
      description: 'Designed and developed the backend APIs.',
      linkedin: 'https://www.linkedin.com/in/pranav-kamboji',
      github: 'https://github.com/kambojipranav',
      email: '126156190@sastra.ac.in'
    },
    {
      name: 'Shakeel S',
      role: 'Frontend Developer',
      description: 'Design the interactive UI with Angular.',
      linkedin: 'https://linkedin.com/in/alice',
      github: 'https://github.com/shakdevil',
      email: 'alice@example.com'
    }
  ];
}
