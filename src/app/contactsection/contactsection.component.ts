import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contactsection',
  templateUrl: './contactsection.component.html',
  styleUrls: ['./contactsection.component.css']
})
export class ContactsectionComponent implements AfterViewInit {

  showSuccessModal = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

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

 sendEmail(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    emailjs.sendForm('service_shxhofw', 'template_q6780jy', form, '6bRmLkJcjyXisGbdm')
      .then(() => {
        this.showSuccessModal = true;
        form.reset();
      })
      .catch((error: { text: any; }) => {
        console.error('Failed to send message:', error.text);
        alert('Failed to send message, please try again.');
      });
  }

  closeModal() {
    this.showSuccessModal = false;
  }

}
