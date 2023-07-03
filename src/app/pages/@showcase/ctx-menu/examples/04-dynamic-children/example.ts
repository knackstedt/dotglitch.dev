import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContextMenuItem, NgxContextMenuDirective } from '@dotglitch/ngx-ctx-menu';

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [ NgxContextMenuDirective, MatButtonModule ],
    standalone: true
})
export class ExampleDynamicChildrenComponent {

    readonly ctxMenu: ContextMenuItem[] = [
        {
            label: "Google",
            link: "www.google.com"
        },
        {
            label: "Free Use Assets",
            childrenResolver: (data) => new Promise((res) => {
                setTimeout(() => {
                    return [
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
                    ];
                }, 5000);
            }),
        }
    ];
}
