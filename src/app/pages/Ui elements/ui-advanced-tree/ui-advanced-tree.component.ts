import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileTreeComponent } from './file-tree/file-tree.component';

@Component({
    selector: 'app-ui-advanced-tree',
    imports: [PageTitleComponent, FormsModule, CommonModule, FileTreeComponent],
    templateUrl: './ui-advanced-tree.component.html',
    styleUrl: './ui-advanced-tree.component.scss'
})
export class UiAdvancedTreeComponent {

  fileTreeData = [
    {
      title: 'Domiex-Angular Folders',
      children:
        [
          {
            title: 'Plugins', children: [
              { title: 'All Plugins Included' }
          ] },
          {
            title: 'src',
            children: [
              {
                title: 'app',
                children: [
                  { title: 'All Pages And All Layout Included' }]
              },
              {
                title: 'assets',
                children: [{
                  title: 'fonts',
                  children: []
                },
                { title: 'images', children: [] }, { title: 'Json', children: [] }, { title: 'Scss', children: [] }]
              }, { title: 'favicon.ico' }, { title: 'index.html' }, { title: 'main.server.ts' }, { title: 'main.ts' }, { title: 'styles.css' }]
          }, { title: '.editorconfig' }, { title: '.gitignore' }, { title: 'angular.json' }, { title: 'package.json' }, { title: 'postcss.config.js' }, { title: 'README.md' }, { title: 'server.ts' }, { title: 'tailwind.config.js' }, { title: 'tsconfig.app.json' }, { title: 'tsconfig.json' }, { title: 'tsconfig.spec.json' }]
    }
  ];


}
