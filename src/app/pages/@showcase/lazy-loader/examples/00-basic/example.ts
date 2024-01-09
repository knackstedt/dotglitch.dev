import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LazyLoaderComponent, LazyLoaderService } from '@dotglitch/ngx-common';


@Component({
    selector: 'll-00-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [LazyLoaderComponent, MatButtonModule],
    standalone: true
})
export class ExampleBasicComponent {
    ttl = 0;

    constructor(private lazyLoader: LazyLoaderService) {
        lazyLoader.registerComponent({
            id: "child",
            load: () => import('src/app/pages/@showcase/lazy-loader/examples/00-basic/example-child/example-child')
        })
    }

    private interval;
    ngOnInit() {
        this.interval = setInterval(() => {
            this.ttl--
        }, 1000)
    }
    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
