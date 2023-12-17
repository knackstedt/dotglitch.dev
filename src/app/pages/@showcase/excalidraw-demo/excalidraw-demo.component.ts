import { Component, OnInit } from '@angular/core';
import { ExcalidrawComponent } from './excalidraw-wrapper';

@Component({
    selector: 'app-excalidraw-demo',
    templateUrl: './excalidraw-demo.component.html',
    styleUrls: ['./excalidraw-demo.component.scss'],
    imports: [
        ExcalidrawComponent
    ],
    standalone: true
})
export class ExcalidrawDemoComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
