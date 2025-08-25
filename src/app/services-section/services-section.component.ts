import { Component } from '@angular/core';

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.css']
})
export class ServicesSectionComponent {
  cardData = [
    {
      title: 'Website Development',
      description: 'Responsive, modern websites tailored to showcase your brand and drive results.'
    },
    {
      title: 'Shopify & E-Commerce',
      description: 'Custom Shopify stores and e-commerce solutions built for seamless online selling.ore with seamless user experience.'
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic campaigns combined with powerful visuals social, video, and influencer marketing.'
    },
    {
      title: 'Branding & Creative Design',
      description: 'Complete brand identity, graphic design, and UI/UX visuals to leave a lasting impression.'
    },
    {
      title: 'Content Creation',
      description: 'Professional photography and videography services that tell your brands story effectively.'
    },
    {
      title: 'Student Project Development',
      description: 'Helping students build clean, functional, and impressive academic projects.'
    }
  ];
}

