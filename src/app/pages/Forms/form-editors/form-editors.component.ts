import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { FormsModule } from '@angular/forms';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor, NgxEditorModule } from 'ngx-editor';



@Component({
    selector: 'app-form-editors',
    imports: [PageTitleComponent, FormsModule, NgxEditorModule],
    templateUrl: './form-editors.component.html',
    styleUrl: './form-editors.component.scss'
})
export class FormEditorsComponent {
  editor!: Editor;
  html = '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
