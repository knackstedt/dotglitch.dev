import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, Input, OnInit, Type } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { VscodeComponent } from '@dotglitch/ngx-web-components';

@Component({
    selector: 'app-example-viewer',
    templateUrl: './example-viewer.component.html',
    styleUrls: ['./example-viewer.component.scss'],
    imports: [
        NgForOf,
        MatTabsModule,
        VscodeComponent,
        AsyncPipe,
        PortalModule
    ],
    standalone: true
})
export class ExampleViewerComponent implements OnInit {

    @Input() example: {
        component: Type<any>,
        files: {
            label: string,
            value: any;
        }[]
    };

    componentPortal: ComponentPortal<any>;

    constructor() { }

    async ngOnInit() {
        this.componentPortal = new ComponentPortal(this.example.component);
    }
}
