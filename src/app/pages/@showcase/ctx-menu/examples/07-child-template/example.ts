import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuItem, MenuDirective } from '@dotglitch/ngx-common';
import { ExampleChildComponent } from 'src/app/pages/@showcase/ctx-menu/examples/07-child-template/example-child/example-child';

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [
        MenuDirective,
        MatButtonModule
    ],
    standalone: true
})
export class ExampleChildTemplateComponent {
    @ViewChild('yahooTemplate', { read: TemplateRef }) yahooTemplate: TemplateRef<any>;

    ctxMenu: MenuItem[];

    ngAfterViewInit() {
        this.ctxMenu = [
            {
                label: "Google",
                link: "www.google.com"
            },
            {
                label: "Bing",
                // We can directly reference child templates
                // Note: We do not yet support @Input and @Output bindings.
                childTemplate: ExampleChildComponent
            },
            {
                label: "Yahoo",
                // We can also directly reference templates
                // in the current component
                childTemplate: this.yahooTemplate
            }
        ]
    }
}
