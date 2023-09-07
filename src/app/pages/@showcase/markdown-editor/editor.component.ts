import { Component, OnInit } from '@angular/core';
import { ExampleViewerComponent } from 'src/app/components/example-viewer/example-viewer.component';

import BasicExample from './examples/00-basic';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    imports: [
        ExampleViewerComponent
    ],
    standalone: true
})
export class LazyLoaderComponent implements OnInit {

    BasicExample = BasicExample;

    constructor() { }

    ngOnInit() {
    }

}
