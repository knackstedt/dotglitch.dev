import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuItem, MenuDirective } from '@dotglitch/ngx-common';

@Component({
    selector: 'ctx-04-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [ MenuDirective, MatButtonModule ],
    standalone: true
})
export class ExampleDynamicChildrenComponent {

    readonly ctxMenu: MenuItem[] = [
        {
            label: "Google",
            link: "www.google.com"
        },
        {
            label: "Free Use Assets",
            // Instead of using the `children` property, we can
            // dynamically resolve the list of children for the item.
            childrenResolver: (data) => new Promise((res) => {
                // Normally, you would perform some Fetch request.
                // For demonstrative purposes, we use a setTimeout
                // event to simulate such a request.
                setTimeout(() => {
                    res([
                        {
                            label: "Material Icons",
                            link: "https://fonts.google.com/icons?icon.set=Material+Icons&icon.query=dashboard"
                        },
                        {
                            label: "Background Music",
                            link: "https://www.joystock.org/royalty-free-music/cinematic"
                        },
                        {
                            label: "Pattern Monster",
                            link: "https://pattern.monster/"
                        },
                        {
                            label: "Hero Patterns",
                            link: "https://heropatterns.com/"
                        }
                    ]);
                }, 5000);
            }),
        }
    ];
}
