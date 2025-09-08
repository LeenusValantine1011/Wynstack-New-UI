import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.css']
})
export class ServicesSectionComponent implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const elements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
    const onScroll = () => {
      elements.forEach((elem: HTMLElement) => {
        const rect = elem.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.9) { // 90% viewport height trigger
          this.renderer.addClass(elem, 'visible');
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    // Trigger once immediately in case elements already in view
    onScroll();
  }
  cardData = [
    {
      title: 'Website Development',
      description: 'Responsive, modern websites tailored to showcase your brand and drive results.',
      routePath: '/web-services',
      imageUrl: 'assets/Service/web-service.svg',
      bgUrl: 'assets/Service/Ellipse 1097.svg'
    },
    {
      title: 'Shopify & E-Commerce',
      description: 'Custom Shopify stores and e-commerce solutions built for seamless online selling.ore with seamless user experience.',
      routePath: '/shopify-store',
      imageUrl: 'assets/Service/shopify.svg',
      bgUrl: 'assets/Service/Ellipse 1097.svg'
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic campaigns combined with powerful visuals social, video, and influencer marketing.',
      routePath: '/digital-marketing',
      imageUrl: 'assets/Service/digital-marketing.svg',
      bgUrl: 'assets/Service/Ellipse 1097.svg'
    },
    {
      title: 'Branding & Creative Design',
      description: 'Complete brand identity, graphic design, and UI/UX visuals to leave a lasting impression.',
      routePath: '/branding',
      imageUrl: 'assets/Service/branding.svg',
      bgUrl: 'assets/Service/Ellipse 1097.svg'
    },
    {
      title: 'Content Creation',
      description: 'Professional photography and videography services that tell your brands story effectively.',
      routePath: '/content-creation',
      imageUrl: 'assets/Service/content-creation.svg',
      bgUrl: 'assets/Service/Ellipse 1097.svg'
    },
    {
      title: 'Student Project Development',
      description: 'Helping students build clean, functional, and impressive academic projects.',
      routePath: '/student-project',
      imageUrl: 'assets/Service/student-projects.svg',
      bgUrl: 'assets/Service/Ellipse 1097.svg'
    }

  ];

}

