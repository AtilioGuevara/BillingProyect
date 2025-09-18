import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';

@Component({
    selector: 'app-pages-faq',
    imports: [LucideAngularModule, CommonModule, PageTitleComponent],
    templateUrl: './pages-faq.component.html',
    styleUrl: './pages-faq.component.scss'
})
export class PagesFaqComponent  {
  items = [
    {
      title: 'Why do we use Tailwind CSS?',
      content:
        'Tailwind CSS is used to design and style web pages fast and Responsive. Rapid Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and Community Support are the main reasons for using Tailwind CSS.',
    },
    {
      title: 'Can we change the base font-family in Tailwind config?',
      content:
        'Yes, we can change the base font-family in Tailwind config. To adjust the main font style in Tailwind CSS, you can modify it by making changes in the “theme” part of your configuration file (tailwind.config.js). Just open that file, find the theme section, and add or update the fontFamily setting. We can also Change the font-family in the Tailwind config with different techniques Changing base font-family, Adding a new font family, Removing font family.',
    },
    {
      title: 'How to create a form with Tailwind CSS?',
      content:
        'Tailwind CSS, offers Tailwind forms as plugins that provide a foundational reset for form styles. Install TailwindCSS by writing the following command. We can also use utility classes to make a form with Tailwind CSS, use the easy-to-apply classes for backgrounds, borders, shadows, etc. Start by creating the form element and use the space-y-{n} class to add vertical spacing between the form controls.”',
    },
    {
      title: 'What is Tailwind CSS, and what is Utility-First CSS?',
      content:
        'Tailwind CSS is a utility-first CSS framework designed for rapid UI development. Instead of providing pre-built components, it offers low-level utility classes that let you build custom designs without ever leaving your HTML. Utility-first CSS is an approach where you use small, single-purpose classes to build your user interface. These utility classes are composed to create complex designs directly in the HTML, rather than relying on custom CSS. This approach favors composition over inheritance, making it easier to maintain and scale your codebase.',
    },
    {
      title: 'Why do we use Tailwind CSS?',
      content:
        'Tailwind CSS is used to design and style web pages fast and Responsive. Rapid Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and Community Support are the main reasons for using Tailwind CSS.',
    },
    {
      title: 'Why do we use Tailwind CSS?',
      content:
        'Tailwind CSS is used to design and style web pages fast and Responsive. Rapid Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and Community Support are the main reasons for using Tailwind CSS”',
    },
    {
      title: 'Is Tailwind CSS open-source (FREE to use)?',
      content:
        'Tailwind CSS is an open-source project, available for free usage and utility-first CSS framework that provides responsiveness.',
    },
    {
      title: 'How to integrate Tailwind CSS into the HTML file?',
      content:
        'We can easily integrate the tailwind CSS to the project via CDN links and by installing it from npm or yarn.',
    },
    {
      title: 'Do Tailwind CSS 3 Classes Override Previous Classes?',
      content:
        'Tailwind CSS is designed to be a low-level utility-first framework, which means that classes are not automatically overridden by default. This make the styling process for form elements simple and allowing easy customization with utilities.',
    },
    {
      title: 'How to make text bold in Tailwind CSS?',
      content:
        'For achieving the bold text we can easily add utility class font-bold.',
    },
    {
      title: 'How to center both horizontally and vertically?',
      content: 'We can easily add utility class self-center.',
    },
    {
      title: 'What are the Empty elements in HTML?',
      content:
        'The empty elements in HTML are the elements that don’t require and closing tag followed by the opening tag. These elements are also known as self-closing elements. Example: <code>&lt;img&gt;</code>, &lt;input&gt;, &lt;br&gt;, &lt;hr&gt; etc.',
    },
  ];
  selectedIndex: number | null = null;

  toggle(index: number): void {
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }
}
