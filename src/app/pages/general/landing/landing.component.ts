import { Component } from '@angular/core';
import { CubeGraphicComponent } from 'src/app/components/cube-graphic/cube-graphic.component';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    imports: [
        CubeGraphicComponent,
    ],
    standalone: true
})
export class LandingComponent {
    constructor() { }
}
