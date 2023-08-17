import { Component, Input, OnInit } from '@angular/core';
import { VscodeComponent } from '@dotglitch/ngx-web-components';

@Component({
    selector: 'monaco-editor',
    templateUrl: './monaco-editor.html',
    styleUrls: ['./monaco-editor.scss'],
    imports: [
        VscodeComponent
    ],
    standalone: true
})
export class MonacoEditorComponent {

    @Input() code: string;
    @Input() language: string;

    constructor() { }

}
