import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContextMenuItem, NgxAppMenuDirective, NgxContextMenuDirective } from '@dotglitch/ngx-ctx-menu';
import { ExampleChildComponent } from 'src/app/pages/@showcase/ctx-menu/examples/07-child-template/example-child/example-child';

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [
        NgxContextMenuDirective,
        NgxAppMenuDirective,
        MatButtonModule
    ],
    standalone: true
})
export class ExampleChildTemplateComponent {

    readonly ctxMenu: ContextMenuItem[] = [
        {
            label: "Google",
            link: "www.google.com"
        },
        {
            label: "Bing",
            childTemplate: ExampleChildComponent
        }
    ];
}
