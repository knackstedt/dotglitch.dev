import { Component, Input, NgZone, ViewContainerRef } from '@angular/core';
import { MatrixAnimation } from 'matrix-animation';

@Component({
    selector: 'app-matrix-rain',
    templateUrl: './matrix-rain.component.html',
    styleUrls: ['./matrix-rain.component.scss'],
    standalone: true
})
export class MatrixRainComponent  {

    @Input() config = {
        rainDrop: {
            headColor: "rgba(255,255,255,0.8)",
            trailColor: "rgba(140,62,225,1)",
        }
    };
    animation: MatrixAnimation;

    constructor(
        private readonly viewcontainer: ViewContainerRef,
        private readonly ngZone: NgZone
    ) {

    }

    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            this.animation = new MatrixAnimation(
                this.viewcontainer.element.nativeElement,
                structuredClone(this.config)
            )
        })
    }

    ngOnDestroy() {
        this.animation.dispose();
    }
}
