import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuItem, MenuDirective } from '@dotglitch/ngx-common';

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [ MenuDirective, MatButtonModule ],
    standalone: true
})
export class ExampleChildrenComponent {

    // Add a separator to the items, and add an entry that has child entries.
    readonly ctxMenu: MenuItem[] = [
        {
            label: "Google",
            link: "www.google.com"
        },
        {
            label: "Bing",
            link: "www.bing.com"
        },
        "separator",
        {
            label: "DNS Tools",
            // Children will be visible when the menu item is selected.
            children: [
                {
                    label: "DNS Propagation",
                    link: "https://dnspropagation.net/",
                    linkTarget: "_blank"
                },
                {
                    label: "DNS Visualization",
                    link: "https://dnsviz.net/",
                    linkTarget: "_blank"
                }
            ]
        }
    ];
}
