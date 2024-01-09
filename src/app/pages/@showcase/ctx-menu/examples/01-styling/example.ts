import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuItem, MenuDirective } from '@dotglitch/ngx-common';

@Component({
    selector: 'ctx-01-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [ MenuDirective, MatButtonModule ],
    standalone: true
})
export class ExampleStyledComponent {

    readonly ctxMenu: MenuItem[] = [
        {
            label: "Google",
            link: "www.google.com"
        },
        {
            label: "Bing",
            link: "www.bing.com"
        }
    ];
}
