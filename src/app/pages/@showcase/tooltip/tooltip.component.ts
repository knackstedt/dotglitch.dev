import { Component, OnInit } from '@angular/core';
import { VscodeComponent } from '@dotglitch/ngx-common';

import TooltipExample from "./examples/01-tooltip";
import { ExampleViewerComponent } from 'src/app/components/example-viewer/example-viewer.component';


@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    imports: [
        ExampleViewerComponent,
        VscodeComponent
    ],
    standalone: true
})
export class TooltipComponent {
    TooltipExample = TooltipExample;

    readonly importCode = `
import { NgModule } from '@angular/core';
import { TooltipDirective } from '@dotglitch/ngx-common';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        ...
    ],
    imports: [
        TooltipDirective,
        ...
    ]
    bootstrap: [AppComponent]
})
export class AppModule { }`

    readonly usageCode = `
<img src="/assets/channel.png" [ngx-tooltip]="myTooltip"/>

<ng-template #myTooltip>
    @for (i of [1,2,3]; track i) {
        <div>Item {{i}}</div>
    }
</ng-template>
`;
}
