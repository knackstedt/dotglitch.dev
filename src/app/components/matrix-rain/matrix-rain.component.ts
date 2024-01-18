import { Component, ViewContainerRef } from '@angular/core';
import { MatrixAnimation } from 'matrix-animation';

@Component({
    selector: 'app-matrix-rain',
    templateUrl: './matrix-rain.component.html',
    styleUrls: ['./matrix-rain.component.scss'],
    standalone: true
})
export class MatrixRainComponent  {

    animation: MatrixAnimation;

    constructor(private readonly viewcontainer: ViewContainerRef) {

    }

    ngAfterViewInit() {
        this.animation = new MatrixAnimation(
            this.viewcontainer.element.nativeElement,
            {
                rainDrop: {
                    headColor: "rgba(255,255,255,0.8)",
                    trailColor: "rgba(140,62,225,1)",
                }
            }
        )
    }

    ngOnDestroy() {
        this.animation.dispose();
    }
}
