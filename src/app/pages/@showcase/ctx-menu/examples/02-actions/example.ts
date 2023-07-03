import { Component } from '@angular/core';
import { ContextMenuItem, NgxContextMenuDirective } from '@dotglitch/ngx-ctx-menu';

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [ NgxContextMenuDirective ],
    standalone: true
})
export class ExampleActionComponent {

    readonly ctxMenu: ContextMenuItem[] = [
        {
            label: "Alert",
            icon: "notifications",
            action: () => alert("You clicked the 'Alert' item")
        },
        {
            label: "Console Message",
            icon: "terminal",
            action: () => console.log("You clicked the 'Console Message' item")
        },
    ];
}
